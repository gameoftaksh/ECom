// src/components/ui/carousel.jsx
import React from 'react';

export const Carousel = ({ children, ...props }) => (
  <div {...props}>
    {children}
  </div>
);

export const CarouselContent = ({ children }) => (
  <div>
    {children}
  </div>
);

export const CarouselItem = ({ children }) => (
  <div>
    {children}
  </div>
);

export const CarouselPrevious = () => (
  <button>Previous</button>
);

export const CarouselNext = () => (
  <button>Next</button>
);
