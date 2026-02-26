import React from 'react';
import { LayoutDashboard, BarChart2, TrendingUp, Users, Settings } from 'lucide-react';

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <LayoutDashboard size={24} />
                Analytics
            </div>
            <div className="sidebar-menu">
                <div className="menu-item active">
                    <TrendingUp size={20} />
                    <span>Dashboard</span>
                </div>
                <div className="menu-item">
                    <BarChart2 size={20} />
                    <span>Reports</span>
                </div>
                <div className="menu-item">
                    <Users size={20} />
                    <span>Users</span>
                </div>
                <div className="menu-item">
                    <Settings size={20} />
                    <span>Settings</span>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
