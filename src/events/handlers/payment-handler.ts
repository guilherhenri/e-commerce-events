import { type PaymentMethod } from '@/infra/entities/payment'
import { paymentRepository } from '@/infra/repositories'

import { EventBus } from '../emitters/event-bus'

const eventBus = EventBus.getInstance()

interface InitiatePaymentProps {
  orderId: string
  totalAmount: number
  paymentMethod: PaymentMethod
}

async function initiatePayment(data: InitiatePaymentProps) {
  await paymentRepository.save({
    orderId: data.orderId,
    amount: data.totalAmount,
    paymentMethod: data.paymentMethod,
  })

  eventBus.emitEvent('PAYMENT_INITIATED', null)
}

export function register() {
  eventBus.on('ORDER_CREATED', initiatePayment)
}
