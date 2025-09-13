'use client';

import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import styles from './page.module.scss';
import { SubscribeForm } from '@/components/SubscribeForm';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

export default function Home() {
  const { t } = useTranslation();

  return (
    <main className={styles.landing}>
      <LanguageSwitcher />

      <section aria-label="Hero" className={styles.hero}>
        <motion.div
          className={styles.heroBackdrop}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
        <div className={styles.heroInner}>
          <motion.p
            className={styles.motivationTop}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('hero.motivation')}
          </motion.p>
          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {t('hero.title.line1')}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {t('hero.title.line2')}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              {t('hero.title.line3')}
            </motion.span>
          </motion.h1>
        </div>
      </section>

      <section aria-label="Features" className={styles.features}>
        <motion.div
          className={styles.feature}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <h3>{t('features.clarity.title')}</h3>
          <p>{t('features.clarity.description')}</p>
        </motion.div>
        <motion.div
          className={styles.feature}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3>{t('features.control.title')}</h3>
          <p>{t('features.control.description')}</p>
        </motion.div>
        <motion.div
          className={styles.feature}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3>{t('features.community.title')}</h3>
          <p>{t('features.community.description')}</p>
        </motion.div>
      </section>
      <section id="signup" aria-label="Signup" className={styles.signup}>
        <SubscribeForm />
      </section>

      <motion.footer
        className={styles.footer}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <p>{t('footer.copyright')}</p>
        <nav aria-label="Legal">
          <a href="#privacy">{t('footer.privacy')}</a>
          <span aria-hidden="true">|</span>
          <a href="#terms">{t('footer.terms')}</a>
        </nav>
      </motion.footer>
    </main>
  );
}
