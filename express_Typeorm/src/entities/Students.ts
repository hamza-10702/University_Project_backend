import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from "typeorm";
import { Courses } from "./Courses";
import { University } from "./Universities";

@Entity({ name: "student" })
export class Students {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  age: number;

  @ManyToMany(() => Courses, { eager: true })
  @JoinTable({ name: "students_courses" })
  courses: Courses[];

  @ManyToOne(() => University, (university) => university.students)
  university: University;
}
