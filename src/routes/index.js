const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
require("express-async-errors");
const { ErrorMiddleware, NotFoundMiddleware } = require("../middlewares");

module.exports = function ({ HomeRoutes }) {
  const router = express.Router();
  const apiRoutes = express.Router();

  //Default middlewares of route
  apiRoutes
  .use(express.json())
  .use(cors())
  .use(morgan("dev"))
  .use(helmet())
  .use(compression());

  apiRoutes.use("/home", HomeRoutes);

  router.use("/v1/api", apiRoutes);

  router.use(NotFoundMiddleware);
  router.use(ErrorMiddleware);

  return router;
};
