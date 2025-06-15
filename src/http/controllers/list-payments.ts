import type { FastifyReply, FastifyRequest } from 'fastify'

import { paymentRepository } from '@/infra/repositories'

export async function listPayments(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const payments = await paymentRepository.find()

  return reply.send({
    payments,
  })
}
