const express = require("express");
const app = express();
require("dotenv/config");

const cors = require("cors");
const {default : mongoose} = require("mongoose");

app.use(cors(
  {
    origin : true
  }
));
app.use(express.json());

app.get("/", (req, res) => {
  return res.json("Hello World!")
});

// User Authentication Route
const userRoute = require("./routes/auth");
app.use("/api/users/", userRoute);

// Artist Routes
const artistsRoutes = require("./routes/artist");
app.use("/api/artists/", artistsRoutes);

// Album Routes
const albumRoutes = require("./routes/albums");
app.use("/api/albums/", albumRoutes);

// Song Routes
const songRoutes = require("./routes/songs");
app.use("/api/songs/", songRoutes);

mongoose.connect(process.env.DB_STRING, {useNewUrlParser : true});
mongoose.connection
.once("open", () => console.log("Connected!"))
.on("error", (error) => {
  console.log(`ERROR : ${error}`);
});

app.listen(4000, () => console.log("Listening to port 4000"));
