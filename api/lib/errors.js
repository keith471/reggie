// Custom errors

// an error should have
// code
// type
// human readable message for client (if applicable)
// context - additional info which can be used to resolve the error
//   reason for the error
//   missing field, invalid parameter, etc

var ServerErrorCode = Object.freeze({
    INTERNAL_SERVER_ERROR: {type: "InternalServerError", code: 1000},  // generic error; use when nothing more specific
    DATABASE_ERROR: {type: "DatabaseError", code: 1001}               // generic error for when things go wrong with a database query
});

var ClientErrorCode = Object.freeze({
    INVALID_REQUEST_ERROR: {type: "InvalidRequestError", code: 1200},    // generic error to be used when you don't want to divulge additional error info
    MISSING_FIELD_ERROR: {type: "MissingFieldError", code: 1201}
});

function ServerError(code, type, message, context) {
    this.code = code;
    this.type = type;
    this.message = message;
    this.context = context;
}

function ApiError(code, type, message, context) {
    this.code = code;
    this.type = type;
    this.message = message;
    this.context = context;
}
