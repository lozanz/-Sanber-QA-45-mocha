const { expect } = require("chai");
const request = require("supertest");
const {baseUrl, token} = require("../../env/config.js");
const jsonPayload = require("../../data/testData.js");

describe("Add Product positive test case", () => {
  it("add new product with valid data", async () => {
    const response = request(baseUrl)
      .post("/products") 
      .set({
        Authorization: `Bearer ${token}`
      })
      .send(jsonPayload.addProduct);
      console.log((await response).body)
      expect((await response).status).to.equal(201);
      expect((await response).body.status).to.equal("success");     
      expect((await response).body.data.name).to.equal(jsonPayload.addProduct.name);  
  });
});

describe("Add Product negative test case", () => {
  it("add new product without token", async () => {
    const response = request(baseUrl)
      .post("/products") 
      .send({
        "category_id" : "811f547e-a24e-4f94-bfe1-b7ed7d11c03f",
        "code": "A314ASDDFIER3432",
        "name": "taro",
        "price": "3500",
        "cost": "3000",
        "stock": "5"
     });
     console.log((await response).body)
      expect((await response).status).to.equal(401);
      expect((await response).body.error).to.equal("Unauthorized");          
  });
  
  it("add new product with empty name", async () => {
    const response = request(baseUrl)
      .post("/products") 
      .set({
        Authorization: `Bearer ${token}`
      })
      .send({
        "category_id" : "811f547e-a24e-4f94-bfe1-b7ed7d11c03f",
        "code": "A314ASDDFIER3432",
        "name": "",
        "price": "3500",
        "cost": "3000",
        "stock": "5"
     });
     console.log((await response).body)
      expect((await response).status).to.equal(400);
      expect((await response).body.status).to.equal("fail");         
      expect((await response).body.message).to.equal('"name" is not allowed to be empty');         
  });

  it("add new product with price < cost", async () => {
    const response = request(baseUrl)
      .post("/products")  
      .set({
        Authorization: `Bearer ${token}`
      })
      .send({
        "category_id" : "811f547e-a24e-4f94-bfe1-b7ed7d11c03f",
        "code": "A314ASDDFIER3432",
        "name": "taro",
        "price": "1000",
        "cost": "3000",
        "stock": "5"
     });
     console.log((await response).body)
      expect((await response).status).to.equal(400);
      expect((await response).body.status).to.equal("fail");    
      expect((await response).body.message).to.equal('"price" must be greater than ref:cost');      
  });
  
});




