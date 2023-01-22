import React from 'react';
import styles from './DatePicker.module.css';

interface IDatePickerProps {
  label: string;
  setStartDate: (value: string) => void;
}

const DatePicker = ({ label, setStartDate }: IDatePickerProps) => {
  return (
    <>
      <p className={styles.title}>{label}</p>
      <input
        type="date"
        className={styles.input}
        onChange={(e) => setStartDate(e.target.value)}
      />
    </>
  );
};

export default DatePicker;
