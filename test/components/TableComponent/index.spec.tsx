import React from 'react';
import { render } from '@testing-library/react';
import TableComponent from '../../../components/TableComponent';

describe('I want to see a list of absences', () => {
  test('should match', () => {
    const { container } = render(
      <TableComponent
        tableColumns={[
          {
            Header: 'Member name',
            accessor: 'name',
          },
          {
            Header: 'Type of absence',
            accessor: 'type',
          },
        ]}
        tableData={[
          {
            id: '1',
            name: 'Max',
            type: 'vacation',
            period: '2 days',
            memberNote: 'Skiurlaub',
            status: 'requested',
            admitterNote: '1',
            startDate: '2021-02-20',
            endDate: '2021-02-21',
          },
        ]}
        isLoading={false}
        error=""
      />
    );
    expect(container).toMatchSnapshot();
  });

  test('should match the options', () => {
    const view = render(
      <TableComponent
        tableColumns={[
          {
            Header: 'Member name',
            accessor: 'name',
          },
          {
            Header: 'Type of absence',
            accessor: 'type',
          },
        ]}
        tableData={[
          {
            id: '1',
            name: 'Max',
            type: 'vacation',
            period: '2 days',
            memberNote: 'Skiurlaub',
            status: 'requested',
            admitterNote: '1',
            startDate: '2021-02-20',
            endDate: '2021-02-21',
          },
        ]}
        isLoading={false}
        error=""
      />
    );
    expect(view.container).toMatchSnapshot();
  });
});
