const express = require("express");
const cors = require("cors");
const router = express.Router();
const showcoursesRouter = require("./routes/showcourses"); 

router.use(cors());
router.use(express.json());

router.use('/showcourse', showcoursesRouter);

router.get("/", (req, res) => {
  res.json({ message: "Hello from server!" });
});

module.exports = router;
