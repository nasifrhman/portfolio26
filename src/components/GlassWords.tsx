import React from 'react';

interface GlassWordsProps {
  children: React.ReactNode;
  as?: any;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

/**
 * Recursively parses React nodes and strings, wrapping every individual word
 * in a smooth iPhone glass scale-up span (<span className="word-glass">).
 * Preserves spaces, HTML formatting tags (<strong>, <em>, <span>, <a>), and styling.
 */
export function renderGlassWords(node: React.ReactNode, keyPrefix = 'gl'): React.ReactNode {
  if (typeof node === 'string') {
    const tokens = node.split(/(\s+)/);
    return tokens.map((token, wordIdx) => {
      if (!token) return null;
      if (/^\s+$/.test(token)) {
        return token;
      }
      const letters = Array.from(token);
      return (
        <span key={`${keyPrefix}-w-${wordIdx}`} className="mag-word">
          {letters.map((char, charIdx) => (
            <span key={`${keyPrefix}-c-${wordIdx}-${charIdx}`} className="mag-letter">
              {char}
            </span>
          ))}
        </span>
      );
    });
  }

  if (typeof node === 'number') {
    const str = String(node);
    return (
      <span key={`${keyPrefix}-num`} className="mag-word">
        {Array.from(str).map((char, i) => (
          <span key={`${keyPrefix}-num-${i}`} className="mag-letter">
            {char}
          </span>
        ))}
      </span>
    );
  }

  if (Array.isArray(node)) {
    return node.map((child, i) => renderGlassWords(child, `${keyPrefix}-${i}`));
  }

  if (React.isValidElement(node)) {
    const element = node as React.ReactElement<{ children?: React.ReactNode }>;
    if (element.props && 'children' in element.props && element.props.children) {
      return React.cloneElement(
        element,
        undefined,
        renderGlassWords(element.props.children, `${keyPrefix}-c`)
      );
    }
  }

  return node;
}

export const GlassWords: React.FC<GlassWordsProps> = ({
  children,
  as: Component = 'span',
  className = '',
  style,
  id
}) => {
  return (
    <Component className={className} style={style} id={id}>
      {renderGlassWords(children)}
    </Component>
  );
};
