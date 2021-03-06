/*
This uses json-server, but with the module approach: https://github.com/typicode/json-server#module
Downside: You can't pass the json-server command line options.
Instead, can override some defaults by passing a config object to jsonServer.defaults();
You have to check the source code to set some items.
Examples:
Validation/Customization: https://github.com/typicode/json-server/issues/266
Delay: https://github.com/typicode/json-server/issues/534
ID: https://github.com/typicode/json-server/issues/613#issuecomment-325393041
Relevant source code: https://github.com/typicode/json-server/blob/master/src/cli/run.js
*/

/* eslint-disable no-console */
const jsonServer = require("json-server");
const server = jsonServer.create();
const path = require("path");
const router = jsonServer.router(path.join(__dirname, "db.json"));
const { v4: uuidv4 } = require("uuid");

// Can pass a limited number of options to this to override (some) defaults. See https://github.com/typicode/json-server#api
const middlewares = jsonServer.defaults({
  // Display json-server's built in homepage when json-server starts.
  static: "node_modules/json-server/dist",
});

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser. Using JSON Server's bodyParser
server.use(jsonServer.bodyParser);

// Simulate delay on all requests
server.use(function (req, res, next) {
  setTimeout(next, 500);
});

// Declaring custom routes below. Add custom routes before JSON Server router

// Add createdAt to all POSTS
server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createdAt = Date.now();
  }
  // Continue to JSON Server router
  next();
});

server.post("/users/", function (req, res, next) {
  const error = validateUser(req.body);
  if (error) {
    res.status(400).send(error);
  } else {
    req.body.id = uuidv4();
    console.log(uuidv4());
    // req.body.slug = createSlug(req.body.title); // Generate a slug for new users.
    next();
  }
});

server.post("/addresses/", function (req, res, next) {
  const error = validateAddress(req.body);
  if (error) {
    res.status(400).send(error);
  } else {
    req.body.id = uuidv4();
    next();
  }
});

// Use default router
// To mimic our PHP API:
// 1. For GET, wrap returned resources with a records property
// 2. For POST, return only the ID
// 3. For DELETE & PUT, the response is ignored anyway, but we have to define ALL the response shapes here
router.render = (req, res) => {
  if (req.method === "POST" || req.method === "PUT") {
    res.jsonp(res.locals.data.id);
  } else if (req.method === "GET" || req.method === "DELETE") {
    res.jsonp({
      records: res.locals.data,
    });
  }
};
server.use(router);

// Start server
const port = 3001;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});

// Centralized logic

function validateUser(user) {
  if (!user.name) return "Name is required.";
  if (!user.age) return "Age is required.";
  if (!user.addressId) return "Address Id is required.";
  return "";
}

function validateAddress(address) {
  if (!address.province) return "Province is required.";
  if (!address.city) return "City is required.";
  if (!address.street) return "Street is required.";
  return "";
}
