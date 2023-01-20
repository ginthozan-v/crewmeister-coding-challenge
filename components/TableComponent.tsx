import React from 'react';
import { useTable, usePagination } from 'react-table';
import style from './TableComponent.module.css';

const TableComponent = ({
  tableColumns,
  tableData,
  isLoading,
  error,
  handleClick,
}: any) => {
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
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns: tableColumns,
      data: tableData,
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
          {isLoading ? (
            <tr>
              <td colSpan={tableColumns.length} style={{ textAlign: 'center' }}>
                Loading...
              </td>
            </tr>
          ) : page.length > 0 ? (
            page.map((row: any, i) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  key={i}
                  onClick={() => handleClick(row.original.userId)}
                >
                  {row.cells.map((cell: any, i: number) => {
                    return (
                      <td {...cell.getCellProps()} key={i}>
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          ) : (
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
