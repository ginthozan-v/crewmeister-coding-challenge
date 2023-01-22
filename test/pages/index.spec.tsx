import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from '../../src/pages/index';

describe('Home page', () => {
  it('Should render properly', () => {
    render(<HomePage />);
  });
});
