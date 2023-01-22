import React from 'react';
import styles from './DatePicker.module.css';

const DatePicker = ({ setStartDate }: any) => {
  return (
    <>
      <p className={styles.title}>Filter by start date</p>
      <input
        type="date"
        className={styles.input}
        onChange={(e) => setStartDate(e.target.value)}
      />
    </>
  );
};

export default DatePicker;
