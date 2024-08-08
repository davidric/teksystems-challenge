import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import SantaLetter from '.';
import '@testing-library/jest-dom';

describe('SantaLetter Component', () => {
  const mock = new MockAdapter(axios);

  afterEach(() => {
    mock.reset();
  });

  it('renders form elements correctly', () => {
    render(<SantaLetter />);

    expect(screen.getByLabelText('Who are you?')).toBeInTheDocument();
    expect(
      screen.getByLabelText('What do you want for Christmas?'),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Send' })).toBeDisabled(); // Button should be disabled initially
  });

  it('enables the submit button when form is filled out', async () => {
    render(<SantaLetter />);

    await act(async () => {
      fireEvent.change(screen.getByLabelText('Who are you?'), {
        target: { value: 'charlie.brown' },
      });
      fireEvent.change(
        screen.getByLabelText('What do you want for Christmas?'),
        {
          target: { value: 'Gifts!' },
        },
      );
    });

    expect(screen.getByRole('button', { name: 'Send' })).not.toBeDisabled();
  });

  it('displays success modal on successful form submission', async () => {
    const mockResponse = {
      title: 'Success!',
      message: 'Your request request has been received.',
    };
    mock.onPost('/api/submit').reply(200, mockResponse);

    render(<SantaLetter />);

    act(() => {
      fireEvent.change(screen.getByLabelText('Who are you?'), {
        target: { value: 'charlie.brown' },
      });
      fireEvent.change(
        screen.getByLabelText('What do you want for Christmas?'),
        {
          target: { value: 'Gifts!' },
        },
      );
      fireEvent.click(screen.getByRole('button', { name: 'Send' }));
    });

    await waitFor(() =>
      expect(screen.getByText(mockResponse.title)).toBeInTheDocument(),
    );
    expect(screen.getByText(mockResponse.message)).toBeInTheDocument();
  });

  it('displays error modal on failed form submission', async () => {
    const mockError = { message: 'User profile not found' };
    mock.onPost('/api/submit').reply(500, mockError);

    render(<SantaLetter />);

    act(() => {
      fireEvent.change(screen.getByLabelText('Who are you?'), {
        target: { value: 'david.ricardo' },
      });
      fireEvent.change(
        screen.getByLabelText('What do you want for Christmas?'),
        {
          target: { value: 'Gifts!' },
        },
      );
      fireEvent.click(screen.getByRole('button', { name: 'Send' }));
    });

    await waitFor(() =>
      expect(screen.getByText('User profile not found')).toBeInTheDocument(),
    );
    expect(screen.getByText(mockError.message)).toBeInTheDocument();
  });

  it('closes the modal when close button is clicked', async () => {
    const mockResponse = {
      title: 'Success!',
      message: 'Your request request has been received.',
    };
    mock.onPost('/api/submit').reply(200, mockResponse);

    render(<SantaLetter />);

    act(() => {
      fireEvent.change(screen.getByLabelText('Who are you?'), {
        target: { value: 'charlie.brown' },
      });
      fireEvent.change(
        screen.getByLabelText('What do you want for Christmas?'),
        {
          target: { value: 'Gifts!' },
        },
      );
      fireEvent.click(screen.getByRole('button', { name: 'Send' }));
    });

    await waitFor(() =>
      expect(screen.getByText(mockResponse.title)).toBeInTheDocument(),
    );

    act(() => {
      fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    });

    expect(screen.queryByText(mockResponse.message)).not.toBeInTheDocument();
  });
});
