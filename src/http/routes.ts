import type { FastifyInstance } from 'fastify'

import { createOrder } from './controllers/create-order'
import { deleteOrder } from './controllers/delete-order'
import { getOrder } from './controllers/get-order'
import { getPayment } from './controllers/get-payment'
import { listOrders } from './controllers/list-orders'
import { listPayments } from './controllers/list-payments'
import { processPayment } from './controllers/process-payment'
import { refundPayment } from './controllers/refund-payment'
import { updateOrder } from './controllers/update-order'

export async function routes(app: FastifyInstance) {
  app.get('/orders', listOrders)
  app.get('/orders/:id', getOrder)
  app.post('/orders', createOrder)
  app.put('/orders/:id', updateOrder)
  app.delete('/orders/:id', deleteOrder)

  app.get('/payments', listPayments)
  app.get('/payments/:id', getPayment)
  app.post('/payments', processPayment)
  app.post('/payments/:id/refund', refundPayment)
}
