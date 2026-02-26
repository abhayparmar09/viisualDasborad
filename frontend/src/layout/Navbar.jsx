import React from 'react';
import { Search, Bell } from 'lucide-react';

const Navbar = () => {
    return (
        <header className="navbar">
            <div className="search-bar">
                <Search size={18} color="var(--text-muted)" />
                <input type="text" placeholder="Search analytics..." />
            </div>
            <div className="nav-actions">
                <Bell size={20} color="var(--text-muted)" style={{ cursor: 'pointer' }} />
                <div className="avatar">JD</div>
            </div>
        </header>
    );
};

export default Navbar;
