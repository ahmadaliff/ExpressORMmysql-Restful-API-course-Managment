const {
  handleServerError,
  handleNotFound,
  handleResponse,
  handleSuccess,
  handleCreated,
} = require("../helpers/handleResponseHelper");
const { validateJoi, schemaLecturer } = require("../helpers/joiHelper");

const { Lecturer, Course, sequelize } = require("../models");

// get all Lecturer
exports.getAllLecturer = async (req, res) => {
  try {
    const response = await Lecturer.findAll();
    return handleSuccess(res, { data: response, message: "Success" });
  } catch (error) {
    handleServerError(res);
  }
};

// get Lecturer detail include course list
exports.getLecturerById = async (req, res) => {
  try {
    const { lecturerId } = req.params;
    const response = await Lecturer.findAll({
      where: { employeeId: lecturerId },
      include: {
        model: Course,
        as: "lecturerCourse",
        attributes: ["id", "name", "credits"],
      },
    });
    return handleSuccess(res, { data: response, message: "Success" });
  } catch (error) {
    handleServerError(res);
  }
};

// get Lecturer that take course with id
exports.getAllLecturerByCourseId = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Lecturer.findAll({
      include: {
        model: Course,
        as: "lecturerCourse",
        where: {
          id: id,
        },
        attributes: ["id", "name", "credits"],
      },
    });
    return handleSuccess(res, { data: response, message: "Success" });
  } catch (error) {
    handleServerError(res);
  }
};

// create Lecturer
exports.createLecturer = async (req, res) => {
  try {
    const newData = req.body;
    const isExist = await Lecturer.findByPk(newData.employeeId);
    if (isExist) {
      return handleResponse(res, 409, {
        message: `Lecturer with employeeId: ${newData.employeeId} already exist`,
      });
    }
    const { error, handleRes } = validateJoi(res, newData, schemaLecturer);
    if (error) {
      return handleRes();
    }
    const response = await Lecturer.create(newData);
    return handleCreated(res, {
      data: response,
      message: "Success create Lecturer",
    });
  } catch (error) {
    handleServerError(res);
  }
};

// handle course to Lecturer
exports.handleCourse = async (req, res) => {
  try {
    const { lecturerId, courseId } = req.params;

    const isLecturerExist = await Lecturer.findOne({
      where: { employeeId: lecturerId },
    });

    const isCourseExist = await Course.findOne({
      where: { id: courseId },
    });

    if (!isCourseExist && !isLecturerExist) {
      return handleNotFound(res);
    }

    const isAlreadyExist = await Course.findOne({
      where: { employeeId: lecturerId },
    });

    if (isAlreadyExist) {
      return handleSuccess(res, {
        message: "other Lecturer already take course",
      });
    }

    const response = await isCourseExist.update({ employeeId: lecturerId });
    return handleCreated(res, {
      data: response,
      message: "Success take course for Lecturer",
    });
  } catch (error) {
    handleServerError(res);
  }
};

// delete Lecturer course from Lecturer course list
exports.deleteCourseFromLecturerList = async (req, res) => {
  try {
    const { lecturerId, courseId } = req.params;

    const isExist = await Course.findOne({
      where: { employeeId: lecturerId, id: courseId },
    });

    if (!isExist) {
      return handleNotFound(res);
    }

    await isExist.update({ employeeId: null });
    res.status(200).json({ message: `Delete Course from Lecturer list ` });
  } catch (error) {
    handleServerError(res);
  }
};

// delete Lecturer
exports.deleteLecturer = async (req, res) => {
  try {
    const { lecturerId } = req.params;

    const isExistinLecturer = await Lecturer.findAll({
      where: { employeeId: lecturerId },
    });

    if (!isExistinLecturer) {
      return handleNotFound(res);
    }
    const isExistinCourse = await Course.findAll({
      where: { employeeId: lecturerId },
    });
    await sequelize.transaction(async (tsc) => {
      if (isExistinCourse) {
        await Course.update(
          { employeeId: null },
          {
            where: { employeeId: lecturerId },
            transaction: tsc,
          }
        );
      }

      await Lecturer.destroy({
        where: { employeeId: lecturerId },
        transaction: tsc,
      });
    });

    return handleSuccess(res, {
      message: `Delete Lecturer with employeeId : ${lecturerId}`,
    });
  } catch (error) {
    console.log(error);
    handleServerError(res);
  }
};

// edit or update Lecturer
exports.editLecturer = async (req, res) => {
  try {
    const { lecturerId } = req.params;
    const newData = req.body;

    const fieldToEdit = Object.keys(newData);
    const { error, handleRes } = validateJoi(
      res,
      newData,
      schemaLecturer,
      fieldToEdit
    );
    if (error) {
      return handleRes();
    }

    const LecturerData = await Lecturer.findByPk(lecturerId);
    if (!LecturerData) {
      return handleNotFound(res);
    }
    const result = await sequelize.transaction(async (tsc) => {
      if (fieldToEdit.includes("lecturerId")) {
        const isExistinCourse = await Course.findAll({
          where: { employeeId: lecturerId },
        });
        if (isExistinCourse) {
          await isExistinCourse.update(
            { employeeId: newData.LecturerId },
            { transaction: tsc }
          );
        }
      }
      const response = await LecturerData.update(newData, { transaction: tsc });
      return response;
    });

    return handleSuccess(res, {
      data: result,
      message: `Update Lecturer with id :${lecturerId} Successfully `,
    });
  } catch (error) {
    handleServerError(res);
  }
};
