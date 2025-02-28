export interface TabProps {
  tabs: string[];
  activeTab: number;
  onTabClick: (index: number) => void;
}