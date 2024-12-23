import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('event')
export class Event {
    @PrimaryGeneratedColumn()
    id:number;
    @Column('varchar')
    name:string
    @Column('varchar')
    description:string
    @Column('date')
    when:Date;
    @Column('varchar')
    address:string
}
