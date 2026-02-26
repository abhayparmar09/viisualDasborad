const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    end_year: { type: mongoose.Schema.Types.Mixed, default: "" },
    intensity: { type: Number, default: 0 },
    sector: { type: String, default: "" },
    topic: { type: String, default: "" },
    insight: { type: String, default: "" },
    url: { type: String, default: "" },
    region: { type: String, default: "" },
    start_year: { type: mongoose.Schema.Types.Mixed, default: "" },
    impact: { type: mongoose.Schema.Types.Mixed, default: "" },
    added: { type: String, default: "" },
    published: { type: String, default: "" },
    country: { type: String, default: "" },
    relevance: { type: Number, default: 0 },
    pestle: { type: String, default: "" },
    source: { type: String, default: "" },
    title: { type: String, default: "" },
    likelihood: { type: Number, default: 0 },
    city: { type: String, default: "" },
    swot: { type: String, default: "" }
}, {
    timestamps: true
});

dataSchema.index({ country: 1 });
dataSchema.index({ region: 1 });
dataSchema.index({ topic: 1 });
dataSchema.index({ sector: 1 });
dataSchema.index({ end_year: 1 });

const Data = mongoose.model('Data', dataSchema);
module.exports = Data;
