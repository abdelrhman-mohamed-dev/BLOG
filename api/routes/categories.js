const router = require("express").Router();
const category = require("../models/category");

// CREATE CAT
router.post("/", async (req, res) => {
  const newCat = new category(req.body);
  try {
    const savedCat = await newCat.save();
    res.status(200).json(savedCat);
  } catch (err) {
    res.status(500).json(err);
  }
});
// GET CAT
router.get("/", async (req, res) => {
  try {
    const cats = await category.find();
    res.status(200).json(cats);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
