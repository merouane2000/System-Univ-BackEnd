const express = require("express");
const Admin = require('../models/Admin');
const Subject = require("../models/Subject");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to systeme univ");
});

router.post("/admin/login", (req, res) => {

Admin.create({
  email:req.body.email,
  password:req.body.password
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
  Subject.create({
    subjectName:req.body.values.subjectName ,
    coif: req.body.values.coif ,
    credit:req.body.values.credit ,
    exam:req.body.values.EXAM  ,
    tp: req.body.values.TP ,
    td: req.body.values.TD ,
    subjectoFSemaster:req.body.values.Semaster
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


console.log(req.body)

});



module.exports = router;