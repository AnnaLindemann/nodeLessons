import Product from "./Product";
import Category from "./Category";

Category.hasMany(Product, {foreignKey: "categoryName", as: "products"})
Product.belongsTo(Category, {foreignKey: "categoryName", as: "products"})

export {Product, Category}