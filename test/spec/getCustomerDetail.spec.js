const { expect } = require("chai");
const request = require("supertest");
const {baseUrl, token, customerId} = require("../../env/config.js");
const jsonPayload = require("../../data/testData.js");

console.log(customerId)

describe("Get Customer detail", () => {
    it("Get Customer detail with valid id", async () => {
        const response = request(baseUrl)
        .get("/customers/" + customerId)
        .set({
          Authorization: `Bearer ${token}`
        })
        console.log((await response).body)
        expect((await response).status).to.equal(200);     
        expect((await response).body.data.customer.name).to.equal(jsonPayload.addCustomer.name);
        expect((await response).body.data.customer.address).to.equal("Bandoeng"); 
    })

    it("Get Customer detail with invalid id", async () => {
        const response = request(baseUrl)
        .get("/customers/xxxx")
        .set({
          Authorization: `Bearer ${token}`
        })
        console.log((await response).body)
        expect((await response).status).to.equal(404);     
        expect((await response).body.status).to.equal("fail");
        expect((await response).body.message).to.equal("id tidak valid"); 
    })
})
