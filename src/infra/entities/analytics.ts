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

export enum AnalyticsEventType {
  USER_ACTION = 'user_action',
  CONVERSION = 'conversion',
}

@Entity({ name: 'analytics' })
export class Analytics {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    type: 'enum',
    enum: AnalyticsEventType,
  })
  eventType: AnalyticsEventType

  @Column('uuid', { name: 'order_id', nullable: true })
  @ForeignKey<Order>('Order', { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  orderId: string | null

  @Column('varchar', { name: 'user_email', nullable: true })
  userEmail: string | null

  @Column('varchar')
  action: string

  @Column({
    type: 'jsonb',
    array: false,
  })
  metadata: Record<string, unknown>

  @ManyToOne(() => Order, (order) => order.notifications)
  @JoinColumn()
  order: Order

  @CreateDateColumn()
  createdAt: Date
}
