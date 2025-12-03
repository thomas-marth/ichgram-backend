export const handleSaveError = (error, doc, next) => {
    if (error?.name === "ValidationError") {
        error.status = 400;
    }
    if (error?.name === "MongoServerError") {
        error.status = 409;
    }
    next();
};
export const setUpdateSettings = function () {
    this.setOptions({
        new: true,
        runValidators: true,
    });
};
//# sourceMappingURL=hooks.js.map