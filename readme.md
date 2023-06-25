# sanbercode-batch41-supertest
API Automation

Framework
- Node.js
- Supertest : Make http requests
- JEST : Unit test
- Mocha : Runner, test case management
- Chai : Assertion method (ensure expected = actual)

How?
```
- Installation mocha, supertest, chai
- Get HTTP Request
- POST HTTP Request
- Payload or Data Management
- Reporting with mochawesome
- Integration/Regression?
```

in the folder consists of automation tests per api:
- addProduct.spec.js
- getProductList.spec.js
- getProductDetail.spec.js
- updateProduct.spec.js
- deleteProduct.spec.js

and one file crudProductAndCustomer.suite.js is dedicated to test end to end flow CRUD Product API

How to run test : 
```
npx mocha/[filename].js
```