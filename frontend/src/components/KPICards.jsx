import React from 'react';

const KPICards = ({ kpis }) => {
    if (!kpis || !kpis.kpis) return null;

    return (
        <div className="kpi-grid">
            <div className="kpi-card gradient">
                <span className="kpi-title">Total Records</span>
                <span className="kpi-value">{kpis.kpis.totalRecords}</span>
            </div>
            <div className="kpi-card">
                <span className="kpi-title">Avg Intensity</span>
                <span className="kpi-value">{kpis.kpis.avgIntensity?.toFixed(2) || 0}</span>
            </div>
            <div className="kpi-card">
                <span className="kpi-title">Avg Relevance</span>
                <span className="kpi-value">{kpis.kpis.avgRelevance?.toFixed(2) || 0}</span>
            </div>
            <div className="kpi-card">
                <span className="kpi-title">Avg Likelihood</span>
                <span className="kpi-value">{kpis.kpis.avgLikelihood?.toFixed(2) || 0}</span>
            </div>
            <div className="kpi-card">
                <span className="kpi-title">Top Country</span>
                <span className="kpi-value" style={{ fontSize: '1.25rem' }}>{kpis.topCountry}</span>
            </div>
        </div>
    );
};

export default KPICards;
