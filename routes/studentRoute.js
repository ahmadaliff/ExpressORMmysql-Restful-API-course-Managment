const { Router } = require("express");
const {
  getAllStudent,
  getStudentById,
  getAllStudentByCourseId,
  addCourse,
  deleteCourseFromStudentList,
  createStudent,
  editStudent,
  deleteStudent,
} = require("../controllers/studentController");

const router = Router();

router.get("/all", getAllStudent);
router.get("/detail/:studentId", getStudentById);
router.get("/course/:id", getAllStudentByCourseId);
router.post("/create", createStudent);
router.post("/:studentId/add-course/:courseId", addCourse);
router.delete(
  "/:studentId/delete-course/:courseId",
  deleteCourseFromStudentList
);
router.delete("/delete/:studentId", deleteStudent);
router.put("/edit/:studentId", editStudent);

module.exports = router;
