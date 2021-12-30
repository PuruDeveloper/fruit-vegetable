const fs = require("fs");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Datamodel = require("../models/dataModel");

dotenv.config({ path: "../config.env" });

const DB =
  "mongodb+srv://purushottamabhyas:purushottamabhyas123@cluster0.mi2pa.mongodb.net/fruitvegetable?retryWrites=true&w=majority";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection successfull");
  });

const tours = JSON.parse(fs.readFileSync(`${__dirname}/fv.json`, "utf-8"));

const importData = async () => {
  try {
    await Datamodel.create(tours);
    console.log("Data successfully loaded");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async () => {
  try {
    await Datamodel.deleteMany();
    console.log("Data successfully deleted");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};
if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
console.log(process.argv);
