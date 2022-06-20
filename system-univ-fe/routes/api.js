const express = require("express");
const mongoose = require("mongoose");
const Classes = require("../models/Classes");
const Student = require("../models/Student");
const Subject = require("../models/Subject");
const User = require("../models/User");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to systeme univ");
});

router.get("/get-subject", (req, res) => {
  Subject.find({}).then((Subjects) => {
    res.send(Subjects);
  });
});

const getCustomizedStudentsList = async () => {
  const data = await Student.find().populate("classes").exec();
  let students = [...data];

  for (let index = 0; index < students.length; index++) {
    const subjects = await Subject.find({ student_id: students[index]._id });
    let student = { ...students[index] };
    student._doc.subjects = [...subjects];
    students[index] = { ...student };
  }
  return students;
};

router.get("/get-student", async (req, res) => {
  const data = await getCustomizedStudentsList();
  res.send(data);
});

router.get("/get-student-and-promo", (req, res) => {
  Student.find({})
    .populate("classes")
    .exec()
    .then((students) => {
      res.send(students);
    });
});

const updateOneSubject = async (subject, student_id, semester, year) => {
  await Subject.updateOne(
    {
      $and: [
        { student_id: student_id },
        { semester: semester },
        { year: year },
        { _id: subject._id },
      ],
    },
    subject
  );
};

router.post("/update-subjects", (req, res) => {
  const { subjects, selectedClass, student_id } = req.body;

  subjects.map((subject) => {
    updateOneSubject(
      subject,
      student_id,
      selectedClass.semastre,
      selectedClass.year
    );
  });
});

router.post("/get-subjects", (req, res) => {
  const { student_id, selectedClass } = req.body;
  console.log(req.body);
  Subject.find({
    $and: [
      { student_id: student_id },
      { semester: selectedClass.semastre },
      { year: selectedClass.year },
    ],
  }).then((subjects) => {
    console.log(subjects);
    res.send(subjects);
  });
});

router.post("/user/login", (req, res) => {
  User.create({
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  })
    .then(() => {
      res.send({
        IsCreated: true,
        role: req.body.role
      });
    })
    .catch((e) => {
      res.send({
        msg: e,
        IsCreated: false,
      });
    });
});

router.post("/subject", (req, res) => {
  const { values, selectedClass, student_id } = req.body;
  Subject.create({
    name: values.name,
    coef: values.coef,
    credit: values.credit,
    coefExam: values.coefExam,
    coefTP: values.coefTP,
    coefTD: values.coefTD,
    student_id: student_id,
    semester: selectedClass.semastre,
    year: selectedClass.year,
  })
    .then(() => {
      res.send({
        IsCreated: true,
      });
    })
    .catch((e) => {
      res.send({
        msg: e,
        IsCreated: false,
      });
    });
});

router.post("/student", (req, res) => {
  const { datas, values } = req.body;

  let classes = new Classes();
  classes._id = new mongoose.Types.ObjectId();
  classes.semastre = values.Semaster;
  classes.year = values.Promo;
  classes.save();

  let student = new Student();
  student._id = new mongoose.Types.ObjectId();
  (student.name = values.FirstName),
    (student.familyName = values.FamilyName),
    (student.registrationNumber = values.RegistrationNumber),
    (student.classes = [classes]);
  student
    .save()
    .then(() => res.send({ isCreated: true, student: student }))
    .catch((e) => {
      res.send({ isCreated: false, msg: e });
    });
});

module.exports = router;
