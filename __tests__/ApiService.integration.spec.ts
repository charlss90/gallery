import { Express, Router } from "express";
import { createFlickrApi } from "@api/";
import { Server } from "http";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { IPhotoPagination } from "@photos";
import { ErrorResponse } from "@api/handlers";
import { HttpStatusCode } from "@common";

chai.use(chaiHttp);

describe("[Integration] Api: /GET photos", () => {
  const endPoint = "http://localhost:4000";
  const apiKey: string = "59e9561e02d8a39f946bc73f01d4d6d1";
  let app: Express;
  let server: Server;
  const restClient = chai.request(endPoint);

  before((done) => {
    app = createFlickrApi(apiKey);
    server = app.listen(4000, (err: any) => {
      done(err);
    });
  });

  after((done) => {
    server.close(() => {
      done();
    });
  });

  it("get photos when try call api given a valid parameters", (done) => {
    // Arrange
    const page = 1;
    const itemsPerPage = 15;

    // Act
    restClient.get(`/photos?page=${page}&itemsPerPage=${itemsPerPage}`)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        // Assert
        expect(res.ok).to.be.true;
        const response: IPhotoPagination = res.body;

        expect(response).not.to.be.undefined;
        expect(response.total).not.to.be.undefined;
        expect(response.totalPages).to.be.greaterThan(0);
        expect(response.photos).not.to.be.undefined;
        done();
      });
  });

  it("return 400 when try call api given a invalid page", (done) => {
    // Arrange
    const page = -1;
    const itemsPerPage = 15;
    const returnMessage = "Unexpected params: page must be bigger than 0";

    // Act
    restClient.get(`/photos?page=${page}&itemsPerPage=${itemsPerPage}`)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        // Assert
        expect(res.ok).to.be.false;
        const response: ErrorResponse = res.body;

        expect(response).not.to.be.undefined;
        expect(response.code).to.be.equal(HttpStatusCode.BadRequest);
        expect(response.message).not.to.be.undefined;
        expect(response.message).to.be.equal(returnMessage);

        done();
      });
  });
});