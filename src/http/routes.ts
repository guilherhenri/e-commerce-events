import type { FastifyInstance } from 'fastify'

import { createOrder } from './controllers/create-order'
import { deleteOrder } from './controllers/delete-order'
import { getOrder } from './controllers/get-order'
import { listOrders } from './controllers/list-orders'
import { updateOrder } from './controllers/update-order'

export async function routes(app: FastifyInstance) {
  app.get('/orders', listOrders)
  app.get('/orders/:id', getOrder)
  app.post('/orders', createOrder)
  app.put('/orders/:id', updateOrder)
  app.delete('/orders/:id', deleteOrder)
}
