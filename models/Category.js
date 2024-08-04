const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class Category extends Model {}

Category.init(
  // defining table schema
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // define columns
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "category",
  }
);

module.exports = Category;
