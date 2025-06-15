import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { Analytics } from './analytics'
import { Notification } from './notification'
import { Payment } from './payment'

export enum OrderStatus {
  CREATED = 'created',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    type: 'varchar',
    name: 'user_email',
  })
  userEmail: string

  @Column('decimal')
  totalAmount: number

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.CREATED,
  })
  status: OrderStatus

  @Column({
    type: 'jsonb',
    array: false,
    default: [],
  })
  items: {
    productId: string
    quantity: number
    price: number
  }[]

  @OneToOne(() => Payment, (payment) => payment.order)
  @JoinColumn()
  payment: Payment

  @OneToMany(() => Notification, (notification) => notification.order)
  @JoinColumn()
  notifications: Notification[]

  @OneToMany(() => Analytics, (analytics) => analytics.order)
  @JoinColumn()
  analytics: Analytics[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
