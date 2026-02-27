import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";

const extensions = [
  StarterKit.configure({ heading: { levels: [2, 3, 4] } }),
  Underline,
  Link,
  TextAlign.configure({ types: ["heading", "paragraph"] }),
];

export function TiptapRenderer({ content }: { content: unknown }) {
  if (!content) return null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const html = generateHTML(content as any, extensions);

  return (
    <div
      className="prose-cjt"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
