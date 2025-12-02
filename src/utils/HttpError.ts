const messageList: Record<number, string> = {
  400: "Bad request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
};

import { ResponseError } from "./../types/interface.js";

const HttpError = (
  status: number,
  message = messageList[status],
): ResponseError => {
  const error = new Error(message) as ResponseError;
  error.status = status;
  return error;
};

export default HttpError;
