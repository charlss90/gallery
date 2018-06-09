import { HttpRequest, ArgumentError } from "@common";
import { mock, SinonMock, match } from "sinon";
import request from "request";
import { expect } from "chai";

describe("[Unit Test] HttpRequest: getAsync", () => {
  let httpRequest: HttpRequest;
  let requestMock: SinonMock;
  const invalidUrl = "invalidUrl";
  const validUrl = "http://my.lock";

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
    const error = new Error("Any error");
    // requestMock.expects("get")
    //   .withArgs(validUrl, match.any)
    //   .callArgWith(1, error, null, null);

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
});