import express, { Express, Router } from "express";
import bodyParser from "body-parser";
import {} from "querystring";
import { errorHandler } from "@api/handlers";

export class ApiFactory {
  static create(router: Router): Express {
    const app = express();

    app.use(bodyParser.json());
    router.use(errorHandler);
    app.use(router);

    return app;
  }
}