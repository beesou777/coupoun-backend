require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const connectdb = require("./db/connect");
const PORT = process.env.PORT || 8000;

const auth = require("./routes/Auth")
const coupon = require("./routes/coupon")
// Enable CORS for all origins
app.use(cors());
app.use(express.json())
// Set routes
app.use("/api/admin",auth)
app.use("/",coupon)

app.get("/", (req, res) => {
  res.send("Api is running on port" + PORT)
})
const start = async () => {
  try {
    await connectdb(process.env.MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();