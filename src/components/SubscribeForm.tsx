'use client';

import { useActionState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { subscribeAction } from '@/app/actions';
import { initialFormState } from '@/types/form-state';
import styles from '@/app/page.module.scss';

export function SubscribeForm() {
  const { t } = useTranslation();
  const [state, formAction, isPending] = useActionState(
    subscribeAction,
    initialFormState
  );

  return (
    <motion.form
      action={formAction}
      className={styles.form}
      noValidate
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <motion.div
        className={styles.formRow}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <label htmlFor="email">{t('form.email')}</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder={t('form.emailPlaceholder')}
          required
          autoComplete="email"
        />
      </motion.div>
      <motion.div
        className={styles.formRow}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <label htmlFor="name">{t('form.name')}</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder={t('form.namePlaceholder')}
          autoComplete="name"
        />
      </motion.div>

      {/* Honeypot */}
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} />
      </div>

      <motion.div
        className={styles.checkRow}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <label className={styles.checkbox}>
          <input type="checkbox" name="marketing" />
          <span> {t('form.marketing')}</span>
        </label>
        <label className={styles.checkbox}>
          <input type="checkbox" name="focus" />
          <span> {t('form.focus')}</span>
        </label>
      </motion.div>

      <motion.button
        className={styles.submit}
        disabled={isPending}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        {isPending ? t('form.submitting') : t('form.submit')}
      </motion.button>

      {state.status === 'error' && (
        <motion.p
          role="alert"
          className={styles.error}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {state.message}
        </motion.p>
      )}
      {state.status === 'success' && (
        <motion.p
          role="status"
          className={styles.success}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {state.message}
        </motion.p>
      )}
    </motion.form>
  );
}
