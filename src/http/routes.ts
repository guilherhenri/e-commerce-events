import type { FastifyInstance } from 'fastify'

import { createOrder } from './controllers/create-order'

export async function routes(app: FastifyInstance) {
  app.post('/orders', createOrder)
}
