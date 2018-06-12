import express, { Express, Router } from "express";
import bodyParser from "body-parser";
import { errorHandler } from "@api/handlers";

export class ApiFactory {
  static create(router: Router): Express {
    const app = express();

    return this.injectApp(router, app);
  }

  static injectApp(router: Router, app: Express) {
    app.use(bodyParser.json());
    router.use(errorHandler);
    app.use(router);

    return app;
  }
}