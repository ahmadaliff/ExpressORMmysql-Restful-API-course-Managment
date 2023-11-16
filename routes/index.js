const { Router } = require("express");

const courseRoute = require("./courseRoute");
const lecturerRoute = require("./lecturerRoute");
const studentRoute = require("./studentRoute");

const router = Router();

router.use("/course", courseRoute);
router.use("/lecturer", lecturerRoute);
router.use("/student", studentRoute);

module.exports = router;
