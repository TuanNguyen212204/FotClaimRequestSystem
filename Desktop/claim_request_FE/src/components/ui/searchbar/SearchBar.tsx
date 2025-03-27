import React from 'react';
import styles from './SearchBar.module.css';
import { FaSearch } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const SearchBar: React.FC = () => {
  const { t } = useTranslation()
  return (
    <div className={styles.searchBar}>
      <input type="text" placeholder={t("Search")} className={styles.input} />
      <FaSearch className={styles.searchIcon} />
    </div>
  );
};

export default SearchBar;