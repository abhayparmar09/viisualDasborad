import { useState, useEffect } from 'react';
import { fetchKpis, fetchAnalytics, fetchFilters } from '../services/api';

export const useDashboardData = () => {
    const [filters, setFilters] = useState({});
    const [kpis, setKpis] = useState(null);
    const [analytics, setAnalytics] = useState(null);
    const [filterOptions, setFilterOptions] = useState(null);
    const [loading, setLoading] = useState(true);

    // Initial load filters
    useEffect(() => {
        fetchFilters().then(setFilterOptions).catch(console.error);
    }, []);

    // Fetch data on filter change
    useEffect(() => {
        let active = true;
        setLoading(true);

        Promise.all([
            fetchKpis(filters),
            fetchAnalytics(filters)
        ]).then(([kpiData, analyticsData]) => {
            if (active) {
                setKpis(kpiData);
                setAnalytics(analyticsData);
                setLoading(false);
            }
        }).catch((err) => {
            console.error(err);
            if (active) setLoading(false);
        });

        return () => { active = false; };
    }, [filters]);

    const updateFilters = (newFilters) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    };

    return { filters, updateFilters, kpis, analytics, filterOptions, loading };
};
