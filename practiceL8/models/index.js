import Product from "./Product.js";
import Category from "./Category.js";

Category.hasMany(Product, {foreignKey: "categoryName", sourceKey: "name", as: "products"})
Product.belongsTo(Category, {foreignKey: "categoryName",targetKey: "name", as: "category"})

export {Product, Category}