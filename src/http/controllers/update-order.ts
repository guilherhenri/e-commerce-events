import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { OrderStatus } from '@/infra/entities/order'
import { orderRepository } from '@/infra/repositories'

export async function updateOrder(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateOrderParamsSchema = z.object({
    id: z.string().uuid(),
  })
  const updateOrderBodySchema = z.object({
    status: z.nativeEnum(OrderStatus),
  })

  const { id } = updateOrderParamsSchema.parse(request.params)
  const { status } = updateOrderBodySchema.parse(request.body)

  const order = await orderRepository.findOneBy({
    id,
  })

  if (!order) {
    throw new Error('Order not found')
  }

  const updatedOrder = await orderRepository.save({
    ...order,
    status,
  })

  return reply.send({
    order: updatedOrder,
  })
}
