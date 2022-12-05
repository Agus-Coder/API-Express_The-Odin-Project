const express = require("express");
const router = express.Router();

router.get("/:categoryId/products/:productId", (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId, // in this case, any id inserted will retrieve the same object
    productId, // in this case, any id inserted will retrieve the same object
  });
});

module.exports = router;
