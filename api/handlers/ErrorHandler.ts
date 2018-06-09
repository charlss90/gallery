import { Express, Request, Response, NextFunction } from "express";
import { HttpStatusCode, ArgumentError } from "@common";
import { BadRequest } from "@api/errors";

export interface ErrorResponse {
  code: number;
  message?: string;
  stack?: string;
}

export const errorHandler = async (err: any, req: Request, res: Response, next: NextFunction) => {
  const response: ErrorResponse = {
    code: HttpStatusCode.InternalError,
    message: "",
    stack: "",
  };
  try {
    response.message = err.message;
    response.stack = err.stack;
    if (err instanceof BadRequest || err instanceof ArgumentError) {
      response.code = HttpStatusCode.BadRequest;
    }
  } catch (ex) {
    response.message = ex.message;
    response.stack = ex.stack;
  }
  res.status(response.code).send(response);
};