import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from '../../src/pages/index';

describe('Home page', () => {
  it('Should render properly', () => {
    render(<HomePage />);

    const header = screen.getByRole('heading');
    const headerText = 'Absence Manager';

    expect(header).toHaveTextContent(headerText);
  });
});
