import { HomeIcon, SearchIcon, FileTextIcon } from "lucide-react";
import Index from "./pages/Index.jsx";
import KeywordTracker from "./components/KeywordTracker";
import ContentOptimizer from "./components/ContentOptimizer";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Keyword Tracker",
    to: "/keywords",
    icon: <SearchIcon className="h-4 w-4" />,
    page: <KeywordTracker />,
  },
  {
    title: "Content Optimizer",
    to: "/content",
    icon: <FileTextIcon className="h-4 w-4" />,
    page: <ContentOptimizer />,
  },
];
