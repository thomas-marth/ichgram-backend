import { type ZodType } from "zod";
import HttpError from "./HttpError.js";

const validateBody = <Output = unknown>(
  schema: ZodType<Output>,
  body: unknown,
): Output => {
  const result = schema.safeParse(body);

  if (!result.success) {
    const { message } = JSON.parse(result.error.message)[0];
    throw HttpError(400, message);
  }

  return result.data;
};

export default validateBody;
