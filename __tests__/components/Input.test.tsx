import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '@/components/ui/input';

describe('Input Component', () => {
  it('renders correctly with default props', () => {
    render(<Input placeholder="Search city" />);
    
    const input = screen.getByPlaceholderText('Search city');
    expect(input).toBeInTheDocument();
    // Input doesn't set a default type, so we're not testing that anymore
  });

  it('applies custom className correctly', () => {
    render(<Input className="test-class" data-testid="test-input" />);
    
    const input = screen.getByTestId('test-input');
    expect(input).toHaveClass('test-class');
  });

  it('handles user input correctly', () => {
    const handleChange = jest.fn();
    render(<Input data-testid="test-input" onChange={handleChange} />);
    
    const input = screen.getByTestId('test-input');
    fireEvent.change(input, { target: { value: 'Tashkent' } });
    
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(input).toHaveValue('Tashkent');
  });

  it('passes custom attributes correctly', () => {
    render(
      <Input 
        data-testid="test-input"
        type="search"
        disabled
        maxLength={20}
      />
    );
    
    const input = screen.getByTestId('test-input');
    expect(input).toHaveAttribute('type', 'search');
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute('maxLength', '20');
  });
});
