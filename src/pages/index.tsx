import Head from 'next/head';
import { useEffect, useState } from 'react';
import styles from '../../src/styles/Home.module.css';
import TableComponent from '../../components/TableComponent';
import ExportButton from '../../components/InputFields/ExportButton';
import DatePicker from '../../components/InputFields/DatePicker';
import FilterInput from '../../components/InputFields/FilterInput';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [absenceState, setAbsenceState] = useState<any | null>([]);
  const [vacationType, setVacationType] = useState('');
  const [absenceTypes, setAbsenceTypes] = useState([]);
  const [startDate, setStartDate] = useState('');

  const columns = [
    {
      Header: 'Member name',
      accessor: 'name',
    },
    {
      Header: 'Type of absence',
      accessor: 'type',
    },
    {
      Header: 'Period',
      accessor: 'period',
    },
    {
      Header: 'Member note',
      accessor: 'memberNote',
    },
    {
      Header: 'Status',
      accessor: 'status',
    },
    {
      Header: 'Admitter note',
      accessor: 'admitterNote',
    },
    {
      Header: 'Start date',
      accessor: 'startDate',
    },
    {
      Header: 'End date',
      accessor: 'endDate',
    },
    {
      Header: '',
      accessor: 'action',
      Cell: (row: any) => <ExportButton data={row} />,
    },
  ];

  const fetchAbsenceTypes = async () => {
    await fetch(`/api/absence-types`)
      .then((res) => res.json())
      .then((data) => setAbsenceTypes(data))
      .catch((error) => setError(error.error));
  };

  const fetchAbsences = async (vacationType?: string, startDate?: string) => {
    await fetch(`/api/absences`)
      .then((res) => res.json())
      .then((data) => {
        if (vacationType && startDate) {
          setAbsenceState(
            data.filter(
              (x: any) => x.type === vacationType && x.startDate >= startDate
            )
          );
        } else if (vacationType) {
          setAbsenceState(data.filter((x: any) => x.type === vacationType));
        } else if (startDate) {
          setAbsenceState(data.filter((x: any) => x.startDate === startDate));
        } else {
          setAbsenceState(data);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    fetchAbsenceTypes();
    fetchAbsences(vacationType, startDate);
  }, [vacationType, startDate]);

  return (
    <>
      <Head>
        <title>Crewmeister coding challenge</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Absence Manager</h1>
        <div className={styles.tableHeader}>
          <div>
            <p className={styles.totalTitle}>Total number of absences</p>
            <h6 className={styles.total}>{absenceState?.length}</h6>
          </div>
          <div>
            <FilterInput
              label="Filter by absence type"
              data={absenceTypes}
              setVacationType={setVacationType}
            />
          </div>
          <div>
            <DatePicker
              label="Filter by start date"
              setStartDate={setStartDate}
            />
          </div>
        </div>

        <TableComponent
          tableColumns={columns}
          tableData={absenceState}
          isLoading={isLoading}
          error={error}
        />
      </main>
    </>
  );
}
