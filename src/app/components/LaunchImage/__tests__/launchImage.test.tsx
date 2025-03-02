import { render, screen } from '@testing-library/react';
import ProductImage, { ProductImageProps } from '../ProductImage';

describe('ProductImage Component', () => {
  const imgSetMock: ProductImageProps['imgSet'] = {
    sm: { src: 'small-image' },
    md: { src: 'medium-image' },
    lg: { src: 'large-image' },
    alt: 'Test image',
  };

  test('renders image with correct src and srcSet', () => {
    render(<ProductImage imgSet={imgSetMock} />);
    const imgElement = screen.getByRole('img');

    expect(imgElement).toHaveAttribute('src', 'small-image.webp');
    expect(imgElement).toHaveAttribute(
      'srcset',
      'small-image.webp 1x, medium-image.webp 2x,  large-image.webp 3x',
    );
  });

  test('renders image with lazy loading by default', () => {
    render(<ProductImage imgSet={imgSetMock} />);
    const imgElement = screen.getByRole('img');
    expect(imgElement).toHaveAttribute('loading', 'lazy');
  });

  test('renders image with eager loading when fetchPriority is true', () => {
    render(<ProductImage imgSet={imgSetMock} fetchPriority />);
    const imgElement = screen.getByRole('img');
    expect(imgElement).toHaveAttribute('loading', 'eager');
  });

  test('renders image with correct alt text', () => {
    render(<ProductImage imgSet={imgSetMock} />);
    const imgElement = screen.getByRole('img');
    expect(imgElement).toHaveAttribute('alt', 'Test image');
  });

  test('renders image with empty alt text', () => {
    const imgWithoutAltText = { ...imgSetMock, alt: '' };
    render(<ProductImage imgSet={imgWithoutAltText} />);
    const imgElement = screen.getByRole('img');
    expect(imgElement).toHaveAttribute('alt', '');
  });

  test('renders image with correct CSS class', () => {
    render(<ProductImage imgSet={imgSetMock} />);
    const imgElement = screen.getByRole('img');
    expect(imgElement).toHaveClass('product-image');
  });
});
