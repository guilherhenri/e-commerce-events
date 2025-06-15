import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { EventBus } from '@/events/emitters/event-bus'
import { PaymentMethod } from '@/infra/entities/payment'
import { orderRepository } from '@/infra/repositories'

export async function createOrder(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createOrderBodySchema = z.object({
    userEmail: z.string().email(),
    totalAmount: z.number(),
    items: z
      .array(
        z.object({
          productId: z.string().uuid(),
          quantity: z.number().min(1),
          price: z.number(),
        }),
      )
      .min(1),
    paymentMethod: z.nativeEnum(PaymentMethod),
  })

  const { userEmail, totalAmount, items, paymentMethod } =
    createOrderBodySchema.parse(request.body)

  if (totalAmount <= 0) {
    throw new Error('Total amount need to be great than zero')
  }

  const productsPriceBellowEqualZero = items.filter((item) => item.price <= 0)

  if (productsPriceBellowEqualZero.length > 0) {
    throw new Error('Product price need to be great than zero')
  }

  const order = await orderRepository.save({
    userEmail,
    totalAmount,
    items,
  })

  EventBus.getInstance().emitEvent('ORDER_CREATED', {
    orderId: order.id,
    totalAmount,
    paymentMethod,
    items,
    recipient: userEmail,
  })

  return reply.status(201).send({ order })
}
