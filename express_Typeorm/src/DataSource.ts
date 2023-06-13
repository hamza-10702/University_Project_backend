import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Students } from "./entities/Students";
import { University } from "./entities/Universities";
import { Courses } from "./entities/Courses";

// const entities = [User, Courses, Students, University];

const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "hitman",
  database: "check",
  // entities: ["src/entities/*{.ts , .js}"],
  entities: [User, Courses, Students, University],
  synchronize: true,
  // logging: true,
});

export default AppDataSource;
