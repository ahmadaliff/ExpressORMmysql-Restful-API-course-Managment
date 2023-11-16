const {
  handleServerError,
  handleNotFound,
  handleSuccess,
  handleCreated,
} = require("../helpers/handleResponseHelper");
const { validateJoi, schemaCourse } = require("../helpers/joiHelper");
const { Course, Course_Student, sequelize } = require("../models");

// get all course
exports.getAllCourse = async (req, res) => {
  try {
    const response = await Course.findAll();
    if (!response) {
      return handleNotFound(res);
    }
    return handleSuccess(res, { data: response, message: "Success" });
  } catch (error) {
    handleServerError(res);
  }
};

// get course detail include lecture
exports.getCourseDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Course.findByPk(id, { include: "lecturerCourse" });
    if (!response) {
      return handleNotFound(res);
    }
    return handleSuccess(res, { data: response, message: "Success" });
  } catch (error) {
    handleServerError(res);
  }
};

// add course controller
exports.createCourse = async (req, res) => {
  try {
    const newData = req.body;

    //validation with joi
    const { error, handleRes } = validateJoi(res, newData, schemaCourse);
    if (error) {
      return handleRes();
    }
    const response = await Course.create(newData);

    return handleCreated(res, {
      data: response,
      message: "Success Create Course",
    });
  } catch (error) {
    handleServerError(res);
  }
};

// delete course controller
exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const courseData = await Course.findByPk(id);
    if (!courseData) {
      return handleNotFound(res);
    }
    await courseData.destroy();
    return handleSuccess(res, {
      message: `Delete Course with id :${id} Successfully `,
    });
  } catch (error) {
    handleServerError(res);
  }
};

// edit or update course
exports.editCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const newData = req.body;

    const fieldToEdit = Object.keys(newData);
    const { error, handleRes } = validateJoi(
      res,
      newData,
      schemaCourse,
      fieldToEdit
    );
    if (error) {
      return handleRes;
    }
    const courseData = await Course.findByPk(id);
    if (!courseData) {
      return handleNotFound(res);
    }

    const result = await sequelize.transaction(async (tsc) => {
      if (fieldToEdit.includes("id")) {
        const isExistinCourseStudent = await Course_Student.findAll({
          where: { courseId: id },
        });
        if (isExistinCourseStudent) {
          await isExistinCourseStudent.update(
            { courseId: newData.id },
            { transaction: tsc }
          );
        }
      }
      const response = await courseData.update(newData, { transaction: tsc });
      return response;
    });

    return handleSuccess(res, {
      data: result,
      message: `Update Course with id :${id} Successfully `,
    });
  } catch (error) {
    handleServerError(res);
  }
};
