const {
  createProxyMiddleware
} = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    ["/user", "/user/signup"],
    createProxyMiddleware({
      target: "http://localhost:4000",
    })
  );
};