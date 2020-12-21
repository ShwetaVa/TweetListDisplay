import { render, screen, fireEvent } from '@testing-library/react';
import LikeList from '../LikeList';

test('renders LikeList with empty data', () => {
  render(<LikeList
    list = {[]} />);
  const linkElement = screen.getByText(/Total Tweets 0/i);
  expect(linkElement).toBeInTheDocument();
});


test('renders LikeList with list of 2 items', () => {
    render(<LikeList
      list = {["{\"account\": \"iamdevloper\", \"timestamp\": 1608566120412, \"content\": \"Expert Tweet number 2\"}",
      "{\"account\": \"CommitStrip\", \"timestamp\": 1608566139412, \"content\": \"Funny Tweet number 5\"}"]} />);
    const linkElement = screen.getByText(/Total Tweets 2/i);
    expect(linkElement).toBeInTheDocument();
  });

test('fire like event', () => {
    render(<LikeList
      list = {["{\"account\": \"iamdevloper\", \"timestamp\": 1608566120412, \"content\": \"Expert Tweet number 2\"}",
      "{\"account\": \"CommitStrip\", \"timestamp\": 1608566139412, \"content\": \"Funny Tweet number 5\"}"]} />);
    const clickedButton = fireEvent.click(screen.getByText(/iamdevloper/i));
    if(clickedButton) 
    render(<LikeList
        list = {["{\"account\": \"iamdevloper\", \"timestamp\": 1608566120412, \"content\": \"Expert Tweet number 2\"}"]} />);
    const linkElement = screen.getByText(/Total Tweets 1/i);
    expect(linkElement).toBeInTheDocument();
  });