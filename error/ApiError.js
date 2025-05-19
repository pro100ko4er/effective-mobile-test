export default class ApiError {
    constructor(status, message, errors = []) {
        this.status = status
        this.message = message
        this.errors = errors
    }

    static BadRequest(message, errors) {
        return new ApiError(404, message, errors)
    }

    static Unauthorized(message, errors) {
        return new ApiError(401, message, errors)
    }

    static Internal(message, errors) {
        return new ApiError(500, message, errors)
    }

    static Forbidden(message, errors) {
        return new ApiError(403, message, errors)
    }

    static ApiAnyError(code = 500, data, errors = []) {
        return new ApiError(code, data, errors)
    }  
}