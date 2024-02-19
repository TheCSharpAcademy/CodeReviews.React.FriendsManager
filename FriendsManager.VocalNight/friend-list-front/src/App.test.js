import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import store from './store';
import { Provider } from 'react-redux'
import FriendsList from './Components/FriendsList';

test('renders learn react link', async () => {
  render(<Provider store={store}>
    <App />
  </Provider>);

await waitFor(() => {
  const friendTable = screen.getByTestId("friendTable");
  expect(friendTable).toBeInTheDocument();
})
});
