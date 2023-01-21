import { useMemo } from 'react';
import { useTable, usePagination } from 'react-table';
import style from './TableComponent.module.css';

const TableComponent = ({ tableColumns, tableData, isLoading, error }: any) => {
  const columns = useMemo(() => tableColumns, [tableColumns]);
  const data = useMemo(() => tableData, [tableData]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    prepareRow,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
    },
    usePagination
  );
  return (
    <>
      <table className={style.table} {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, i) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={i}>
              {headerGroup.headers.map((column, i) => (
                <th {...column.getHeaderProps()} key={i}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {isLoading && (
            <tr>
              <td colSpan={tableColumns.length} style={{ textAlign: 'center' }}>
                Loading...
              </td>
            </tr>
          )}

          {!isLoading &&
            page.length > 0 &&
            page.map((row: any, i: number) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={i}>
                  {row.cells.map((cell: any, i: number) => {
                    return (
                      <td {...cell.getCellProps()} key={i}>
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}

          {!isLoading && !page.length && (
            <tr>
              <td colSpan={tableColumns.length} style={{ textAlign: 'center' }}>
                {error ? error : 'No results!'}
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className={style.btnGroup}>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>
        <span>{pageIndex + 1}</span>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>
      </div>
    </>
  );
};

export default TableComponent;
