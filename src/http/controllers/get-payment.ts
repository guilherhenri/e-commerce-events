import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { paymentRepository } from '@/infra/repositories'

export async function getPayment(request: FastifyRequest, reply: FastifyReply) {
  const getPaymentParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = getPaymentParamsSchema.parse(request.params)

  const payment = await paymentRepository.findOneBy({
    id,
  })

  if (!payment) {
    throw new Error('Payment not found')
  }

  return reply.send({
    payment,
  })
}
