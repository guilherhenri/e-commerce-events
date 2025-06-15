import type { FastifyReply, FastifyRequest } from 'fastify'

import { orderRepository } from '@/infra/repositories'

export async function listOrders(request: FastifyRequest, reply: FastifyReply) {
  const orders = await orderRepository.find()

  return reply.send({
    orders,
  })
}
