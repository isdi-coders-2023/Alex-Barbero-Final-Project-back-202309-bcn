import type { Request, Response, NextFunction } from "express";
import CustomError from "../CustomError/CustomError.js";
import chalk from "chalk";
import debugCreator from "debug";

export const notFoundError = (
  _req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const customError = new CustomError(
    "Endpoint not found",
    404,
    "root:errorMiddlewWare:notFound",
  );

  next(customError);
};

const generalError = (
  error: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const debug = debugCreator(`${error.nameSpace ?? "root:errorMiddleWare"}`);
  debug(chalk.red(`error: ${error.privateMessage ?? error.message}`));

  const statusCode = error.statusCode ?? 500;
  res.status(statusCode).json({ message: error.message });
};

export default generalError;
