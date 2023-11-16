const {
  handleServerError,
  handleNotFound,
  handleResponse,
  handleSuccess,
  handleCreated,
} = require("../helpers/handleResponseHelper");
const { validateJoi, schemaStudent } = require("../helpers/joiHelper");

const { Student, Course, Course_Student, sequelize } = require("../models");

// get all Student
exports.getAllStudent = async (req, res) => {
  try {
    const response = await Student.findAll();
    if (!response) {
      return handleNotFound(res);
    }
    return handleSuccess(res, { data: response, message: "Success" });
  } catch (error) {
    handleServerError(res);
  }
};

// get Student detail include course list
exports.getStudentById = async (req, res) => {
  try {
    const { studentId } = req.params;
    const response = await Student.findByPk(studentId, {
      where: { StudentId: studentId },
      include: {
        model: Course,
        attributes: ["id", "name", "credits"],
        through: {
          attributes: [],
        },
      },
    });
    if (!response) {
      return handleNotFound(res);
    }
    return handleSuccess(res, { data: response, message: "Success" });
  } catch (error) {
    handleServerError(res);
  }
};

// get Student that take course with id
exports.getAllStudentByCourseId = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Student.findAll({
      include: {
        model: Course,
        where: {
          id: id,
        },
        attributes: ["id", "name", "credits"],
        through: {
          attributes: [],
        },
      },
    });
    if (!response) {
      return handleNotFound(res);
    }
    return handleSuccess(res, { data: response, message: "Success" });
  } catch (error) {
    handleServerError(res);
  }
};

// create student
exports.createStudent = async (req, res) => {
  try {
    const newData = req.body;
    const { error, handleRes } = validateJoi(res, newData, schemaStudent);
    if (error) {
      return handleRes;
    }
    const isExist = await Student.findByPk(newData.studentId);
    if (isExist) {
      return handleResponse(res, 409, {
        message: `Student with studentId: ${newData.studentId} already exist`,
      });
    }
    const response = await Student.create(newData);
    return handleCreated(res, {
      data: response,
      message: "Success create student",
    });
  } catch (error) {
    console.log(error);
    handleServerError(res);
  }
};

// add course to student
exports.addCourse = async (req, res) => {
  try {
    const { studentId, courseId } = req.params;

    const isStudentExist = await Student.findOne({
      where: { studentId: studentId },
    });

    const isCourseExist = await Course.findOne({
      where: { id: courseId },
    });

    if (!isCourseExist && !isStudentExist) {
      return handleNotFound(res);
    }

    const isAlreadyExist = await Course_Student.findOne({
      where: { studentId: studentId, courseId: courseId },
    });

    if (isAlreadyExist) {
      return handleSuccess(res, {
        message: "Student already take course",
      });
    }

    const response = await Course_Student.create({ studentId, courseId });
    return handleCreated(res, {
      data: response,
      message: "Success take course for student",
    });
  } catch (error) {
    handleServerError(res);
  }
};

// delete Student course from student course list
exports.deleteCourseFromStudentList = async (req, res) => {
  try {
    const { studentId, courseId } = req.params;

    const isExist = await Course_Student.findOne({
      where: { studentId: studentId, courseId: courseId },
    });

    if (!isExist) {
      return handleNotFound(res);
    }

    await isExist.destroy();

    return handleSuccess(res, { message: `Delete Course from student list ` });
  } catch (error) {
    handleServerError(res);
  }
};

// delete Student
exports.deleteStudent = async (req, res) => {
  try {
    const { studentId } = req.params;

    const isExistinStudent = await Student.findAll({
      where: { studentId: studentId },
    });

    if (!isExistinStudent) {
      return handleNotFound(res);
    }
    const isExistinCourseStudent = await Course_Student.findAll({
      where: { studentId: studentId },
    });
    await sequelize.transaction(async (tsc) => {
      if (isExistinCourseStudent) {
        await Course_Student.destroy({
          where: { studentId: studentId },
          transaction: tsc,
        });
      }

      await Student.destroy({
        where: { studentId: studentId },
        transaction: tsc,
      });
    });

    return handleSuccess(res, {
      message: `Delete student with studentId : ${studentId}`,
    });
  } catch (error) {
    handleServerError(res);
  }
};

// edit or update Student
exports.editStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const newData = req.body;

    const fieldToEdit = Object.keys(newData);
    const { error, handleRes } = validateJoi(
      res,
      newData,
      schemaStudent,
      fieldToEdit
    );
    if (error) {
      return handleRes;
    }
    const StudentData = await Student.findByPk(studentId);
    if (!StudentData) {
      return handleNotFound(res);
    }
    const result = await sequelize.transaction(async (tsc) => {
      if (fieldToEdit.includes("studentId")) {
        const isExistinCourseStudent = await Course_Student.findAll({
          where: { studentId: studentId },
          transaction: tsc,
        });
        if (isExistinCourseStudent) {
          await isExistinCourseStudent.update(
            { studentId: newData.studentId },
            { transaction: tsc }
          );
        }
      }
      const response = await StudentData.update(newData, { transaction: tsc });
      return response;
    });

    return handleSuccess(res, {
      data: result,
      message: `Update Student with id :${studentId} Successfully `,
    });
  } catch (error) {
    handleServerError(res);
  }
};
