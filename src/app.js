//importing functions and package  from their roots

const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const path = require("path");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:4000/api", "http://localhost:3000"],
  })
);

app.use(express.json());
app.use(express({ type: "application/vnd.api+json" }));
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: process.env.COOKIE_NAME,
    secret: process.env.COOKIE_SECRET,
    httpOnly: true,
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

app.use("/images", express.static("./images"));

const userRoute = require("./routes/user.routes");
const authRoute = require("./routes/auth.routes");
const sectorRoute = require("./routes/sector.routes");
const profileRoute = require("./routes/profile.routes");
const categoryRoutes = require("./routes/category.routes");
const companyRoute = require("./routes/company.routes");
const jobRoute = require("./routes/job.routes");
const skillRoute = require("./routes/skill.routes");
const jobSkillRoute = require("./routes/job_skill.routes");
const userJobRoutes = require("./routes/user_job.routes");
const browseByRoute = require("./routes/browse_by.routes");
// const notificationsRouter = require("./routes/notifications.routes");

// app.use("/api/notifications", notificationsRouter);
app.use("/api/", userRoute);
app.use("/api/", authRoute);
app.use("/api/", sectorRoute);
app.use("/api/", profileRoute);
app.use("/api/", categoryRoutes);
app.use("/api/", companyRoute);
app.use("/api/", jobRoute);
app.use("/api/", skillRoute);
app.use("/api/", jobSkillRoute);
app.use("/api/", userJobRoutes);
app.use("/api/", browseByRoute);

// app.use(express.static(path.join(__dirname, "/jobplus-react-frontend/build")));

// app.get("*", (req, res) => {
//   res.sendFile(
//     path.join(__dirname, "/jobplus-react-frontend/build", "index.html")
//   );
// });

//exporting app.js
module.exports = app;
