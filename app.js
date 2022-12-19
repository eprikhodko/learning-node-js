const http = require("http");
const path = require("path");
const express = require("express");
const cors = require("cors");
// The body-parser middleware is required to parse the request body and make it available in the req.body object. We can also use express.json()
// const bodyParser = require("body-parser");

// create an instance of express app
const app = express();
/* 
This code is setting up a middleware in an Express.js application that enables cross-origin resource sharing (CORS). The cors middleware allows the server to accept requests from a specific origin (http://localhost:4444 in this case).

CORS is a security feature implemented by web browsers that blocks web pages from making requests to a different domain than the one that served the web page. For example, if a web page served from http://example.com makes a request to http://other-domain.com, the browser will block the request unless other-domain.com explicitly allows it through CORS.

The cors middleware allows the server to include the appropriate CORS headers in its responses, indicating to the browser that it is allowed to make requests to the server from the specified origin. This can be useful in development environments, where the frontend and backend are running on different domains or ports.

By using the cors middleware, the server is configured to accept requests from the specified origin (http://localhost:4444 in this case). Without this middleware, the server would reject requests from this origin, and the browser would block the request.

Cross-origin resource sharing (CORS) is a security feature implemented by web browsers that blocks web pages from making requests to a different domain than the one that served the web page. This is done to prevent malicious web pages from making unauthorized requests on behalf of the user.

CORS is important because it helps to ensure that web applications can only make requests to APIs and other resources that they are authorized to access. Without CORS, a web page from one domain could potentially make requests to any other domain, potentially exposing sensitive information or allowing unauthorized access to resources.

However, CORS can also be a hindrance in development, as it prevents the frontend and backend of a web application from being served from different domains or ports. In these cases, the server needs to include the appropriate CORS headers in its responses to allow the browser to make requests to the server from the specified origin. This is where the cors middleware can be useful, as it allows the server to include the necessary CORS headers in its responses.
*/
app.use(cors({ origin: "http://localhost:4444" }));
// looks like bodyParser and express.json() works the same
// app.use(bodyParser.json());

/* 
parse application/json 

app.use(express.json()) is a piece of code that is used to configure the middleware in an Express.js web application.

Express.js is a web application framework for Node.js that provides a set of functions for building web applications. Middleware functions are functions that have access to the request and response objects, and are used to modify the request and response objects or to perform some other action before the response is sent back to the client.

express.json() is a built-in middleware function in Express.js that parses the request body and populates the request.body property with the parsed JSON object. This allows you to easily access the data contained in the request body as a JavaScript object.

By calling app.use(express.json()), you are telling the Express.js application to use the express.json() middleware function to parse the request body of incoming requests. This allows you to access the data contained in the request body using the request.body property.

This is often used when building APIs that accept JSON data in the request body, as it allows you to easily access the data and use it in your application.
*/
app.use(express.json());

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// add access to "public" folder
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes.routes);
app.use(shopRoutes);

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

const server = http.createServer(app);
server.listen(3333);
