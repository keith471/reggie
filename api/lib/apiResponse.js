// Produces API responses

var ResponseStatus = Object.freeze({
    SUCCESS: "success",
    FAIL: "fail",
    ERROR: "error"
});

var SERVER_ERROR_MESSAGE = "Whoops! Our servers had trouble with that.";

module.exports = {

    buildSuccessResponse: function(data) {
        return {
            status: Status.SUCCESS,
            data: data
        };
    },

    buildFailResponse: function(data) {
        return {
            status: Status.FAIL,
            data: data
        };
    },

    buildErrorResponse: function() {
        var resp = {
            status: Status.ERROR,
            message: SERVER_ERROR_MESSAGE
        };
    }

};
