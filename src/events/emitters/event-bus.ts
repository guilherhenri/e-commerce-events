import { EventEmitter } from 'node:stream'

export type Event =
  | 'ORDER_CREATED'
  | 'ORDER_UPDATED'
  | 'ORDER_CANCELLED'
  | 'ORDER_COMPLETED'
  | 'PAYMENT_INITIATED'
  | 'PAYMENT_APPROVED'
  | 'PAYMENT_FAILED'
  | 'PAYMENT_REFUNDED'
  | 'INVENTORY_RESERVED'
  | 'INVENTORY_RELEASED'
  | 'INVENTORY_LOW_STOCK'
  | 'EMAIL_SEND_REQUESTED'
  | 'SMS_SEND_REQUESTED'
  | 'PUSH_NOTIFICATION_REQUESTED'
  | 'USER_ACTION_TRACKED'
  | 'CONVERSION_TRACKED'

export class EventBus extends EventEmitter {
  private static instance: EventBus // eslint-disable-line

  static getInstance(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus()
    }

    return EventBus.instance
  }

  emitEvent<T>(eventName: Event, data: T): void {
    this.emit(eventName, data)
  }

  on<T>(eventName: Event, listener: (data: T) => void): this {
    return super.on(eventName, listener)
  }
}
