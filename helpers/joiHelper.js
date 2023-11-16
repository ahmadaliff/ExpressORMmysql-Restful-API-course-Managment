const joi = require("joi");
const { handleResponse } = require("./handleResponseHelper");

//Function to return error status and hanlde response
exports.validateJoi = (res, data, schema, field = null) => {
  const { error } = handleValidateJoi(data, schema, field);
  if (error) {
    return {
      error: true,
      handleRes: handleResponse(res, 400, {
        status: "Validation Failed",
        message: error.details[0].message,
      }),
    };
  }
  return { error: false, handleRes: null };
};

//Function validate with joi and dynamic schema for PATCH
const handleValidateJoi = (data, schema, field) => {
  if (!field) {
    return joi.object(schema).validate(data);
  } else {
    const dynamicSchema = Object.keys(schema)
      .filter((key) => field.includes(key))
      .reduce((obj, key) => {
        obj[key] = schema[key];
        return obj;
      }, {});
    return joi.object(dynamicSchema).validate(data);
  }
};

//Schema Course
exports.schemaCourse = {
  name: joi.string().min(3).required(),
  credits: joi.number().required(),
};

//Schema Student
exports.schemaStudent = {
  name: joi.string().min(3).required(),
  email: joi.string().email().required(),
  gender: joi.string().required(),
  studentId: joi.string().min(4).required(),
  major: joi.string().required(),
};

//Schema Lecturer
exports.schemaLecturer = {
  name: joi.string().min(3).required(),
  email: joi.string().email().required(),
  gender: joi.string().required(),
  employeeId: joi.string().min(4).required(),
  course: joi.object().optional(),
};
