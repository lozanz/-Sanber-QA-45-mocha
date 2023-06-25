const { expect } = require("chai");
const request = require("supertest");
const { baseUrl } = require("../../env/config.js");
const jsonPayload = require("../../data/testData.js");

describe("CRUD Product Flow", () => {
  var token;
  var productName;
  var productId;

  before(async () => {
    const response = request(baseUrl)
      .post("/authentications")
      .send(jsonPayload.login);

    expect((await response).status).to.equal(201);
    expect((await response).body.data.accessToken).not.to.be.null;

    token = (await response).body.data.accessToken;
  });

  it("add new product with valid data", async () => {
    const response = request(baseUrl)
      .post("/products") 
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send(jsonPayload.addProduct);
      console.log((await response).statusCode)
    expect((await response).status).to.equal(201);
    expect((await response).body.status).to.equal("success");
    expect((await response).body.data.name).to.equal(jsonPayload.addProduct.name);

    productName = (await response).body.data.name;
  });

  it("Get list of products", async () => {
    const response = request(baseUrl)
      .get("/products")
      .set({
        Authorization: `Bearer ${token}`,
      });
      console.log((await response).statusCode)
    expect((await response).status).to.equal(200);
    expect((await response).body.data.products[0].name).to.equal(productName);

    productId = (await response).body.data.products[0].id;
  });

  it("Get product detail with valid id", async () => {
    const response = request(baseUrl)
      .get("/products/" + productId)
      .set({
        Authorization: `Bearer ${token}`,
      });
      console.log((await response).statusCode)
    expect((await response).status).to.equal(200);
    expect((await response).body.data.product.name).to.equal("taro");
    expect((await response).body.data.product.price).to.equal(3500);
  });

  it("Update product data with valid data", async () => {
    const response = request(baseUrl)
      .put("/products/" + productId)
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send(jsonPayload.updateProduct);
      console.log((await response).statusCode)
    expect((await response).status).to.equal(200);
    expect((await response).body.status).to.equal("success");
    expect((await response).body.data.name).to.equal(jsonPayload.updateProduct.name);
  });

  it("Delete product", async () => {
    const response = request(baseUrl)
      .delete("/products/" + productId)
      .set({
        Authorization: `Bearer ${token}`,
      });
      console.log((await response).statusCode)
    expect((await response).status).to.equal(200);
    expect((await response).body.status).to.equal("success");
  });
});
describe("CRUD Customer Flow", () => {
  var token;
  var customerName;
  var customerId;

  before(async () => {
    const response = request(baseUrl)
      .post("/authentications")
      .send(jsonPayload.login);

    expect((await response).status).to.equal(201);
    expect((await response).body.data.accessToken).not.to.be.null;

    token = (await response).body.data.accessToken;
  });
  
  it("add new Customer with valid data", async () => {
    const response = request(baseUrl)
      .post("/customers") 
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send(jsonPayload.addCustomer);
      console.log((await response).statusCode)
    // console.log((await response).body)
    expect((await response).status).to.equal(201);
    expect((await response).body.status).to.equal("success");
    expect((await response).body.data.name).to.equal(jsonPayload.addCustomer.name);

    customerName = (await response).body.data.name;
  });

  it("Get list of Customers", async () => {
    const response = request(baseUrl)
      .get("/customers")
      .set({
        Authorization: `Bearer ${token}`,
      });
      console.log((await response).statusCode)
    //   console.log((await response).text)
    expect((await response).status).to.equal(200);
    expect((await response).body.data.customers[0].name).to.equal(customerName);

    customerId = (await response).body.data.customers[0].id;
  });

  it("Get Customer detail with valid id", async () => {
    const response = request(baseUrl)
      .get("/customers/" + customerId)
      .set({
        Authorization: `Bearer ${token}`,
      });
      console.log((await response).statusCode)
    expect((await response).status).to.equal(200);
    expect((await response).body.data.customer.name).to.equal("Budi");
    expect((await response).body.data.customer.address).to.equal("Bandoeng");
  });

  it("Update Customer data with valid data", async () => {
    const response = request(baseUrl)
      .put("/customers/" + customerId)
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send(jsonPayload.updateCustomer);
      console.log((await response).statusCode)
    expect((await response).status).to.equal(200);
    expect((await response).body.status).to.equal("success");
    expect((await response).body.data.name).to.equal(jsonPayload.updateCustomer.name);
  });

  it("Delete Customer", async () => {
    const response = request(baseUrl)
      .delete("/customers/" + customerId)
      .set({
        Authorization: `Bearer ${token}`,
      });
      console.log((await response).statusCode)
    expect((await response).status).to.equal(200);
    expect((await response).body.status).to.equal("success");
  });
});