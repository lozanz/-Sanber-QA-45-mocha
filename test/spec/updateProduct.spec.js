const { expect } = require("chai");
const request = require("supertest");
const {baseUrl, token, productId} = require("../../env/config.js");
const jsonPayload = require("../../data/testData.js");

describe("Update product data positive case", () => {
    it("Update product data with valid data", async () => {
        const response = request(baseUrl)
        .put("/products/" + productId)
        .set({
          Authorization: `Bearer ${token}`
        })
        .send(jsonPayload.updateProduct)
        console.log((await response).body)
        expect((await response).status).to.equal(200);     
        expect((await response).body.status).to.equal("success");
        expect((await response).body.data.name).to.equal(jsonPayload.updateProduct.name);
        expect((await response).body.message).to.equal('Product berhasil diupdate');
    })
})

describe("Update product data negative case", () => {
    it("Update product data with empty name", async () => {
        const response = request(baseUrl)
        .put("/products/" + productId)
        .set({
          Authorization: `Bearer ${token}`
        })
        .send({
            "category_id" : "xxx",
            "code": "A314ASDDFIER3432",
            "name": "",
            "price": "4000",
            "cost": "3000",
            "stock": "1"
         }
         )
         console.log((await response).body)
        expect((await response).status).to.equal(400);     
        expect((await response).body.status).to.equal("fail");
        expect((await response).body.message).to.equal('"name" is not allowed to be empty');
    })

    it("Update product data with invalid stock", async () => {
        const response = request(baseUrl)
        .put("/products/" + productId)
        .set({
          Authorization: `Bearer ${token}`
        })
        .send({
            "category_id" : "811f547e-a24e-4f94-bfe1-b7ed7d11c03f",
            "code": "A314ASDDFIER3432",
            "name": "taro",
            "price": "3500",
            "cost": "3000",
            "stock": "dua"
         }
         )
         console.log((await response).body)
        expect((await response).status).to.equal(400);     
        expect((await response).body.status).to.equal("fail");
        expect((await response).body.message).to.equal('"stock" must be a number');
    })
})