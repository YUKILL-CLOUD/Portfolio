'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import { Bold, Italic, List, ListOrdered, Heading1, Heading2, Link as LinkIcon, Undo, Redo } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TiptapEditorProps {
    value: string;
    onChange: (html: string) => void;
}

export function TiptapEditor({ value, onChange }: TiptapEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Link.configure({
                openOnClick: false
            })
        ],
        content: value || '<p></p>',
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        }
    });

    if (!editor) {
        return <div className="h-40 bg-zinc-900/50 rounded-lg border border-zinc-800 animate-pulse" />;
    }

    return (
        <div className="border border-zinc-800 rounded-lg bg-zinc-950 overflow-hidden">
            {/* Toolbar */}
            <div className="flex flex-wrap gap-1 p-2 bg-zinc-900 border-b border-zinc-800">
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={editor.isActive('bold') ? 'bg-zinc-800 text-primary' : 'text-zinc-400'}
                >
                    <Bold className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={editor.isActive('italic') ? 'bg-zinc-800 text-primary' : 'text-zinc-400'}
                >
                    <Italic className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={editor.isActive('heading', { level: 1 }) ? 'bg-zinc-800 text-primary' : 'text-zinc-400'}
                >
                    <Heading1 className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={editor.isActive('heading', { level: 2 }) ? 'bg-zinc-800 text-primary' : 'text-zinc-400'}
                >
                    <Heading2 className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive('bulletList') ? 'bg-zinc-800 text-primary' : 'text-zinc-400'}
                >
                    <List className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={editor.isActive('orderedList') ? 'bg-zinc-800 text-primary' : 'text-zinc-400'}
                >
                    <ListOrdered className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().undo().run()}
                    className="text-zinc-400"
                >
                    <Undo className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().redo().run()}
                    className="text-zinc-400"
                >
                    <Redo className="h-4 w-4" />
                </Button>
            </div>
            {/* Editable Content Area */}
            <EditorContent
                editor={editor}
                className="p-4 text-zinc-300 min-h-[160px] prose prose-invert max-w-none focus:outline-none"
            />
        </div>
    );
}
