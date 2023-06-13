import "reflect-metadata";
import express from "express";
import AppDataSource from "./DataSource";
import { University } from "./entities/Universities";
import { Courses } from "./entities/Courses";
import { Students } from "./entities/Students";
var cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
const port = 5002;

app.post("/university", async (req: any, res: any) => {
  try {
    const UniversityRepo = AppDataSource.getRepository(University);
    const courseRepo = AppDataSource.getRepository(Courses);

    if (req.body) {
      const { name, address, contact, dynamicFields, courses } = req.body;
      const uni = new University();
      uni.name = name;
      uni.address = address;
      uni.contact = contact;

      // console.log(courses, dynamicFields);
      const newCourse = dynamicFields?.map((course: any) => {
        const courseData = new Courses();
        courseData.subject_name = course.newCourses;
        return courseData;
      });
      const savedNewCourse = await courseRepo.save(newCourse);
      // console.log(savedNewCourse);
      let allRelatesCourse = [...courses, ...savedNewCourse];

      if (allRelatesCourse.length > 0) {
        uni.courses = allRelatesCourse;
      }
      const submitUni = await UniversityRepo.save(uni);
      res.status(200).send({ status: "Success", data: submitUni });
    } else {
      res.status(200).send({ status: "Please Submit Valid Data" });
    }
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

app.get("/university", async (req, res) => {
  try {
    const UniversityRepo = AppDataSource.getRepository(University);
    const uniData = await UniversityRepo.find();
    res.status(200).send({ data: uniData });
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

app.delete("/university/:id", async (req, res) => {
  try {
    const UniversityRepo = AppDataSource.getRepository(University);
    await UniversityRepo.delete({ id: Number(req.params.id) });
    res.status(200).send({ data: "Deleted Succesfully" });
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

app.put("/university/:id", async (req, res) => {
  try {
    const universityId = Number(req.params.id);
    const { name, address, contact, dynamicFields, courses } = req.body;
    const UniversityRepo = AppDataSource.getRepository(University);
    const courseRepo = AppDataSource.getRepository(Courses);

    const uniUptoDate = await UniversityRepo.findOneBy({ id: universityId });
    if (uniUptoDate) {
      uniUptoDate.name = name;
      uniUptoDate.address = address;
      uniUptoDate.contact = contact;

      console.log(courses, dynamicFields);
      const newCourse = dynamicFields?.map((course: any) => {
        const courseData = new Courses();
        courseData.subject_name = course.newCourses;
        return courseData;
      });
      const savedNewCourse = await courseRepo.save(newCourse);
      // console.log(savedNewCourse);
      let allRelatesCourse = [...courses, ...savedNewCourse];

      if (allRelatesCourse.length > 0) {
        uniUptoDate.courses = allRelatesCourse;
      }
      const updatedUni = await UniversityRepo.save(uniUptoDate);
      res.status(200).send({ data: updatedUni });
    } else {
      res.status(200).send({ data: "Record Not Found" });
    }
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

//courses
app.post("/courses", async (req: any, res: any) => {
  try {
    const courseRepo = AppDataSource.getRepository(Courses);
    if (req.body) {
      const { subject_name } = req.body;
      const course: Courses = new Courses();
      course.subject_name = subject_name;
      const submitCourse = await courseRepo.save(course);
      res.status(200).send({ status: "Success", data: submitCourse });
    } else {
      res.status(200).send({ status: "Please Submit Valid Data" });
    }
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

app.get("/courses", async (req, res) => {
  try {
    const courseRepo = AppDataSource.getRepository(Courses);
    const courseData = await courseRepo.find();
    res.status(200).send({ data: courseData });
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

app.delete("/courses/:id", async (req, res) => {
  try {
    const courseRepo = AppDataSource.getRepository(Courses);
    await courseRepo.delete({ id: Number(req.params.id) });
    res.status(200).send({ data: "Deleted Succesfully" });
  } catch (error) {
    res.status(400).send({ error });
  }
});

app.put("/courses/:id", async (req, res) => {
  try {
    const courseId = Number(req.params.id);
    const { subject_name } = req.body;
    const courseRepo = AppDataSource.getRepository(Courses);
    const courseUptoDate = await courseRepo.findOne({
      where: { id: courseId },
    });
    if (courseUptoDate) {
      courseUptoDate.subject_name = subject_name;
      const updatedCourse = await courseRepo.save(courseUptoDate);
      res.status(200).send({ data: updatedCourse });
    } else {
      res.status(200).send({ data: "NO Found" });
    }
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

//students

app.post("/students", async (req: any, res: any) => {
  try {
    const studentRepo = AppDataSource.getRepository(Students);
    if (req.body) {
      const { firstName, lastName, email, age, courses, university } = req.body;
      // console.log(university);
      const student: Students = new Students();

      student.firstName = firstName;
      student.lastName = lastName;
      student.email = email;
      student.age = age;
      student.university = university;
      student.courses = courses;

      const submitStudent = await studentRepo.save(student);
      res.status(200).send({ status: "Success", data: submitStudent });
    } else {
      res.status(200).send({ status: "Please Submit Valid Data" });
    }
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

app.get("/students", async (req, res) => {
  try {
    const studentRepo = AppDataSource.getRepository(Students);
    const studentData = await studentRepo.find({
      relations: ["university"],
    });
    res.status(200).send({ data: studentData });
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

app.delete("/students/:id", async (req, res) => {
  try {
    const studentRepo = AppDataSource.getRepository(Students);
    await studentRepo.delete({ id: Number(req.params.id) });
    res.status(200).send({ data: "Deleted Succesfully" });
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

app.put("/students/:id", async (req, res) => {
  try {
    const courseId = Number(req.params.id);
    const { firstName, lastName, email, age, courses, university } = req.body;

    const studentRepo = AppDataSource.getRepository(Students);
    const studentUptoDate = await studentRepo.findOne({
      where: { id: courseId },
    });

    if (studentUptoDate) {
      studentUptoDate.firstName = firstName;
      studentUptoDate.lastName = lastName;
      studentUptoDate.email = email;
      studentUptoDate.age = age;
      studentUptoDate.university = university;
      studentUptoDate.courses = courses;

      const studentCourses = await studentRepo.save(studentUptoDate);
      res.status(200).send({ data: studentCourses });
    } else {
      res.status(200).send({ data: "NO Found" });
    }
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

app.get("/dashboard", async (req, res) => {
  try {
    const uniRepo = AppDataSource.getRepository(University);
    const uniCount = await uniRepo.count();
    const courseRepo = AppDataSource.getRepository(Courses);
    const courseCount = await courseRepo.count();
    const studentRepo = AppDataSource.getRepository(Students);
    const studentCount = await studentRepo.count();
    res.status(200).send({ data: { uniCount, courseCount, studentCount } });
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    app.listen(port, () => {
      console.log("Server Started on " + port);
    });
  })
  .catch((err: any) => {
    console.error("Error during Data Source initialization", err);
  });
