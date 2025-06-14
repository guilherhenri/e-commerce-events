import { AppDataSource } from './data-source'
import { Analytics } from './entities/analytics'
import { Inventory } from './entities/inventory'
import { Notification } from './entities/notification'
import { Order } from './entities/order'
import { Payment } from './entities/payment'

export const analyticsRepository = AppDataSource.getRepository(Analytics)
export const inventoryRepository = AppDataSource.getRepository(Inventory)
export const notificationRepository = AppDataSource.getRepository(Notification)
export const orderRepository = AppDataSource.getRepository(Order)
export const paymentRepository = AppDataSource.getRepository(Payment)
