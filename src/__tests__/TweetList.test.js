import { render, screen , fireEvent} from '@testing-library/react';
import TweetList from '../TweetList';

test('renders Clear Tweets button text', () => {
  render(<TweetList />);
  const linkElement = screen.getByText(/Clear Tweets/i);
  expect(linkElement).toBeInTheDocument();
});


test('renders LikeList element Liked Tweets', () => {
    render(<TweetList />);
    const linkElement = screen.getByText(/Liked Tweets/i);
    expect(linkElement).toBeInTheDocument();
  });

test('click clear tweet button', () => {
    render(<TweetList />);
    const linkElement = fireEvent.click(screen.getByText(/Clear Tweets/i));
    expect(linkElement)
});
