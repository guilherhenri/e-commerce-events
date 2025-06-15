import {
  Column,
  CreateDateColumn,
  Entity,
  ForeignKey,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { Order } from './order'

export enum PaymentStatus {
  INITIATED = 'initiated',
  APPROVED = 'approved',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

export enum PaymentMethod {
  CREDIT_CARD = 'credit_card',
  DEBIT_CARD = 'debit_card',
  BANK_TRANSFER = 'bank_transfer',
  PIX = 'pix',
}

@Entity({ name: 'payments' })
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('uuid', { name: 'order_id' })
  @ForeignKey<Order>('Order', { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  orderId: string

  @Column('decimal')
  amount: number

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.INITIATED,
  })
  status: PaymentStatus

  @Column({
    type: 'enum',
    enum: PaymentMethod,
  })
  paymentMethod: PaymentMethod

  @OneToOne(() => Order, (order) => order.payment)
  @JoinColumn()
  order: Order

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
