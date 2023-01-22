import React from 'react';
import { render } from '@testing-library/react';
import ExportButton from '../../../../components/InputFields/ExportButton';

describe('I can generate an iCal file', () => {
  test('should match', () => {
    const { container } = render(
      <ExportButton
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
      <ExportButton
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
