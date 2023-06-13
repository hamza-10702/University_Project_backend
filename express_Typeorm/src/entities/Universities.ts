import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";
import { Courses } from "./Courses";
import { Students } from "./Students";

@Entity({ name: "university" })
export class University {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  contact: string;

  @ManyToMany(() => Courses, { eager: true })
  @JoinTable({ name: "university_courses" })
  courses: Courses[];

  @OneToMany(() => Students, (student) => student.university, { eager: true })
  students: Students[];
}
