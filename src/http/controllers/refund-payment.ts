import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { PaymentStatus } from '@/infra/entities/payment'
import { paymentRepository } from '@/infra/repositories'

export async function refundPayment(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const refundPaymentParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = refundPaymentParamsSchema.parse(request.params)

  const payment = await paymentRepository.findOneBy({
    id,
  })

  if (!payment) {
    throw new Error('Payment not found')
  }

  if (payment.status !== PaymentStatus.APPROVED) {
    throw new Error('Is not possible to refund a payment that was not approved')
  }

  const updatedPayment = await paymentRepository.save({
    ...payment,
    status: PaymentStatus.REFUNDED,
  })

  return reply.send({
    payment: updatedPayment,
  })
}
