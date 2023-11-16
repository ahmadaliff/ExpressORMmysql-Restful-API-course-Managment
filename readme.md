# Basic Express

Basic express.js project with basic routes:

- Express
- Joi
- Fs
- Cors
- sequelize

---

## URL

_Server_

```
http://localhost:3000 or http://localhost:5000
```

---

## Run Server

_Server_

```
"npm start" or "node index.js" or "nodemon index.js"
```

---

## Global Response

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

---

# RESTful endpoints

## CourseRoute

### GET /api/course/all

> Get all list course

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```{
 "data": [
        {
            "id": 1,
            "name": "Autopsi",
            "credits": 2,
            "createdAt": "2023-11-15T09:04:53.000Z",
            "updatedAt": "2023-11-15T09:04:53.000Z",
            "employeeId": null
        },
        {
            "id": 2,
            "name": "Bedah",
            "credits": 4,
            "createdAt": "2023-11-15T09:04:53.000Z",
            "updatedAt": "2023-11-16T03:28:14.000Z",
            "employeeId": null
        },
    ],
    "message": "Success"
}
```

_Response (404)_

```
{
    "message": "Data Not Found"
}
```

---

### GET /api/course/detail/:id

> Get detail course

_Request Params_

```
/<id>

```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "data": {
        "id": 1,
        "name": "Autopsi",
        "credits": 2,
        "createdAt": "2023-11-15T09:04:53.000Z",
        "updatedAt": "2023-11-15T09:04:53.000Z",
        "employeeId": null,
        "lecturerCourse": null
    },
    "message": "Success"
}
```

_Response (404)_

```
{
    "message": "Data Not Found"
}
```

---

### POST /api/course/create

> create course

_Request Header_

```
not needed
```

_Request Body_

```
{
  "name": "Autopsi",
  "credits": 5
}
```

_Response (201)_

```
{
    "data": {
        "id": 5,
        "name": "Autopsi",
        "credits": 5,
        "updatedAt": "2023-11-16T04:09:19.656Z",
        "createdAt": "2023-11-16T04:09:19.656Z"
    },
    "message": "Success Create Course"
}
```

_Response (400, bad request)_

```
{
    "status": "Validation Failed",
    "message": "\"name\" is required"
}
```

---

### DELETE /api/course/delete/:id

> delete course

_Request Params_

```
/<id>

```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "message": "Delete Course with id :5 Successfully "
}
```

_Response (404)_

```
{
    "message": "Data Not Found"
}
```

---

### PUT /api/course/edit/:id

> edit course

_Request Params_

```
/<id>

```

_Request Header_

```
not needed
```

_Request Body_

```
{
  "name": "Autopsi dengan id 4",
  "credits": 5

        OR
  "name":"test"

        OR

  "credit":77
}
```

_Response (200)_

```
{
    "data": {
        "id": 5,
        "name": "Autopsi dengan id 4",
        "credits": 5,
        "createdAt": "2023-11-16T04:09:19.000Z",
        "updatedAt": "2023-11-16T04:10:35.103Z",
        "employeeId": null
    },
    "message": "Update Course with id :5 Successfully "
}
```

_Response (404)_

```
{
    "message": "Data Not Found"
}
```

_Response (400, bad request)_

```
{
    "status": "Validation Failed",
    "message": "\"name\" is not allowed to be empty"
}
```

---

## StudentRoute

### GET /api/student/all

> Get all list student

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
"data": [
{
"name": "John John",
"email": "jon@abc.com",
"gender": "male",
"studentId": "123FKG",
"major": "Kedokderan",
"createdAt": "2023-11-15T09:04:53.000Z",
"updatedAt": "2023-11-16T03:10:25.000Z"
},
{
"name": "Bambang",
"email": "bambang@a.com",
"gender": "male",
"studentId": "124FKG",
"major": "Kedokderan",
"createdAt": "2023-11-15T09:04:53.000Z",
"updatedAt": "2023-11-15T09:04:53.000Z"
}
],
"message": "Success"
}

```

_Response (404)_

```

{
    "message": "Data Not Found"
}

```

---

### GET /api/student/detail/:studentId

> Get detail student

_Request Params_

```
/<studentId>

```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "data": {
        "name": "John John",
        "email": "jon@abc.com",
        "gender": "male",
        "studentId": "123FKG",
        "major": "Kedokderan",
        "createdAt": "2023-11-15T09:04:53.000Z",
        "updatedAt": "2023-11-16T03:10:25.000Z",
        "Courses": [
            {
                "id": 1,
                "name": "Autopsi",
                "credits": 2
            },
            {
                "id": 2,
                "name": "Bedah",
                "credits": 4
            }
        ]
    },
    "message": "Success"
}
```

