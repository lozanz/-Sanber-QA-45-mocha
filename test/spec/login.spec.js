const { expect } = require("chai");
const request = require("supertest");
const productData = require("../../data/testData");

let token = "";

describe("Login test suite", () => {
  it("User login with valid data", async () => {
    const response = request("https://kasir-api.belajarqa.com")
      .post("/authentications")
      .send({
        "email": productData.login.email,
        "password": productData.login.password
      });
      
      token = (await response).body.data.accessToken;
      console.log((await response).body)
      expect((await response).status).to.equal(201);
      expect((await response).body.status).to.equal("success");
      expect((await response).body.data.user.email).to.equal(productData.login.email);
  });

});