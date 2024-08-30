import React from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { Button } from '@/components/ui/button';

const Header: React.FC<{ toggleSidebar: () => void }> = ({ toggleSidebar }) => {
  return (
    <header className="bg-background text-foreground p-4 border-b">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Button variant="ghost" className="mr-2 md:hidden" onClick={toggleSidebar}>
            <span className="sr-only">Toggle menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </Button>
          <Link href="/">
            <a className="text-2xl font-bold">SEO Tool</a>
          </Link>
        </div>
        <nav className="hidden md:block">
          <ul className="flex space-x-4">
            <li><Link href="/"><a className="hover:text-primary">Dashboard</a></Link></li>
            <li><Link href="/analyzer"><a className="hover:text-primary">Site Analyzer</a></Link></li>
            <li><Link href="/keywords"><a className="hover:text-primary">Keyword Tracker</a></Link></li>
            <li><Link href="/content"><a className="hover:text-primary">Content Optimizer</a></Link></li>
            <li><Link href="/competitors"><a className="hover:text-primary">Competitor Analysis</a></Link></li>
          </ul>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
