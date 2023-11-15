import React, { useState, useEffect } from 'react';

const TypewriterText = () => {
  const [text, setText] = useState('');
  const fullText = `Sumérgete en un océano de ofertas en Suministro.`;

  useEffect(() => {
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.substring(0, currentIndex));
        currentIndex++;
      } else {
        currentIndex = 0;
        setText('');
      }
    }, 220); 

    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className='txt-primario'>{text}</h1>
  );
};

export default TypewriterText;
