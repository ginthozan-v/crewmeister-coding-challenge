import React from 'react';
import styles from './FilterInput.module.css';

interface IFilterProps {
  label: string;
  data: object[];
  setVacationType: (value: string) => void;
}

const FilterInput = ({ label, data, setVacationType }: IFilterProps) => {
  return (
    <>
      <p className={styles.title}>{label}</p>
      <select
        name="absenceType"
        id="absenceType"
        className={styles.input}
        onChange={(e) => setVacationType(e.target.value)}
      >
        <option value="">All</option>
        {data.map((absent: any, i: number) => (
          <option key={i} value={absent.value}>
            {absent.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default FilterInput;
