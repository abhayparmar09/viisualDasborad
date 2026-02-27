
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const dataRoutes = require('./routes/dataRoutes');

dotenv.config();

const app = express();

/* ---------- CORS FIX ---------- */
app.use(cors({
  origin: [
    "https://visualdasborad-frontend.onrender.com/"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

/* ---------- DB CONNECT ---------- */
connectDB();

/* ---------- ROUTES ---------- */
app.get("/", (req,res)=>{
  res.send("API Running Successfully 🚀");
});

app.use('/api/data', dataRoutes);

/* ---------- SERVER ---------- */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

