import HttpError from "./HttpError.js";
const validateBody = (schema, body) => {
    const result = schema.safeParse(body);
    if (!result.success) {
        const { message } = JSON.parse(result.error.message)[0];
        throw HttpError(400, message);
    }
    return result.data;
};
export default validateBody;
//# sourceMappingURL=validateBody.js.map