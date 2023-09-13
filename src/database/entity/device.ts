import {
  BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm'

@Entity( { name: 'device' } )
export class Device extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    role: string

  @CreateDateColumn()
    created_at: Date

  @UpdateDateColumn()
    updated_at?: Date
}
