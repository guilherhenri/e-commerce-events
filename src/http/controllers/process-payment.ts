import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { PaymentStatus } from '@/infra/entities/payment'
import { paymentRepository } from '@/infra/repositories'

export async function processPayment(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const processPaymentBodySchema = z.object({
    paymentId: z.string().uuid(),
    status: z.enum(['success', 'failed']),
  })

  const { paymentId, status } = processPaymentBodySchema.parse(request.body)

  const payment = await paymentRepository.findOneBy({
    id: paymentId,
  })

  if (!payment) {
    throw new Error('Payment not found')
  }

  if (payment.status !== PaymentStatus.INITIATED) {
    throw new Error('This payment is already processed')
  }

  await paymentRepository.save({
    ...payment,
    status:
      status === 'success' ? PaymentStatus.APPROVED : PaymentStatus.FAILED,
  })

  return reply.send({
    success: 'Payment processed',
  })
}
