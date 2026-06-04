const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/auth", require("./routes/authRoutes"));
app.use(
  "/api/admin",
  require("./routes/adminRoutes")
);
app.use(
  "/api/stores",
  require("./routes/storeRoutes")
);

app.use(
  "/api/ratings",
  require("./routes/ratingRoutes")
);
app.use(
  "/api/owner",
  require("./routes/ownerRoutes")
);
app.get("/", (req, res) => {
  res.send("Store Rating Platform Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});