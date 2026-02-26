const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const Data = require('../models/Data');
const jsondata = require('./jsondata.json');

dotenv.config();
connectDB();

const importData = async () => {
    try {
        await Data.deleteMany();

        const formattedData = jsondata.map(item => ({
            ...item,
            intensity: parseInt(item.intensity) || 0,
            likelihood: parseInt(item.likelihood) || 0,
            relevance: parseInt(item.relevance) || 0,
            end_year: item.end_year === "" ? null : parseInt(item.end_year),
            start_year: item.start_year === "" ? null : parseInt(item.start_year)
        }));

        await Data.insertMany(formattedData);
        console.log('Data Imported successfully');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

importData();
