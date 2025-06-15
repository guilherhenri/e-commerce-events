import { EventEmitter } from 'node:events'

import type { PaymentMethod } from '@/infra/entities/payment'

interface EventMap {
  ORDER_CREATED: {
    orderId: string
    totalAmount: number
    paymentMethod: PaymentMethod
    items: {
      productId: string
      quantity: number
    }[]
    recipient: string
  }
  ORDER_UPDATED: null
  ORDER_CANCELLED: null
  ORDER_COMPLETED: null
  PAYMENT_INITIATED: null
  PAYMENT_APPROVED: null
  PAYMENT_FAILED: null
  PAYMENT_REFUNDED: null
  INVENTORY_RESERVED: null
  INVENTORY_RELEASED: null
  INVENTORY_LOW_STOCK: null
  EMAIL_SEND_REQUESTED: null
  SMS_SEND_REQUESTED: null
  PUSH_NOTIFICATION_REQUESTED: null
  USER_ACTION_TRACKED: null
  CONVERSION_TRACKED: null
}

export class EventBus extends EventEmitter {
  private static instance: EventBus // eslint-disable-line

  static getInstance(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus()
    }

    return EventBus.instance
  }

  emitEvent<Event extends keyof EventMap>(
    eventName: Event,
    data: EventMap[Event],
  ): void {
    this.emit(eventName, data)
  }

  on<Event extends keyof EventMap>(
    eventName: Event,
    listener: (data: EventMap[Event]) => void,
  ): this {
    return super.on(eventName, listener)
  }
}
