import { useState } from "react";

interface CodeBlockProps {
  code: string;
  title: string;
  description: string;
}

function highlightGDScript(code: string): string {
  let highlighted = code
    // Escape HTML
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Comments (# ...)
  highlighted = highlighted.replace(
    /(#[^\n]*)/g,
    '<span class="code-comment">$1</span>'
  );

  // Strings ("..." and '...')
  highlighted = highlighted.replace(
    /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g,
    '<span class="code-string">$1</span>'
  );

  // Keywords
  const keywords = [
    "var",
    "const",
    "func",
    "class",
    "class_name",
    "extends",
    "signal",
    "enum",
    "if",
    "elif",
    "else",
    "match",
    "for",
    "while",
    "in",
    "return",
    "pass",
    "break",
    "continue",
    "await",
    "yield",
    "static",
    "export",
    "tool",
    "self",
    "super",
    "is",
    "as",
    "not",
    "and",
    "or",
    "true",
    "false",
    "null",
    "void",
    "preload",
    "load",
  ];

  const keywordRegex = new RegExp(
    `\\b(${keywords.join("|")})\\b`,
    "g"
  );
  highlighted = highlighted.replace(
    keywordRegex,
    (match) => {
      // Don't highlight if inside a comment or string span
      return `<span class="code-keyword">${match}</span>`;
    }
  );

  // Decorators (@export, @onready, etc.)
  highlighted = highlighted.replace(
    /(@\w+)/g,
    '<span class="code-decorator">$1</span>'
  );

  // Built-in types
  const types = [
    "int",
    "float",
    "String",
    "bool",
    "Vector2",
    "Vector3",
    "Color",
    "Array",
    "Dictionary",
    "Node",
    "Node2D",
    "Node3D",
    "Sprite2D",
    "Label",
    "CharacterBody2D",
    "RigidBody2D",
    "Area2D",
    "PackedScene",
    "Texture2D",
    "InputEvent",
    "Tween",
    "Signal",
    "Callable",
  ];

  const typeRegex = new RegExp(`\\b(${types.join("|")})\\b`, "g");
  highlighted = highlighted.replace(
    typeRegex,
    '<span class="code-type">$1</span>'
  );

  // Numbers
  highlighted = highlighted.replace(
    /\b(\d+\.?\d*)\b/g,
    '<span class="code-number">$1</span>'
  );

  // Function calls
  highlighted = highlighted.replace(
    /\b(\w+)(\s*\()/g,
    '<span class="code-function">$1</span>$2'
  );

  return highlighted;
}

export default function CodeBlock({ code, title, description }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlighted = highlightGDScript(code);
  const lines = code.split("\n");

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-700/50 shadow-lg">
      <div className="flex items-center justify-between px-4 py-3 bg-gray-800/80 border-b border-gray-700/50">
        <div>
          <h4 className="text-white font-semibold text-sm">{title}</h4>
          <p className="text-gray-400 text-xs mt-0.5">{description}</p>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 bg-gray-700/50 hover:bg-blue-600/80 text-gray-300 hover:text-white"
        >
          {copied ? (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Скопировано!
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Копировать
            </>
          )}
        </button>
      </div>
      <div className="overflow-x-auto">
        <div className="flex">
          <div className="py-4 pl-4 pr-2 text-right select-none border-r border-gray-700/30">
            {lines.map((_, i) => (
              <div key={i} className="text-gray-600 text-xs leading-6 font-mono">
                {i + 1}
              </div>
            ))}
          </div>
          <pre className="py-4 px-4 text-sm leading-6 font-mono flex-1 overflow-x-auto">
            <code dangerouslySetInnerHTML={{ __html: highlighted }} />
          </pre>
        </div>
      </div>
    </div>
  );
}
