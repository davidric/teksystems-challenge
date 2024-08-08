import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from '.';

// Mock the Spinner component
vi.mock('../Spinner', () => ({
  default: () => <div>[spinner_icon]</div>,
}));

describe('Button Component', () => {
  it('should render children when not loading', () => {
    render(<Button>Send</Button>);
    expect(screen.getByText('Send')).toBeInTheDocument();
    expect(screen.queryByText('[spinner_icon]')).not.toBeInTheDocument();
  });

  it('should display spinner and loading text when loading', () => {
    render(<Button isLoading loadingText="Sending..." />);
    expect(screen.getByText('Sending...')).toBeInTheDocument();
    expect(screen.getByText('[spinner_icon]')).toBeInTheDocument();
  });

  it('should be disabled when isLoading is true', () => {
    render(<Button isLoading />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('should apply disabled styles when disabled or loading', () => {
    render(<Button disabled />);
    const button = screen.getByRole('button');
    expect(button.className).toContain('btnDisabled');

    render(<Button isLoading />);
    expect(button.className).toContain('btnDisabled');
  });

  it('should apply normal styles when not disabled or loading', () => {
    render(<Button>Send</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('btn');
  });
});
