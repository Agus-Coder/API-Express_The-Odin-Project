const express = require("express");
const router = express.Router();

router.get("/users", (req, res) => {
  const { limit, offset } = req.query; // pay attention, this is another object inside req, we use query objects
  if (limit && offset) {
    res.json({
      limit,
      offset,
    });
  } else {
    res.send("there are no parameters");
  }
});

module.exports = router;
