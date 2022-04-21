const express = require("express");
const Admin = require("../models/Admin");
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

  console.log(req.body);
});

router.post("/student", (req, res) => {
  const { datas, values } = req.body;

  
    // for (let i = 0; i < datas.length; i++) {
    //   if (values.Points.subjectName === datas[i].subjectName) {
    //     if (
    //       datas[i].exam == true &&
    //       datas[i].td == true &&
    //       datas[i].tp == true
    //     ) {
    //       values.Points.subjectMoyenne =
    //         values.Points.Exam * 0.6 +
    //         values.Points.TP * 0.2 +
    //         values.Points.TD * 0.2;
    //     } else if (
    //       datas[i].exam == true &&
    //       datas[i].td == true &&
    //       datas[i].tp == false
    //     ) {
    //       values.Points.subjectMoyenne =
    //         values.Points.Exam * 0.6 +
    //          values.Points.TD * 0.4 +
    //           values.Points.TP * 0 ;
    //     } else if (
    //       datas[i].exam == true &&
    //       datas[i].td == false &&
    //       datas[i].tp == true
    //     ) {
    //       values.Points.subjectMoyenne =
    //         values.Points.Exam * 0.6 +
    //          values.Points.TP * 0.4 +
    //          values.Points.TD * 0 ;
    //     } else if (
    //       datas[i].exam == true &&
    //       datas[i].td == true &&
    //       datas[i].tp == true
    //     ) {
    //       values.Points.subjectMoyenne =
    //        values.Points.Exam*1 +
    //        values.Points.TP * 0 +
    //          values.Points.TD * 0;
    //     }
    //   }
    // }

    Student.create({
      name: values.FirstName,
      familyName: values.FamilyName,
      registrationNumber: values.RegistrationNumber,
      classRoom: values.ClassRoom,
      pointes: [
        {
          subjectName: values.Points.subjectName,
          exam: values.Points.Exam,
          TD: values.Points.TD,
          TP: values.Points.TP,
          // subjectMoyenne: values.Points.subjectMoyenne,
        },
      ],
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


  // if (values != null) {
  //   const filter = { registrationNumber: values.RegistrationNumber };
  //   const arr = valueOfPoints;
  //   const update = [{...arr, valueOfPoints}];
  //   Student.findOneAndUpdate(filter, update);
  // } else {
  // if (values.Points.subjectName === datas[i].map((arr)=>{arr.subjectName})) {
  //   if (datas.exam === true && datas.td === true && datas.tp === true) {
  //     subjectMoyenneCalculated =
  //       values.Points.EXAM * 0.6 +
  //       values.Points.TP * 0.2 +
  //       values.Points.TD * 0.2;
  //   }
  //   if (datas.exam === true && datas.td === true && datas.tp === false) {
  //     subjectMoyenneCalculated = values.Points.EXAM * 0.6 + values.Points.TD * 0.4;
  //   }
  //   if (datas.exam === true && datas.td === false && datas.tp === true) {
  //     subjectMoyenneCalculated = values.Points.EXAM * 0.6 + values.Points.TP * 0.4;
  //   } else {
  //     subjectMoyenneCalculated = values.Points.EXAM;
  //   }
  // }
});

module.exports = router;
