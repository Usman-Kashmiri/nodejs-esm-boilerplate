import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { ApiError } from "./utils/ApiError.js";
import router from "./router.js";
import loggerMiddleware from "./middleware/loggerMiddleware.js";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../swagger_output.json"; // Generated Swagger file

// Middlewares
const app = express();

app.use(express.json());
app.use(cors());
app.options("*", cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(loggerMiddleware);

// router index
app.use("/", router);
// api doc
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get("/", (req, res) => {
  res.send("NodeJs-ESM-Boilerplate v1.1");
});

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(404, "Not found"));
});

export default app;
