const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// Get all tags
router.get("/", async (req, res) => {
  try {
    const tagData = await Tag.findAll(req.params.id, {
      // specify the tag's id to find
      include: [{ model: Product }], // include the Products data for each tag
      through: ProductTag,
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a single tag
router.get("/:id", async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }], // include the Products data for each tag
    });
    if (!tagData) {
      res.status(404).json({ message: "No tag found with this id!" });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a tag
router.post("/", async (req, res) => {
  // assuming req.body has tag data
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a tag
router.put("/:id", async (req, res) => {
  try {
    const tagData = await Tag.update(req.body, {
      // assuming req.body has tag data
      where: {
        id: req.params.id, // specify the tag's id to update
      },
    });
    if (!tagData[0]) {
      res.status(404).json({ message: "No tag found with this id!" });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a tag
router.delete("/:id", async (req, res) => {
  // delete a tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        // specify the tag's id to delete
        id: req.params.id,
      },
    });
    if (!tagData) {
      // if tag not found, send 404
      res.status(404).json({ message: "No tag found with this id!" });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
