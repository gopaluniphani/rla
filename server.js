const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const labRouter = require("./routes/api/labs");
const studentRouter = require("./routes/api/student");
const instructorRouter = require("./routes/api/instructor");
const activeLabRouter = require("./routes/api/activelabs");

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://localhost/rla", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MonogoDB Connected..."))
  .catch((err) => console.log(err));

//use static
app.use("/", express.static("static"));
app.use(
  "/instructor/dist/",
  express.static(path.resolve(__dirname, "instructor", "dist"))
);
app.use(
  "/student/dist/",
  express.static(path.resolve(__dirname, "student", "dist"))
);
app.get("/instructor", (req, res) => {
  res.sendFile(path.resolve(__dirname, "static", "instructor.html"));
});
app.get("/student", (req, res) => {
  res.sendFile(path.resolve(__dirname, "static", "student.html"));
});

//use routes
app.use("/api/labs", labRouter);
app.use("/api/student", studentRouter);
app.use("/api/instructor", instructorRouter);
app.use("/api/activelabs", activeLabRouter);

app.listen(5000, () => console.log("server started on port 5000"));
