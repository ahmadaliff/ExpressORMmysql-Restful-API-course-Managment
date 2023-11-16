const { Router } = require("express");
const {
  getAllCourse,
  getCourseDetail,
  deleteCourse,
  editCourse,
  createCourse,
} = require("../controllers/courseController");

const router = Router();

router.get("/all", getAllCourse);
router.get("/detail/:id", getCourseDetail);
router.post("/create", createCourse);
router.delete("/delete/:id", deleteCourse);
router.put("/edit/:id", editCourse);

module.exports = router;
