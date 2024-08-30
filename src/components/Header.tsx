import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <a className="text-2xl font-bold">SEO Tool</a>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/"><a className="hover:text-gray-300">Dashboard</a></Link></li>
            <li><Link href="/analyzer"><a className="hover:text-gray-300">Site Analyzer</a></Link></li>
            <li><Link href="/keywords"><a className="hover:text-gray-300">Keyword Tracker</a></Link></li>
            <li><Link href="/content"><a className="hover:text-gray-300">Content Optimizer</a></Link></li>
            <li><Link href="/competitors"><a className="hover:text-gray-300">Competitor Analysis</a></Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
