import React from 'react';
import { render } from '@testing-library/react';
import Filter from '../../../../components/InputFields/FilterInput';

describe('I want to filter absences by type', () => {
  test('should match', () => {
    const { container } = render(
      <Filter
        label="Filter by absence type"
        data={[
          { label: 'sickness', value: 'sickness' },
          { label: 'vacation', value: 'vacation' },
        ]}
        setVacationType={() => {}}
      />
    );
    expect(container).toMatchSnapshot();
  });

  test('should check the options', () => {
    const view = render(
      <Filter
        label="Filter by absence type"
        data={[
          { label: 'sickness', value: 'sickness' },
          { label: 'vacation', value: 'vacation' },
        ]}
        setVacationType={() => {}}
      />
    );
    expect(view.container).toMatchSnapshot();
  });
});
