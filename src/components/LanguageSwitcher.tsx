'use client';

import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import styles from './LanguageSwitcher.module.scss';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className={styles.switcher}>
      <button
        onClick={() => handleLanguageChange('en')}
        className={`${styles.langButton} ${i18n.language === 'en' ? styles.active : ''}`}
      >
        EN
      </button>
      <span className={styles.separator}>|</span>
      <button
        onClick={() => handleLanguageChange('ro')}
        className={`${styles.langButton} ${i18n.language === 'ro' ? styles.active : ''}`}
      >
        RO
      </button>
    </div>
  );
}
