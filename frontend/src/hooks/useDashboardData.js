import { useState, useEffect } from 'react';
import axios from 'axios';

// Backend base URL
const BASE_URL = "https://visualdasborad-backend.onrender.com/api/data";

// API calls
const fetchFilters = async () => {
    const res = await axios.get(`${BASE_URL}/filters`);
    return res.data; // backend se JSON return aayega
};

const fetchKpis = async (filters) => {
    const res = await axios.get(`${BASE_URL}/kpis`, { params: filters });
    return res.data;
};

const fetchAnalytics = async (filters) => {
    const res = await axios.get(`${BASE_URL}/analytics`, { params: filters });
    return res.data;
};

// Custom hook
export const useDashboardData = () => {
    const [filters, setFilters] = useState({});
    const [kpis, setKpis] = useState(null);
    const [analytics, setAnalytics] = useState(null);
    const [filterOptions, setFilterOptions] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Initial load: filters
    useEffect(() => {
        setLoading(true);
        fetchFilters()
            .then(data => setFilterOptions(data))
            .catch(err => {
                console.error("Filters fetch error:", err);
                setError("Failed to load filters");
            })
            .finally(() => setLoading(false));
    }, []);

    // Fetch KPIs and Analytics on filters change
    useEffect(() => {
        let active = true;
        setLoading(true);
        setError(null);

        Promise.all([
            fetchKpis(filters),
            fetchAnalytics(filters)
        ])
        .then(([kpiData, analyticsData]) => {
            if (active) {
                setKpis(kpiData);
                setAnalytics(analyticsData);
                setLoading(false);
            }
        })
        .catch(err => {
            console.error("Data fetch error:", err);
            if (active) {
                setError("Failed to load dashboard data");
                setLoading(false);
            }
        });

        return () => { active = false; };
    }, [filters]);

    const updateFilters = (newFilters) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    };

    return { filters, updateFilters, kpis, analytics, filterOptions, loading, error };
};