_Response (404)_

```
{
    "message": "Data Not Found"
}
```

---

### GET /api/student/course/:id

> Get detail student

_Request Params_

```
/<id>

```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "data": [
        {
            "name": "John John",
            "email": "jon@abc.com",
            "gender": "male",
            "studentId": "123FKG",
            "major": "Kedokderan",
            "createdAt": "2023-11-15T09:04:53.000Z",
            "updatedAt": "2023-11-16T03:10:25.000Z",
            "Courses": [
                {
                    "id": 1,
                    "name": "Autopsi",
                    "credits": 2
                }
            ]
        },
        {
            "name": "Bambang",
            "email": "bambang@a.com",
            "gender": "male",
            "studentId": "124FKG",
            "major": "Kedokderan",
            "createdAt": "2023-11-15T09:04:53.000Z",
            "updatedAt": "2023-11-15T09:04:53.000Z",
            "Courses": [
                {
                    "id": 1,
                    "name": "Autopsi",
                    "credits": 2
                }
            ]
        }
    ],
    "message": "Success"
}
```

_Response (404)_

```
{
    "message": "Data Not Found"
}
```

---

### POST /api/student/create

> create student

_Request Header_

```
not needed
```

_Request Body_

```
{
    "name": "John John hhdah",
    "email": "jon@a.com",
    "gender": "male",
    "major": "Kedokderan",
    "studentId":"126FKG"
}
```

_Response (201)_

```
{
    "data": {
        "name": "John John hhdah",
        "email": "jon@a.com",
        "gender": "male",
        "major": "Kedokderan",
        "studentId": "126FKG",
        "updatedAt": "2023-11-16T04:20:35.035Z",
        "createdAt": "2023-11-16T04:20:35.035Z"
    },
    "message": "Success create student"
}
```

_Response (400, bad request)_

```
{
    "status": "Validation Failed",
    "message": "\"studentId\" is required"
}
```

---

### POST /api/student/:studentId/add-course/:courseId

> add course or take course

_Request Params_

```
<studentId>/add-course/<course_id>
```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (201)_

```
{
    "message": "Student already take course"
}

OR
{
    "data": {
        "studentId": "123FKG",
        "courseId": "2",
        "updatedAt": "2023-11-16T04:23:16.436Z",
        "createdAt": "2023-11-16T04:23:16.436Z"
    },
    "message": "Success take course for student"
}
```

_Response (404)_

```
{
    "message": "Data Not Found"
}
```

### DELETE /api/student/:studentId/delete-course/:courseId

> delete or drop course

_Request Params_

```
<studentId>/delete-course/<course_id>
```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "message": "Delete Course from student list "
}
```

_Response (404)_

```
{
    "message": "Data Not Found"
}
```

### DELETE /api/student/delete/:studentId

> delete student

_Request Params_

```
<studentId>
```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "message": "Delete student with studentId : 126FKG"
}
```

_Response (404)_

```
{
    "message": "Data Not Found"
}
```

### PUT /api/student/edit/:id

> edit student

_Request Params_

```
/<id>

```

_Request Header_

```
not needed
```

_Request Body_

```
{
  "name": string,
  "email": string,
  ....

        OR
  "name":"test"

        OR

  "email":77

        OR

  ETC
}
```

_Response (200)_

```
{
    "data": {
        "name": "John John hhdah",
        "email": "bambang@m.com",
        "gender": "male",
        "studentId": "126FKG",
        "major": "Kedokderan",
        "createdAt": "2023-11-16T04:26:36.000Z",
        "updatedAt": "2023-11-16T04:28:40.553Z"
    },
    "message": "Update Student with id :126FKG Successfully "
}
```

_Response (404)_

```
{
    "message": "Data Not Found"
}
```

_Response (400)_

```
{
  "status": "Validation Failed",
  "message": "\"email\" is not allowed to be empty"
}
```

---

## LecturerRoute

### GET /api/lecturer/all

> Get all list lecturer

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "data": [
        {
            "name": "DR.Abal abal",
            "email": "pamungkas@mm.com",
            "gender": "male",
            "employeeId": "099DR",
            "createdAt": "2023-11-15T09:04:53.000Z",
            "updatedAt": "2023-11-16T03:32:33.000Z"
        },
        {
            "name": "drg.barbie",
            "email": "barbie@mm.com",
            "gender": "female",
            "employeeId": "100DR",
            "createdAt": "2023-11-15T09:04:53.000Z",
            "updatedAt": "2023-11-15T09:04:53.000Z"
        }
    ],
    "message": "Success"
}

```

