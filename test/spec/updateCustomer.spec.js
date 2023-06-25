const { expect } = require("chai");
const request = require("supertest");
const {baseUrl, token, customerId} = require("../../env/config.js");
const jsonPayload = require("../../data/testData.js");

describe("Update Customer data positive case", () => {
    it("Update Customer data with valid data", async () => {
        const response = request(baseUrl)
        .put("/customers/" + customerId)
        .set({
          Authorization: `Bearer ${token}`
        })
        .send(jsonPayload.updateCustomer)
        console.log((await response).body)
        expect((await response).status).to.equal(200);     
        expect((await response).body.status).to.equal("success");
        expect((await response).body.data.name).to.equal(jsonPayload.updateCustomer.name);
    })
})

describe("Update Customer data negative case", () => {
    it("Update Customer data with empty name", async () => {
        const response = request(baseUrl)
        .put("/customers/" + customerId)
        .set({
          Authorization: `Bearer ${token}`
        })
        .send({
            "name": "",
            "phone": "08987654321",
            "address": "Bandung",
            "description": "Pelanggan VIP"
         }
         )
         console.log((await response).body)
         expect((await response).status).to.equal(400);     
        expect((await response).body.status).to.equal("fail");
        expect((await response).body.message).to.equal('"name" is not allowed to be empty'); 
    })

    it("Update Customer data with invalid phone", async () => {
        const response = request(baseUrl)
        .put("/customers/" + customerId)
        .set({
          Authorization: `Bearer ${token}`
        })
        .send({
            "name": "Budi Doremi",
            "phone": "ina82123456",
            "address": "Bandung",
            "description": "Pelanggan VIP"
         }
         )
         console.log((await response).body)
         expect((await response).status).to.equal(400);     
        expect((await response).body.status).to.equal("fail");
        expect((await response).body.message).to.equal('"phone" must be a number'); 
    })
    
})