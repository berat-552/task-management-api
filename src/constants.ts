const constants = {
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
};

// fields on create
const requiredFieldsCreate: string[] = [
  "user_id",
  "title",
  "content",
  "completed",
  "dueDate",
  "priority",
];

// fields on update
const requiredFieldsUpdate: string[] = [
  "title",
  "content",
  "completed",
  "dueDate",
  "priority",
];
// fields on login
const requiredFieldsLogin: string[] = ["email", "password"];

// fields on register
const requiredFieldsRegister: string[] = ["username", "email", "password"];

export {
  constants,
  requiredFieldsCreate,
  requiredFieldsUpdate,
  requiredFieldsLogin,
  requiredFieldsRegister,
};
