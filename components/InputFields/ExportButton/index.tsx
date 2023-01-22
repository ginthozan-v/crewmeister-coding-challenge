import React from 'react';
import styles from './ExportButton.module.css';
import { download } from '../../../utils/download';
// @ts-ignore
import { ICalendar } from 'datebook';

interface IiCalObject {
  title: string;
  description: string;
  start: Date;
  end: Date;
}

const ExportButton = ({ data }: any) => {
  const handleExport = async (row: any) => {
    const start = new Date(row.startDate);
    const end = new Date(row.endDate);

    const obj: IiCalObject = {
      title: `${row.name} is on ${row.type} leave`,
      description: row.memberNote,
      start,
      end,
    };

    const icalendar: ICalendar = new ICalendar(obj);
    download(`${row.name}.ics`, icalendar.render());
  };

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
