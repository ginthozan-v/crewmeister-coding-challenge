import React from 'react';
import styles from './ExportButton.module.css';

interface IButtonProps {
  data: any;
  handleExport: any;
}

const ExportButton = ({ data, handleExport }: IButtonProps) => {
  return (
    <button
      className={styles.button}
      onClick={() => handleExport(data.row.original)}
    >
      Export iCal
    </button>
  );
};

export default ExportButton;
