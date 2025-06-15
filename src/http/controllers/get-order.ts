import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { orderRepository } from '@/infra/repositories'

export async function getOrder(request: FastifyRequest, reply: FastifyReply) {
  const getOrderParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = getOrderParamsSchema.parse(request.params)

  const order = await orderRepository.findOneBy({
    id,
  })

  if (!order) {
    throw new Error('Order not found')
  }

  return reply.send({
    order,
  })
}
