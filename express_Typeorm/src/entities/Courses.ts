import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  Unique,
  JoinTable,
} from "typeorm";
import { University } from "./Universities";

@Unique(["subject_name"])
@Entity({ name: "course" })
export class Courses {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  subject_name: string;

  // @ManyToMany(() => University, { eager: true })
  // @JoinTable({ name: "university_courses" })
  // courses: Courses[];
}
