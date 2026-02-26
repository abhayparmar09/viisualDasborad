import React, { useMemo } from 'react';
import debounce from 'lodash/debounce'; 

const FilterPanel = ({ filters, updateFilters, filterOptions }) => {
    const [localFilters, setLocalFilters] = React.useState(filters);

    if (!filterOptions) return null;

    const debouncedChange = useMemo(() => debounce((name, value) => {
        updateFilters({ [name]: value });
    }, 300), []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalFilters(prev => ({ ...prev, [name]: value }));
        debouncedChange(name, value);
    };

    return (
        <div className="filters-panel">
            <div className="filter-group">
                <label>End Year</label>
                <select name="endYear" onChange={handleChange} value={localFilters.endYear || ''}>
                    <option value="">All</option>
                    {filterOptions.endYears.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
            </div>

            <div className="filter-group">
                <label>Topic</label>
                <select name="topic" onChange={handleChange} value={localFilters.topic || ''}>
                    <option value="">All</option>
                    {filterOptions.topics.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
            </div>

            <div className="filter-group">
                <label>Sector</label>
                <select name="sector" onChange={handleChange} value={localFilters.sector || ''}>
                    <option value="">All</option>
                    {filterOptions.sectors.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
            </div>

            <div className="filter-group">
                <label>Region</label>
                <select name="region" onChange={handleChange} value={localFilters.region || ''}>
                    <option value="">All</option>
                    {filterOptions.regions.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
            </div>

            <div className="filter-group">
                <label>Country</label>
                <select name="country" onChange={handleChange} value={localFilters.country || ''}>
                    <option value="">All</option>
                    {filterOptions.countries.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>

            <div className="filter-group">
                <label>City</label>
                <select name="city" onChange={handleChange} value={localFilters.city || ''}>
                    <option value="">All</option>
                    {filterOptions.cities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>

            <div className="filter-group">
                <label>Source</label>
                <select name="source" onChange={handleChange} value={localFilters.source || ''}>
                    <option value="">All</option>
                    {filterOptions.sources.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
            </div>

            <div className="filter-group">
                <label>PESTLE</label>
                <select name="pestle" onChange={handleChange} value={localFilters.pestle || ''}>
                    <option value="">All</option>
                    {filterOptions.pestles.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
            </div>

            <div className="filter-group">
                <label>SWOT</label>
                <select name="swot" onChange={handleChange} value={localFilters.swot || ''}>
                    <option value="">All</option>
                    <option value="Strengths">Strengths</option>
                    <option value="Weaknesses">Weaknesses</option>
                    <option value="Opportunities">Opportunities</option>
                    <option value="Threats">Threats</option>
                </select>
            </div>
        </div>
    );
};

export default FilterPanel;
