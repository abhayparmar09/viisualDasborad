import React from 'react';
import Sidebar from '../layout/Sidebar';
import Navbar from '../layout/Navbar';
import FilterPanel from '../components/FilterPanel';
import KPICards from '../components/KPICards';
import { useDashboardData } from '../hooks/useDashboardData';

import {
    Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement, Filler, RadialLinearScale
} from 'chart.js';
import { Bar, Line, Pie, Radar, Bubble, Scatter } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement, Filler, RadialLinearScale);

const Dashboard = () => {
    const { filters, updateFilters, kpis, analytics, filterOptions, loading } = useDashboardData();

    if (loading && !analytics) return <div className="loading">Loading dashboard...</div>;
    if (!analytics) return <div className="loading">No data found</div>;

    const barData = {
        labels: analytics.intensityByCountry?.map(d => d._id) || [],
        datasets: [{
            label: 'Avg Intensity',
            data: analytics.intensityByCountry?.map(d => d.intensity) || [],
            backgroundColor: '#4F46E5',
        }]
    };

    const lineData = {
        labels: analytics.intensityVsEndYear?.map(d => d._id) || [],
        datasets: [{
            label: 'Intensity vs End Year',
            data: analytics.intensityVsEndYear?.map(d => d.intensity) || [],
            borderColor: '#10B981',
            tension: 0.3,
            fill: false,
        }]
    };

    const pieData = {
        labels: analytics.distributionByRegion?.map(d => d._id) || [],
        datasets: [{
            data: analytics.distributionByRegion?.map(d => d.count) || [],
            backgroundColor: ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6', '#F97316'],
        }]
    };

    const bubbleData = {
        datasets: [{
            label: 'Likelihood vs Relevance',
            data: analytics.likelihoodVsRelevance?.map(d => ({
                x: d.likelihood || 0,
                y: d.relevance || 0,
                r: (d.intensity || 1) * 2 // Scaling up size
            })) || [],
            backgroundColor: 'rgba(239, 68, 68, 0.6)'
        }]
    };

    const radarData = {
        labels: analytics.pestleImpact?.map(d => d._id) || [],
        datasets: [{
            label: 'PESTLE Intensity',
            data: analytics.pestleImpact?.map(d => d.intensity) || [],
            backgroundColor: 'rgba(16, 185, 129, 0.2)',
            borderColor: '#10B981',
            pointBackgroundColor: '#10B981'
        }]
    };

    const scatterData = {
        datasets: [{
            label: 'City vs Intensity',
            data: analytics.cityVsIntensity?.map((d, i) => ({
                x: i,
                y: d.intensity || 0
            })) || [],
            backgroundColor: '#F59E0B'
        }]
    };

    // Stacked Bar for Sector vs Intensity
    const stackedBarData = {
        labels: analytics.sectorVsIntensity?.map(d => d._id) || [],
        datasets: [{
            label: 'Avg Intensity by Sector',
            data: analytics.sectorVsIntensity?.map(d => d.intensity) || [],
            backgroundColor: '#8B5CF6',
        }]
    };

    return (
        <div className="app-container">
            <Sidebar />
            <main className="main-content">
                <Navbar />
                <div className="dashboard-container">
                    <h1 className="page-title">Analytics Dashboard</h1>
                    <FilterPanel filters={filters} updateFilters={updateFilters} filterOptions={filterOptions} />

                    <KPICards kpis={kpis} />

                    <div className="charts-grid">
                        <div className="chart-card full-width">
                            <h3 className="chart-header">Intensity by Country</h3>
                            <div className="chart-body">
                                <Bar options={{ maintainAspectRatio: false }} data={barData} />
                            </div>
                        </div>

                        <div className="chart-card">
                            <h3 className="chart-header">Intensity vs Year</h3>
                            <div className="chart-body">
                                <Line options={{ maintainAspectRatio: false }} data={lineData} />
                            </div>
                        </div>

                        <div className="chart-card">
                            <h3 className="chart-header">Region Distribution</h3>
                            <div className="chart-body">
                                <Pie options={{ maintainAspectRatio: false }} data={pieData} />
                            </div>
                        </div>

                        <div className="chart-card">
                            <h3 className="chart-header">Likelihood vs Relevance</h3>
                            <div className="chart-body">
                                <Bubble options={{ maintainAspectRatio: false }} data={bubbleData} />
                            </div>
                        </div>

                        <div className="chart-card">
                            <h3 className="chart-header">PESTLE Impact</h3>
                            <div className="chart-body">
                                <Radar options={{ maintainAspectRatio: false }} data={radarData} />
                            </div>
                        </div>

                        <div className="chart-card">
                            <h3 className="chart-header">Sector vs Intensity (Stacked)</h3>
                            <div className="chart-body">
                                <Bar options={{ maintainAspectRatio: false, scales: { x: { stacked: true }, y: { stacked: true } } }} data={stackedBarData} />
                            </div>
                        </div>

                        <div className="chart-card">
                            <h3 className="chart-header">City vs Intensity</h3>
                            <div className="chart-body">
                                <Scatter options={{ maintainAspectRatio: false }} data={scatterData} />
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
