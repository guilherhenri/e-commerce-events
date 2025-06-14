import path from 'node:path'

import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD!,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  logging: process.env.NODE === 'development',
  entities: [path.resolve(__dirname, 'entities', '*.ts')],
  subscribers: [],
  migrations: [path.resolve(__dirname, 'migrations', '*.ts')],
})
