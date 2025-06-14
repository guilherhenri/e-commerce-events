import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity({ name: 'inventory' })
export class Inventory {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    type: 'uuid',
    unique: true,
  })
  productId: string

  @Column('varchar')
  name: string

  @Column('int')
  quantity: number

  @Column('int')
  reservedQuantity: number

  @Column('int')
  lowStockThreshold: number

  @Column('int')
  unitPrice: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
