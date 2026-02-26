const Data = require('../models/Data');

const buildMatchQuery = (query) => {
    let match = {};
    if (query.endYear) {
        match.end_year = { $lte: parseInt(query.endYear) };
    }
    if (query.topic) match.topic = { $in: query.topic.split(',') };
    if (query.sector) match.sector = { $in: query.sector.split(',') };
    if (query.region) match.region = query.region;
    if (query.pestle) match.pestle = query.pestle;
    if (query.source) match.source = query.source;
    if (query.country) match.country = query.country;
    if (query.city) match.city = query.city;
    if (query.swot) match.swot = query.swot;

    return match;
};

exports.getData = async (req, res) => {
    try {
        const match = buildMatchQuery(req.query);
        const data = await Data.find(match).limit(100);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getKpis = async (req, res) => {
    try {
        const match = buildMatchQuery(req.query);

        const kpis = await Data.aggregate([
            { $match: match },
            {
                $group: {
                    _id: null,
                    avgIntensity: { $avg: "$intensity" },
                    avgLikelihood: { $avg: "$likelihood" },
                    avgRelevance: { $avg: "$relevance" },
                    totalRecords: { $sum: 1 }
                }
            }
        ]);

        const topCountryAggr = await Data.aggregate([
            { $match: { ...match, country: { $ne: "" } } },
            { $group: { _id: "$country", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 1 }
        ]);

        const topTopicAggr = await Data.aggregate([
            { $match: { ...match, topic: { $ne: "" } } },
            { $group: { _id: "$topic", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 1 }
        ]);

        res.json({
            kpis: kpis[0] || { avgIntensity: 0, avgLikelihood: 0, avgRelevance: 0, totalRecords: 0 },
            topCountry: topCountryAggr.length > 0 ? topCountryAggr[0]._id : "N/A",
            topTopic: topTopicAggr.length > 0 ? topTopicAggr[0]._id : "N/A"
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAnalytics = async (req, res) => {
    try {
        const match = buildMatchQuery(req.query);

        // Intensity by Country (Bar Chart)
        const intensityByCountry = await Data.aggregate([
            { $match: { ...match, country: { $ne: "" } } },
            { $group: { _id: "$country", intensity: { $avg: "$intensity" } } },
            { $sort: { intensity: -1 } },
            { $limit: 15 }
        ]);

        // Intensity vs End Year (Line Chart)
        const intensityVsEndYear = await Data.aggregate([
            { $match: { ...match, end_year: { $ne: null } } },
            { $group: { _id: "$end_year", intensity: { $avg: "$intensity" } } },
            { $sort: { _id: 1 } }
        ]);

        // Likelihood vs Relevance (Bubble Chart)
        const likelihoodVsRelevance = await Data.aggregate([
            { $match: match },
            { $project: { _id: 0, likelihood: 1, relevance: 1, intensity: 1, topic: 1 } },
            { $limit: 100 }
        ]);

        // Distribution by Region (Pie Chart)
        const distributionByRegion = await Data.aggregate([
            { $match: { ...match, region: { $ne: "" } } },
            { $group: { _id: "$region", count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        // Topic vs Region Heatmap
        const topicVsRegion = await Data.aggregate([
            { $match: { ...match, topic: { $ne: "" }, region: { $ne: "" } } },
            { $group: { _id: { topic: "$topic", region: "$region" }, value: { $sum: 1 } } },
            { $project: { topic: "$_id.topic", region: "$_id.region", value: 1, _id: 0 } },
            { $limit: 100 }
        ]);

        // Sector vs Intensity (Stacked Bar)
        const sectorVsIntensity = await Data.aggregate([
            { $match: { ...match, sector: { $ne: "" } } },
            { $group: { _id: "$sector", intensity: { $avg: "$intensity" } } },
            { $sort: { intensity: -1 } },
            { $limit: 15 }
        ]);

        // PESTLE Impact (Radar Chart)
        const pestleImpact = await Data.aggregate([
            { $match: { ...match, pestle: { $ne: "" } } },
            { $group: { _id: "$pestle", intensity: { $avg: "$intensity" }, likelihood: { $avg: "$likelihood" }, relevance: { $avg: "$relevance" } } }
        ]);

        // City vs Intensity (Scatter Chart)
        // To simplify, just top cities
        const cityVsIntensity = await Data.aggregate([
            { $match: { ...match, city: { $ne: "" } } },
            { $group: { _id: "$city", intensity: { $avg: "$intensity" }, count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 20 }
        ]);

        res.json({
            intensityByCountry,
            intensityVsEndYear,
            likelihoodVsRelevance,
            distributionByRegion,
            topicVsRegion,
            sectorVsIntensity,
            pestleImpact,
            cityVsIntensity
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

exports.getFilters = async (req, res) => {
    try {
        const topics = await Data.distinct("topic", { topic: { $ne: "" } });
        const sectors = await Data.distinct("sector", { sector: { $ne: "" } });
        const regions = await Data.distinct("region", { region: { $ne: "" } });
        const countries = await Data.distinct("country", { country: { $ne: "" } });
        const cities = await Data.distinct("city", { city: { $ne: "" } });
        const sources = await Data.distinct("source", { source: { $ne: "" } });
        const pestles = await Data.distinct("pestle", { pestle: { $ne: "" } });
        const endYearsRaw = await Data.distinct("end_year", { end_year: { $ne: null } });
        const endYears = endYearsRaw.filter(y => y !== "" && !isNaN(y)).sort();

        res.json({ topics, sectors, regions, countries, cities, sources, pestles, endYears });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