_Response (404)_

```

{
    "message": "Data Not Found"
}

```

---

### GET /api/lecturer/detail/:lecturerId

> Get detail lecturer

_Request Params_

```
/<lecturerId>

```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "data": [
        {
            "name": "DR.Abal abal",
            "email": "pamungkas@mm.com",
            "gender": "male",
            "employeeId": "099DR",
            "createdAt": "2023-11-15T09:04:53.000Z",
            "updatedAt": "2023-11-16T03:32:33.000Z",
            "lecturerCourse": []
        }
    ],
    "message": "Success"
}
```

_Response (404)_

```
{
    "message": "Data Not Found"
}
```

---

### GET /api/lecturer/course/:id

> Get detail lecturer

_Request Params_

```
/<id>

```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "data": [
        {
            "name": "DR.Abal abal",
            "email": "pamungkas@mm.com",
            "gender": "male",
            "employeeId": "099DR",
            "createdAt": "2023-11-15T09:04:53.000Z",
            "updatedAt": "2023-11-16T03:32:33.000Z",
            "lecturerCourse": [
                {
                    "id": 2,
                    "name": "Bedah",
                    "credits": 4
                }
            ]
        }
    ],
    "message": "Success"
}
```

_Response (404)_

```
{
    "message": "Data Not Found"
}
```

---

### POST /api/lecturer/create

> create lecturer

_Request Header_

```
not needed
```

_Request Body_

```
{
     "name": "drg.pamungkas",
            "email": "pamungkas@mm.com",
            "gender": "male",
            "employeeId": "101DR"
}
```

_Response (201)_

```
{
    "data": {
        "name": "drg.pamungkas",
        "email": "pamungkas@mm.com",
        "gender": "male",
        "employeeId": "101DR",
        "updatedAt": "2023-11-16T04:45:15.329Z",
        "createdAt": "2023-11-16T04:45:15.329Z"
    },
    "message": "Success create Lecturer"
}
```

_Response (400, bad request)_

```
{
    "status": "Validation Failed",
    "message": "\"studentId\" is required"
}
```

---

### POST /api/lecturer/:lecturerId/add-course/:courseId

> add course or take course

_Request Params_

```
<lecturerId>/add-course/<course_id>
```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (201)_

```
{
    "message": "other Lecturer already take course"
}

OR
{
    "data": {
        "id": 2,
        "name": "Bedah",
        "credits": 4,
        "createdAt": "2023-11-15T09:04:53.000Z",
        "updatedAt": "2023-11-16T04:45:54.803Z",
        "employeeId": "099DR"
    },
    "message": "Success take course for Lecturer"
}
```

_Response (404)_

```
{
    "message": "Data Not Found"
}
```

### DELETE /api/lecturer/:lecturerId/delete-course/:courseId

> delete or drop course

_Request Params_

```
<lecturerId>/delete-course/<course_id>
```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "message": "Delete Course from Lecturer list "
}
```

_Response (404)_

```
{
    "message": "Data Not Found"
}
```

### DELETE /api/lecturer/delete/:lecturerId

> delete lecturer

_Request Params_

```
<lecturerId>
```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "message": "Delete Lecturer with employeeId : 101DR"
}
```

_Response (404)_

```
{
    "message": "Data Not Found"
}
```

### PUT /api/lecturer/edit/:id

> edit lecturer

_Request Params_

```
/<id>

```

_Request Header_

```
not needed
```

_Request Body_

```
{
  "name": string,
  "email": string,
  ....

        OR
  "name":"test"

        OR

  "email":77

        OR

  ETC
}
```

_Response (200)_

```
{
    "data": {
        "name": "DR.Abal abal",
        "email": "pamungkas@mm.com",
        "gender": "male",
        "employeeId": "099DR",
        "createdAt": "2023-11-15T09:04:53.000Z",
        "updatedAt": "2023-11-16T03:32:33.000Z"
    },
    "message": "Update Lecturer with id :099DR Successfully "
}
```

_Response (404)_

```
{
    "message": "Data Not Found"
}
```

_Response (400)_

```
{
  "status": "Validation Failed",
  "message": "\"email\" is not allowed to be empty"
}
```

---
