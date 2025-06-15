import { AnalyticsEventType } from '@/infra/entities/analytics'
import { analyticsRepository } from '@/infra/repositories'

import { EventBus } from '../emitters/event-bus'

const eventBus = EventBus.getInstance()

interface RegisterOrderConversionProps {
  orderId: string
  items: Array<Record<string, unknown>>
  totalAmount: number
}

async function registerOrderConversion(data: RegisterOrderConversionProps) {
  const metadata = {
    itemsCount: data.items.length,
    totalAmount: data.totalAmount,
  }

  await analyticsRepository.save({
    orderId: data.orderId,
    eventType: AnalyticsEventType.CONVERSION,
    metadata,
    action: 'A order was created',
  })

  eventBus.emitEvent('CONVERSION_TRACKED', null)
}

export function register() {
  eventBus.on('ORDER_CREATED', registerOrderConversion)
}
