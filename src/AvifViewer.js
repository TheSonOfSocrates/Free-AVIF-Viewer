import React, { useState, useEffect } from 'react';
import { decode } from '@jsquash/avif';

const AvifViewer = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const avifUrl = 'https://aomedia.org/assets/images/blog/parrot-avif.avif'; // AVIF image URL

  const fetchAndDisplayImage = async () => {
    try {
      const response = await fetch(avifUrl);
      const arrayBuffer = await response.arrayBuffer();

      // Decode the AVIF image
      const { width, height, data } = await decode(arrayBuffer);
      console.log('Decoded Data:', data); // Log decoded data

      // Create an ImageData object
      const imageData = new ImageData(new Uint8ClampedArray(data), width, height);
      
      // Create a canvas to draw the image data
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext('2d');
      context.putImageData(imageData, 0, 0);
      
      // Set image source to the canvas data URL
      setImageSrc(canvas.toDataURL());
    } catch (error) {
      console.error('Error fetching or decoding AVIF image:', error);
    }
  };

  useEffect(() => {
    fetchAndDisplayImage();
  }, []);

  return (
    <div>
      <h1>AVIF Viewer</h1>
      {imageSrc && (
        <>
          <h2>Decoded AVIF Image:</h2>
          <img src={imageSrc} alt="Decoded AVIF" />
        </>
      )}
    </div>
  );
};

export default AvifViewer;
