import React from 'react';
import Link from 'next/link';

const Sidebar: React.FC = () => {
  return (
    <aside className="bg-gray-100 w-64 p-4">
      <nav>
        <ul className="space-y-2">
          <li><Link href="/"><a className="block p-2 hover:bg-gray-200">Dashboard</a></Link></li>
          <li><Link href="/analyzer"><a className="block p-2 hover:bg-gray-200">Site Analyzer</a></Link></li>
          <li><Link href="/keywords"><a className="block p-2 hover:bg-gray-200">Keyword Tracker</a></Link></li>
          <li><Link href="/content"><a className="block p-2 hover:bg-gray-200">Content Optimizer</a></Link></li>
          <li><Link href="/competitors"><a className="block p-2 hover:bg-gray-200">Competitor Analysis</a></Link></li>
          <li><Link href="/reports"><a className="block p-2 hover:bg-gray-200">Reports & Insights</a></Link></li>
          <li><Link href="/settings"><a className="block p-2 hover:bg-gray-200">Settings</a></Link></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;