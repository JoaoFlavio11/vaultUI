/* eslint-disable @typescript-eslint/no-unused-vars */
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import { CopyButton } from "./CopyButton";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          const codeString = String(children).replace(/\n$/, "");
          
          if (match) {
            return (
              <div className="relative group my-4">
                <div className="absolute right-2 top-2 z-10">
                  <CopyButton text={codeString} className="opacity-100" />
                </div>
                <SyntaxHighlighter
                  style={oneDark}
                  language={match[1]}
                  PreTag="div"
                  className="rounded-lg bg-muted/50! my-0!"
                >
                  {codeString}
                </SyntaxHighlighter>
              </div>
            );
          }

          return (
            <code
              className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono"
              {...props}
            >
              {children}
            </code>
          );
        },
        p({ children }) {
          return <p className="mb-4 last:mb-0">{children}</p>;
        },
        ul({ children }) {
          return <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>;
        },
        ol({ children }) {
          return <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>;
        },
        h1({ children }) {
          return <h1 className="text-2xl font-bold mb-4">{children}</h1>;
        },
        h2({ children }) {
          return <h2 className="text-xl font-bold mb-3">{children}</h2>;
        },
        h3({ children }) {
          return <h3 className="text-lg font-bold mb-2">{children}</h3>;
        },
        blockquote({ children }) {
          return (
            <blockquote className="border-l-4 border-primary pl-4 italic my-4">
              {children}
            </blockquote>
          );
        },
        a({ href, children }) {
          return (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline hover:no-underline"
            >
              {children}
            </a>
          );
        },
        table({ children }) {
          return (
            <div className="overflow-x-auto my-4">
              <table className="min-w-full border border-border rounded-lg">
                {children}
              </table>
            </div>
          );
        },
        th({ children }) {
          return (
            <th className="px-4 py-2 bg-muted font-semibold text-left border-b border-border">
              {children}
            </th>
          );
        },
        td({ children }) {
          return (
            <td className="px-4 py-2 border-b border-border">{children}</td>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}