const express = require("express");
require("dotenv").config();
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
const connectToDB = require("./config/connectToDB");
const { notFound, errorHandler } = require("./middlewares/error");

const app = express();

// const i18next = require("i18next");
// const i18nextMiddleware = require("i18next-http-middleware");
// const { configI18n } = require("./config/i18n");

// connection to DB
connectToDB();

// i18n configuration
// configI18n();

// MIDDLEWARES
app.use(bodyParser.json({ limit: 12 * 1048576 }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(cookieParser());
// app.use(i18nextMiddleware.handle(i18next));

// ROUTES
app.use("/api/v0/admin-mails", require("./routes/adminMailRoutes"));
app.use("/api/v0/nodes", require("./routes/nodeRoutes"));
app.use("/api/v0/tags", require("./routes/tagRoutes"));
app.use("/api/v0/languages", require("./routes/languageRoutes"));

app.use("/api/v0/sections", require("./routes/sectionRoutes"));

// Permanent Routes
app.use("/api/v0/pages/", require("./routes/articlePageRoutes"));
app.use("/api/v0/home", require("./routes/homeRoutes"));
app.use("/api/v0/webinar", require("./routes/webinarRoutes"));
app.use("/api/v0/registered-lead", require("./routes/registeredLeadRoutes"));
app.use("/api/v0/tabs", require("./routes/tabRoutes"));

// Error Handler Middleware
app.use(notFound);
app.use(errorHandler);

PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
