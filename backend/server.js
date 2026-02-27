const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const dataRoutes = require('./routes/dataRoutes');

dotenv.config();
connectDB();

const app = express();


app.use(cors({
  origin: "https://visualdasborad-frontend.onrender.com", 
  methods: ["GET","POST","PUT","DELETE"]
 
}));


app.use(express.json());


app.use('/api/data', dataRoutes);


app.get("/", (req,res)=>{
  res.send("API running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
