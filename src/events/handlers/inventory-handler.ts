import { In } from 'typeorm'

import type { Inventory } from '@/infra/entities/inventory'
import { inventoryRepository } from '@/infra/repositories'

import { EventBus } from '../emitters/event-bus'

const eventBus = EventBus.getInstance()

interface ReserveQuantityProps {
  items: {
    productId: string
    quantity: number
  }[]
}

async function reserveQuantity(data: ReserveQuantityProps) {
  const productsIds = data.items.map((item) => item.productId)

  const listInventory = await inventoryRepository.find({
    where: {
      productId: In(productsIds),
    },
  })

  const inventoryUpdates: Array<Promise<Inventory>> = []
  const lowStockEvents: Array<{ productId: string; reservedQuantity: number }> =
    []

  for (const inventory of listInventory) {
    const product = data.items.find(
      (item) => item.productId === inventory.productId,
    )

    if (product) {
      const newReservedQuantity = inventory.reservedQuantity + product.quantity

      inventory.reservedQuantity = newReservedQuantity

      if (inventory.lowStockThreshold <= newReservedQuantity) {
        lowStockEvents.push({
          productId: inventory.productId,
          reservedQuantity: newReservedQuantity,
        })
      }

      inventoryUpdates.push(inventoryRepository.save(inventory))
    }
  }

  Promise.all(inventoryUpdates)

  for (const event of lowStockEvents) {
    console.log(event)
    eventBus.emitEvent('INVENTORY_LOW_STOCK', null)
  }
}

export function register() {
  eventBus.on('ORDER_CREATED', reserveQuantity)
}
