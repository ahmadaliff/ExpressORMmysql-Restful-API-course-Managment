const { Router } = require("express");
const {
  getAllLecturer,
  getLecturerById,
  getAllLecturerByCourseId,
  createLecturer,
  handleCourse,
  deleteLecturer,
  editLecturer,
  deleteCourseFromLecturerList,
} = require("../controllers/lectureController");

const router = Router();

router.get("/all", getAllLecturer);
router.get("/detail/:lecturerId", getLecturerById);
router.get("/course/:id", getAllLecturerByCourseId);
router.post("/create", createLecturer);
router.post("/:lecturerId/handle-course/:courseId", handleCourse);
router.delete(
  "/:lecturerId/delete-course/:courseId",
  deleteCourseFromLecturerList
);
router.delete("/delete/:lecturerId", deleteLecturer);
router.put("/edit/:lecturerId", editLecturer);

module.exports = router;
