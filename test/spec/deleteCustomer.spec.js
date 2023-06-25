const { expect } = require("chai");
const request = require("supertest");
const {baseUrl, token, customerId} = require("../../env/config.js");

describe("Delete Customer", () => {
    it("should delete a customer", async () => {
        const response = request(baseUrl)
        .delete("/customers/" + customerId)
        .set({
          Authorization: `Bearer ${token}`
        })
        console.log((await response).body)
        expect((await response).status).to.equal(200);     
        expect((await response).body.status).to.equal("success");

    })
})