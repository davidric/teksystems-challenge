import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Modal from './';
import '@testing-library/jest-dom';

describe('Modal Component', () => {
  it('should not render when show is false', () => {
    render(
      <Modal show={false} onClose={vi.fn()} title="Modal Title">
        Modal Content
      </Modal>,
    );
    expect(screen.queryByText('Modal Title')).not.toBeInTheDocument();
    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });

  it('should render when show is true', () => {
    render(
      <Modal show={true} onClose={vi.fn()} title="Modal Title">
        Modal Content
      </Modal>,
    );
    expect(screen.getByText('Modal Title')).toBeInTheDocument();
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('should call onClose when the close button is clicked', () => {
    const onClose = vi.fn();
    render(
      <Modal show={true} onClose={onClose} title="Modal Title">
        Modal Content
      </Modal>,
    );
    fireEvent.click(screen.getByRole('button', { name: /×/ })); // Click the close button
    expect(onClose).toHaveBeenCalled();
  });

  it('should call onClose when the footer close button is clicked', () => {
    const onClose = vi.fn();
    render(
      <Modal show={true} onClose={onClose} title="Modal Title">
        Modal Content
      </Modal>,
    );
    fireEvent.click(screen.getByRole('button', { name: /Close/ })); // Click the footer close button
    expect(onClose).toHaveBeenCalled();
  });
});
