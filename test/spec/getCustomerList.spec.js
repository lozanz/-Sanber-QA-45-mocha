const { expect } = require("chai");
const request = require("supertest");
const {baseUrl, token} = require("../../env/config.js");
const jsonPayload = require("../../data/testData.js");

describe("Get product list", () => {
    it("should return a list of customers", async () => {
        const response = request(baseUrl)
        .get("/customers")
        .set({
          Authorization: `Bearer ${token}`
        })
        // console.log((await response).text)
        expect((await response).status).to.equal(200);     
        expect((await response).body.data.customers[0].name).to.equal(jsonPayload.addCustomer.name); 
    })
})
