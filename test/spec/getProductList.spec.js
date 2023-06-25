const { expect } = require("chai");
const request = require("supertest");
const {baseUrl, token} = require("../../env/config.js");
const jsonPayload = require("../../data/testData.js");

describe("Get product list", () => {
    it("should return a list of products", async () => {
        const response = request(baseUrl)
        .get("/products")
        .set({
          Authorization: `Bearer ${token}`
        })
        console.log((await response).statusCode)
        expect((await response).status).to.equal(200);     
        expect((await response).body.data.products[0].name).to.equal(jsonPayload.addProduct.name); 
    })
})
