const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables from .env file

mongoose.set("strictQuery", false);

// Fetch the MongoDB URI from the .env file
const mongoURI = process.env.MONGO_URI;

// Log the mongoURI for debugging (make sure not to expose it in production)
console.log(`MongoURI: ${mongoURI}`);

const mongoDB = async () => {
  try {
    // Connect to MongoDB using the URI from the environment variable
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");

    // Fetch data from 'food_item' and 'foodCategory' collections
    const foodItemsCollection = mongoose.connection.db.collection("food_item");
    const foodCategoryCollection =
      mongoose.connection.db.collection("foodCategory");

    const foodItemsData = await foodItemsCollection.find({}).toArray();
    const foodCategoryData = await foodCategoryCollection.find({}).toArray();

    // Store data in global variables
    global.food_item = foodItemsData;
    global.foodCategory = foodCategoryData;

    console.log("Data fetched and stored in global variables");
  } catch (err) {
    console.error("Error connecting to MongoDB or fetching data:", err);
  }
};

module.exports = mongoDB;
