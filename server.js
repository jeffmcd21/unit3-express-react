
// ~ // --------------- DEPENDENCIES --------------- // ~ //
require("dotenv").config();
const { PORT = 5555, MONGODB_URL } = process.env;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");


// ~ // --------------- DATABASE CONNECTION --------------- // ~ //
mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

mongoose.connection
    .on("open", () => console.log("Mongo is mongoing!"))
    .on("close", () => console.log("Separation Sccuess"))
    .on("error", (error) => console.log(error));


// ~ // --------------- MODELS --------------- // ~ //
const PeopleSchema = new mongoose.Schema({
    name: String,
    image: String,
    title: String,
});

const People = mongoose.model("People", PeopleSchema);


// ~ // --------------- MIDDLEWARE --------------- // ~ //
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());


// ~ // --------------- ROUTES --------------- // ~ //
// TEST ROUTE
app.get("/", (req, res) => {
    res.send("Happy Cook... Coding!")
});

// PEOPLE INDEX ROUTE
app.get("/people", async (req, res) => {
    try {
        res.json(await People.find({}))
    } catch (error) {
        res.status(400).json(error)
    }
});

// PEOPLE CREATE ROUTE
app.post("/people", async (req, res) => {
    try {
        res.json(await People.create(req.body))
    } catch (error) {
        res.status(400).json(error)
    }
});

// PEOPLE CREATE ROUTE
app.put("/people/:id", async (req, res) => {
    try {
      res.json(
        await People.findByIdAndUpdate(req.params.id, req.body, { new: true })
      );
    } catch (error) {
      res.status(400).json(error)
    }
  });

// PEOPLE CREATE ROUTE
app.delete("/people/:id", async (req, res) => {
    try {
      res.json(await People.findByIdAndRemove(req.params.id));
    } catch (error) {
      res.status(400).json(error)
    }
  });


// ~ // --------------- SERVER LISTENER --------------- // ~ //
app.listen(PORT, () => {
    console.log(`Listening from SeaPORT ${PORT}`)
})

