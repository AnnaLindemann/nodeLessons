import sequelize from "./config/db.js";
import { Category, Product } from "./models/index.js";


async function testOneToMany() {
  try{
    await sequelize.authenticate()
    console.log("Database connection successful")

    await sequelize.sync({force: true})
    console.log("Tables recreated")

    const category = await Category.create({name: "Electronics"})
    console.log("Category created", category.toJSON())
  
  
  const product1 = await Product.create({name: "Laptop", price: 1455.65, categoryName: "Electronics"})
  const product2 = await Product.create({name: "Phone", price: 459.65, categoryName: "Electronics"})
  console.log("Product1 created", product1.toJSON())
  console.log("Product2 created", product2.toJSON())

  const categoryWithProduct = await Category.findOne({
    where: {name: "Electronics"},
    include: [
    {
      model: Product,
      as: "products",
    },
    ],
  })
  console.log("Category with products:", JSON.stringify(categoryWithProduct.toJSON(), null, 2))

  } catch(err){
    console.log("Errror:", err)
  } finally{
    await sequelize.close()
    console.log("Database connection closed")
  }
}

testOneToMany()