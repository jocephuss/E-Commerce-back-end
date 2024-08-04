const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  try {
    const categories = await Category.findAll(req.params.id, {
      include: [{ model: Product }], // include the Products data for each category
    });
    res.json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
  // find all categories
  // be sure to include its associated Products
});

router.get("/:id", async (req, res) => {
  // find a single category by its `id` value
  //
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product }], // include the Products data for each category
    });
    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }
    res.json(category); // find a single category by its `id` value
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // assuming req.body has category data
  try {
    const categories = await Category.create(req.body);
    res.status(200).json(categories);
  } catch (err) {
    res.status(400).json(err);
  }
  // create a new category
});

router.put("/:id", async (req, res) => {
  // assuming req.body has category data
  try {
    const categories = await Category.update(req.body, {
      where: { id: req.params.id }, // specify the category's id to update
    });
    if (!categories) {
      res.status(404).json({ message: "Category not found" });
      return;
    }
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
  // update a category by its `id` value
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const categories = await Category.destroy({ where: { id: req.params.id } });
    if (!categories) {
      res.status(404).json({ message: "Category not found" }); // if category not found, send 404
      return;
    }
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
  // delete a category by its `id` value
});

module.exports = router;
