import { HttpRequest, ArgumentError, HttpError, HttpStatusCode } from "@common";
import { mock, SinonMock, match, stub, SinonStub, SinonStubbedInstance } from "sinon";
import request, { RequestAPI, Request, CoreOptions, RequiredUriUrl } from "request";
import { expect } from "chai";

describe("[Unit Test] HttpRequest: getAsync", () => {
  let httpRequest: HttpRequest;
  let requestMock: SinonMock;
  const invalidUrl = "invalidUrl";
  const validUrl = "http://my.lock";
  const anyError = new Error("Any error");

  beforeEach(() => {
    requestMock = mock(request);
    httpRequest = new HttpRequest(request);
  });

  afterEach(() => {
    requestMock.restore();
  });

  it("throw error when try getAsync given a empty url", (done) => {
    // Act
    httpRequest.getAsync("")
      // Assert
      .then((response) => {
        done(new Error("Unexpected behavior"));
      }).catch((ex) => {
        try {
          expect(ex).to.be.instanceOf(ArgumentError);
          expect(ex.message).to.be.equal("Unexpected Argument: uri cannot be empty");
          done();
        } catch (ex) {
          done(ex);
        }
      });
  });

  it("throw error when try getAsync given a invalid url", (done) => {
    // Act
    httpRequest.getAsync(invalidUrl)
      // Assert
      .then((response) => {
        done(new Error("Unexpected behavior"));
      }).catch((ex) => {
        try {
          expect(ex).to.be.instanceOf(Error);
          expect(ex.message).to.be.match(/Invalid\ URI/gi);
          done();
        } catch (ex) {
          done(ex);
        }
      });
  });

  it("throw Error when try getAsync given a invalid url", (done) => {
    // Arrange
    requestMock.expects("get").callsFake((uri, options, callback) => {
      callback(anyError, null, null);
    });

    // Act
    httpRequest.getAsync(validUrl)
      // Assert
      .then((response) => {
        done(new Error("Unexpected behavior"));
      }).catch((ex) => {
        try {
          expect(ex).to.be.instanceOf(Error);
          done();
        } catch (ex) {
          done(ex);
        }
      });

  });

  it("throw HttpError with status 400 when try getAsync given a invalid url", (done) => {
    // Arrange
    requestMock.expects("get").callsFake((uri, options, callback) => {
      callback(null, { statusCode: HttpStatusCode.InternalError }, null);
    });

    // Act
    httpRequest.getAsync(validUrl)
      // Assert
      .then((response) => {
        done(new Error("Unexpected behavior"));
      }).catch((ex) => {
        try {
          expect(ex).to.be.instanceOf(HttpError);
          expect(ex.status).to.be.eql(HttpStatusCode.InternalError);
          done();
        } catch (ex) {
          done(ex);
        }
      });
  });

  it("return result when try getAsync given a invalid url", async () => {
    // Arrange
    const validResponse = { statusCode: HttpStatusCode.OK };
    const expectedBody = "hello world";
    requestMock.expects("get").callsFake((uri, options, callback) => {
      callback(null, validResponse, expectedBody);
    });

    // Act
    const body = await httpRequest.getAsync<string>(validUrl);

    // Arrange
    expect(body).to.be.exist;
    expect(body).to.be.eql(expectedBody);
  });
});