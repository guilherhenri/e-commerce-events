import {
  Column,
  CreateDateColumn,
  Entity,
  ForeignKey,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { Order } from './order'

export enum NotificationType {
  EMAIL = 'email',
  SMS = 'sms',
  PUSH = 'push',
}

export enum NotificationStatus {
  REQUESTED = 'requested',
  SENT = 'sent',
  FAILED = 'failed',
}

@Entity({ name: 'notifications' })
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('uuid', { name: 'order_id', nullable: true })
  @ForeignKey<Order>('Order', { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  orderId: string | null

  @Column({
    type: 'enum',
    enum: NotificationType,
  })
  type: NotificationType

  @Column('varchar')
  recipient: string

  @Column({
    type: 'enum',
    enum: NotificationStatus,
    default: NotificationStatus.REQUESTED,
  })
  status: NotificationStatus

  @Column('text')
  message: string

  @Column('timestamp', { name: 'sent_at', nullable: true })
  sentAt: Date | null

  @ManyToOne(() => Order, (order) => order.notifications)
  @JoinColumn()
  order: Order

  @CreateDateColumn()
  createdAt: Date
}
