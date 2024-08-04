// import models
const Product = require("./Product");
const Category = require("./Category");
const Tag = require("./Tag");
const ProductTag = require("./ProductTag");

// Products belongsTo Category

Product.belongsTo(Category, {
  // foreignKey is categoryId in Product table)
  foreignKey: "categoryId",
});

// Categories have many Products

Category.hasMany(Product, {
  // foreignKey is productId in Category table)
  foreignKey: "categoryId",
});

// Products belongToMany Tags (through ProductTag)

Product.belongsToMany(Tag, {
  // foreignKey is productId in Product table)
  through: ProductTag, // through is the name of the join table
  foreignKey: "productId", // otherKey is the name of the column in the join table referencing the other model (Tag)
  otherKey: "tagId",
});
Tag.belongsToMany(Product, {
  // foreignKey is tagId in Tag table)
  through: ProductTag, // through is the name of the join table
  foreignKey: "tagId", // otherKey is the name of the column in the join table referencing the other model (Product)
  otherKey: "productId",
});

// Tags belongToMany Products (through ProductTag)

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
