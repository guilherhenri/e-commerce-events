import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { orderRepository } from '@/infra/repositories'

export async function deleteOrder(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteOrderParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = deleteOrderParamsSchema.parse(request.params)

  const order = await orderRepository.findOneBy({
    id,
  })

  if (!order) {
    throw new Error('Order not found')
  }

  await orderRepository.delete({
    id,
  })

  return reply.status(204).send()
}
