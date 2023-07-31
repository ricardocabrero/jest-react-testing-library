import { render, screen } from '@testing-library/react';
import App from './App';


describe('App test', () => {

  test('renders To do list with Redux', () => {
    render(<App/>);
    const h1Element = screen.getByText(/To do list with Redux/i);
    expect(h1Element).toBeInTheDocument();
  });
});
