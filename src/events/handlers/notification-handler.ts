import { NotificationType } from '@/infra/entities/notification'
import { notificationRepository } from '@/infra/repositories'

import { EventBus } from '../emitters/event-bus'

const eventBus = EventBus.getInstance()

interface SendNotificationProps {
  orderId: string
  recipient: string
}

async function sendEmailNotification(data: SendNotificationProps) {
  const { orderId, recipient } = data

  await notificationRepository.save({
    orderId,
    type: NotificationType.EMAIL,
    recipient,
    message: 'Your order was created',
  })

  eventBus.emitEvent('EMAIL_SEND_REQUESTED', null)
}

export function register() {
  eventBus.on('ORDER_CREATED', sendEmailNotification)
}
