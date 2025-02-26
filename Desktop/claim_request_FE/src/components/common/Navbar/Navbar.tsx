import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

interface MenuItem {
  path: string;
  label: string;
}

const menuItems: MenuItem[] = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Services' },
  { path: '/contact', label: 'Contact' },
];

interface IconProps {
  width?: number;
  height?: number;
  stroke?: string;
  strokeWidth?: number;
}

const HomeIcon: React.FC<IconProps> = ({
  width = 24,
  height = 24,
  stroke = "currentColor",
  strokeWidth = 2
}) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeWidth}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  </svg>
);

const MenuIcon: React.FC<IconProps & { isOpen: boolean }> = ({
  width = 24,
  height = 24,
  stroke = "currentColor",
  strokeWidth = 2,
  isOpen
}) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeWidth}>
    {isOpen ? (
      <path d="M18 6L6 18M6 6l12 12" />
    ) : (
      <path d="M3 12h18M3 6h18M3 18h18" />
    )}
  </svg>
);

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleMenuClick = (): void => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (): void => {
    setIsOpen(false);
  };

  const renderNavLink = (item: MenuItem, isMobile: boolean = false): JSX.Element => (
    <NavLink
      key={item.path}
      to={item.path}
      className={({ isActive }: { isActive: boolean }): string => 
        `${styles.menuLink} ${isActive ? styles.active : ''}`
      }
      onClick={isMobile ? handleLinkClick : undefined}
    >
      {item.label}
    </NavLink>
  );

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.nav}>
          <div className={styles.logo}>
            <HomeIcon />
            <span>Logo</span>
          </div>

          {/* Desktop Menu */}
          <div className={styles.menuItems}>
            {menuItems.map((item) => renderNavLink(item))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={styles.menuButton}
            onClick={handleMenuClick}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            type="button"
          >
            <MenuIcon isOpen={isOpen} />
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className={styles.menuItemsMobile}>
            {menuItems.map((item) => renderNavLink(item, true))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;