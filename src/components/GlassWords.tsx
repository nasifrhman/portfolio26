import React from 'react';

interface GlassWordsProps {
  children: React.ReactNode;
  as?: any;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  scatter?: boolean;
}

/**
 * Recursively parses React nodes and strings, wrapping every individual word
 * in a span (<span className="mag-word">) and each letter in a span (<span className="mag-letter">).
 * If scatter is true, wraps each letter in an outer <span className="scatter-letter"> for
 * coordinated scroll-driven typography assembly.
 * Preserves spaces, HTML formatting tags (<strong>, <em>, <span>, <br>), and styling.
 */
export function renderGlassWords(node: React.ReactNode, keyPrefix = 'gl', scatter = false): React.ReactNode {
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
          {letters.map((char, charIdx) => {
            const letterSpan = (
              <span key={`${keyPrefix}-c-${wordIdx}-${charIdx}`} className="mag-letter">
                {char}
              </span>
            );
            if (scatter) {
              return (
                <span key={`${keyPrefix}-s-${wordIdx}-${charIdx}`} className="scatter-letter">
                  {letterSpan}
                </span>
              );
            }
            return letterSpan;
          })}
        </span>
      );
    });
  }

  if (typeof node === 'number') {
    const str = String(node);
    return (
      <span key={`${keyPrefix}-num`} className="mag-word">
        {Array.from(str).map((char, i) => {
          const letterSpan = (
            <span key={`${keyPrefix}-num-${i}`} className="mag-letter">
              {char}
            </span>
          );
          if (scatter) {
            return (
              <span key={`${keyPrefix}-nums-${i}`} className="scatter-letter">
                {letterSpan}
              </span>
            );
          }
          return letterSpan;
        })}
      </span>
    );
  }

  if (Array.isArray(node)) {
    return node.map((child, i) => renderGlassWords(child, `${keyPrefix}-${i}`, scatter));
  }

  if (React.isValidElement(node)) {
    const element = node as React.ReactElement<{ children?: React.ReactNode }>;
    if (element.props && 'children' in element.props && element.props.children) {
      return React.cloneElement(
        element,
        undefined,
        renderGlassWords(element.props.children, `${keyPrefix}-c`, scatter)
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
  id,
  scatter = false
}) => {
  return (
    <Component className={className} style={style} id={id}>
      {renderGlassWords(children, 'gl', scatter)}
    </Component>
  );
};
