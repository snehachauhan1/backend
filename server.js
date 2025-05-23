// server.js (or app.js)
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const taskRoutes = require("./routes/tasks");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb+srv://snehachauhancl1:Sneha1@cluster0.whm4dvy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/", taskRoutes);
app.get('/', (req, res) => {
  res.send('Backend is running!');
});


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
