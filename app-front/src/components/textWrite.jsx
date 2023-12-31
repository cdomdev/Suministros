import React, { useState, useEffect } from 'react';

const TypewriterText = () => {
  const [text, setText] = useState('');
  const fullText = `Pinturas, cocinas,  baños y mucho mas aqui en suministros.`;

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
    }, 230); 

    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className='txt-primario'>{text}</h1>
  );
};

export default TypewriterText;
