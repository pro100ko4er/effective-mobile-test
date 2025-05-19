import ApiError from "../error/ApiError.js";
export default function(err, req, res, next) {
    if(err instanceof ApiError) {
        return res.status(err.status).json({status: 'error', message: err.message, errors: err.errors})
    }
    
    return res.status(500).json({status: 'error', message: "Internal error! Try again later...", error: err.message })
}