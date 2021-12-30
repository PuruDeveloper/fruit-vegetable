const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const dataRoute = require("./routes/dataRoute");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", dataRoute);

const DATABASE_URL =
  "mongodb+srv://purushottamabhyas:purushottamabhyas123@cluster0.mi2pa.mongodb.net/fruitvegetable?retryWrites=true&w=majority";
const port = process.env.PORT || 5000;

mongoose
  .connect(DATABASE_URL)
  .then(() =>
    app.listen(port, () => {
      console.log(`App running on port: ${port}`);
    })
  )
  .catch((error) => {
    console.log(error.message);
  });
