const express = require("express");
const mongoose = require("mongoose");
const Admin = require("../models/Admin");
const Classes = require("../models/Classes");
const Student = require("../models/Student");
const Subject = require("../models/Subject");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to systeme univ");
});
router.get("/get-subject", (req, res) => {
  Subject.find({}).then((Subjects) => {
    res.send(Subjects);
  });
});
router.get("/get-student", (req, res) => {
  Student.find({}).then((Subjects) => {
    res.send(Subjects);
  });
});

router.get("/get-student-and-promo", (req, res) => {
  Student.find()
    .populate("classes")
    .exec()
    .then((x) => {
      console.log(x);
      res.send(x);
    });
});

router.post("/admin/login", (req, res) => {
  Admin.create({
    email: req.body.email,
    password: req.body.password,
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

router.post("/subject", (req, res) => {
  const data = req.body.values;
  Subject.create({
    subjectName: data.subjectName,
    coif: data.coif,
    credit: data.credit,
    exam: data.EXAM,
    tp: data.TP,
    td: data.TD,
    subjectoFSemaster: data.Semaster,
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
    .then(() => res.send({ isCreated: true }))
    .catch((e) => {
      res.send({ isCreated: false, msg: e });
    });
});

module.exports = router;
