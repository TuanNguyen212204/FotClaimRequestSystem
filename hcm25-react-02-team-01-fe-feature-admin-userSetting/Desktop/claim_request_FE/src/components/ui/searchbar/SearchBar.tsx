import React from 'react';
import styles from './SearchBar.module.css';
import { FaSearch } from 'react-icons/fa';

const SearchBar: React.FC = () => {
  return (
    <div className={styles.searchBar}>
      <input type="text" placeholder="Search" className={styles.input} />
      <FaSearch className={styles.searchIcon} />
    </div>
  );
};

export default SearchBar;