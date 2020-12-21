import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders Clear Tweets', () => {
  render(<App />);
  const linkElement = screen.getByText(/Clear Tweets/i);
  expect(linkElement).toBeInTheDocument();
});
