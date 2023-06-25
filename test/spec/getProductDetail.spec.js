const { expect } = require("chai");
const request = require("supertest");
const {baseUrl, token, productId} = require("../../env/config.js");
const jsonPayload = require("../../data/testData.js");

console.log(productId)

describe("Get product detail", () => {
    it("Get product detail with valid id", async () => {
        const response = request(baseUrl)
        .get("/products/" + productId)
        .set({
          Authorization: `Bearer ${token}`
        })
        console.log((await response).body)
        expect((await response).status).to.equal(200);     
        expect((await response).body.data.product.name).to.equal(jsonPayload.addProduct.name);
        expect((await response).body.data.product.price).to.equal(3500); 
    })

    it("Get product detail with invalid id", async () => {
        const response = request(baseUrl)
        .get("/products/xxxx")
        .set({
          Authorization: `Bearer ${token}`
        })
        console.log((await response).body)
        expect((await response).status).to.equal(404);     
        expect((await response).body.status).to.equal("fail");
        expect((await response).body.message).to.equal("id tidak valid"); 
    })
})
