const Example = require("../controllers/exampleController");

const exampleRoute = (app) => {
  app.get("/examples", Example.getAllExample);
  app.get("/examples/:id", Example.getOneExample);
  app.post("/examples", Example.createExample);
  app.put("/examples/:id", Example.updateExample);
  app.delete("/examples/:id", Example.deleteExample);
};

module.exports = exampleRoute;
