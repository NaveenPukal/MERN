const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const UserModel = require("./models/Users");
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("successfully connected");
  })
  .catch((e) => {
    console.log("not connected", e);
  });

app.use(express.json());
app.use(cors());

//api

app.get("/getUsers", (req, res) => {
  UserModel.find({}, (result, err) => {
    if (result) {
      res.json(result);
    } else {
      res.json(err);
    }
  });
});

app.post("/createUsers", async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);
  await newUser.save();

  res.json(user);
});

const PORT = 3030;
app.listen(PORT, () => {
  console.log(`Server is ruunning on port number ${PORT}`);
});
