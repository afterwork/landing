'use client';

import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { EMAIL_REGEX } from '@/types/form';
import styles from '@/app/page.module.scss';

type FormData = {
  email: string;
  name: string;
  marketing: boolean;
  focus: boolean;
  company: string; // honeypot
};

export function SubscribeForm() {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      name: '',
      marketing: false,
      focus: false,
      company: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    if (data.company) {
      // Honeypot caught a bot
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.ok) {
        setSubmitStatus({
          type: 'success',
          message: t('messages.success'),
        });
        reset();
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error || t('messages.error'),
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus({
        type: 'error',
        message: t('messages.error'),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
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
          type="email"
          placeholder={t('form.emailPlaceholder')}
          autoComplete="email"
          {...register('email', {
            required: t('validation.emailRequired'),
            pattern: {
              value: EMAIL_REGEX,
              message: t('validation.emailInvalid'),
            },
          })}
        />
        {errors.email && (
          <span className={styles.fieldError}>{errors.email.message}</span>
        )}
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
          type="text"
          placeholder={t('form.namePlaceholder')}
          autoComplete="name"
          {...register('name', {
            required: t('validation.nameRequired'),
            minLength: {
              value: 2,
              message: t('validation.nameMinLength'),
            },
          })}
        />
        {errors.name && (
          <span className={styles.fieldError}>{errors.name.message}</span>
        )}
      </motion.div>

      {/* Honeypot */}
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          type="text"
          tabIndex={-1}
          {...register('company')}
        />
      </div>

      <motion.div
        className={styles.checkRow}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <label className={styles.checkbox}>
          <input type="checkbox" {...register('marketing')} />
          <span> {t('form.marketing')}</span>
        </label>

        <label className={styles.checkbox}>
          <input type="checkbox" {...register('focus')} />
          <span> {t('form.focus')}</span>
        </label>
      </motion.div>

      <motion.button
        type="submit"
        className={styles.submit}
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        {isSubmitting ? t('form.submitting') : t('form.submit')}
      </motion.button>

      {submitStatus.type === 'error' && (
        <motion.p
          role="alert"
          className={styles.error}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {submitStatus.message}
        </motion.p>
      )}
      {submitStatus.type === 'success' && (
        <motion.p
          role="status"
          className={styles.success}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {submitStatus.message}
        </motion.p>
      )}
    </motion.form>
  );
}
