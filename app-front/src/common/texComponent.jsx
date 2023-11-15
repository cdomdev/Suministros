import React from 'react';

function TextPages(props) {
  const { textParts, className } = props;

  const processContent = (content) => {
    // Reemplazar saltos de línea por elementos <br>
    return content.split('\n').map((text, index) => (
      <React.Fragment key={index}>
        {text}
        {index < content.length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <div className={className}>
      {textParts.map((part, index) => {
        const { tag, content } = part;
        return React.createElement(tag, { key: index }, processContent(content));
      })}
    </div>
  );
}

export default TextPages;
