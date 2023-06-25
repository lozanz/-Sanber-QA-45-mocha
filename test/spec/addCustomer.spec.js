const { expect } = require("chai");
const request = require("supertest");
const {baseUrl, token} = require("../../env/config.js");
const jsonPayload = require("../../data/testData.js");

describe("Add Customer positive test case", () => {
  it("add new Customer with valid data", async () => {
    const response = request(baseUrl)
      .post("/customers") 
      .set({
        Authorization: `Bearer ${token}`
      })
      .send(jsonPayload.addCustomer);
      console.log((await response).body)
      
      expect((await response).status).to.equal(201);
      expect((await response).body.status).to.equal("success");     
      expect((await response).body.data.name).to.equal(jsonPayload.addCustomer.name);  
  });
});

describe("Add Customer negative test case", () => {
  it("add new Customer without token", async () => {
    const response = request(baseUrl)
      .post("/customers") 
      .send({
        "name": "Budi",
        "phone": "081234567890",
        "address": "Bandoeng",
        "description": "Budi anak Pak Edi"
     });
     console.log((await response).body)
      //assert response body
      expect((await response).status).to.equal(401);
      expect((await response).body.error).to.equal("Unauthorized");          
  });
  
  it("add new Customer with empty name", async () => {
    const response = request(baseUrl)
      .post("/customers")  
      .set({
        Authorization: `Bearer ${token}`
      })
      .send({
        "name": "",
        "phone": "081234567890",
        "address": "Bandoeng",
        "description": "Budi anak Pak Edi"
     });
     console.log((await response).body)
      //assert response body
      expect((await response).status).to.equal(400);
      expect((await response).body.status).to.equal("fail");          
  });

  it("add new Customer with invalid phone", async () => {
    const response = request(baseUrl)
      .post("/customers")  
      .set({
        Authorization: `Bearer ${token}`
      })
      .send({
        "name": "Budi",
        "phone": "santoso",
        "address": "Bandoeng",
        "description": "Budi anak Pak Edi"
     });
     console.log((await response).body)
      //assert response body
      expect((await response).status).to.equal(400);
      expect((await response).body.status).to.equal("fail");          
  });

  
});




