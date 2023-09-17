import TextAlign from '@tiptap/extension-text-align';
import ListItem from '@tiptap/extension-list-item';
import Underline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text';
import Link from '@tiptap/extension-link';
import { EditorProvider, useCurrentEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { EditorContent, useEditor } from '@tiptap/react';

import { ReactComponent as TextAlignLeft } from '../../assets/svg/textalignLeft.svg';
import { ReactComponent as AlignRight } from '../../assets/svg/alignRight.svg';
import { ReactComponent as AlignCenter } from '../../assets/svg/alignCenter.svg';
import { ReactComponent as JustifyCenter } from '../../assets/svg/justifyCenter.svg';
import { ReactComponent as SmallCaps } from '../../assets/svg/smallCaps.svg';
import { ReactComponent as Bold } from '../../assets/svg/bold.svg';
import { ReactComponent as UnderLine } from '../../assets/svg/underline.svg';
import { ReactComponent as Attachement } from '../../assets/svg/attachment.svg';
import { ReactComponent as LinkIcon } from '../../assets/svg/link.svg';
import { useCallback } from 'react';
import { TextContainer, ToolBar } from './style';

const RichText = ({ editor }: any) => {
  // For Link Function
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <ToolBar>
      <button
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}>
        <TextAlignLeft />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}>
        <AlignCenter />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}>
        <AlignRight />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}>
        <JustifyCenter />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}>
        <Bold />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}>
        <SmallCaps />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive('underline') ? 'is-active' : ''}>
        <UnderLine />
      </button>
      <button onClick={setLink} className={editor.isActive('link') ? 'is-active' : ''}>
        <LinkIcon />
      </button>
    </ToolBar>
  );
};

const content = `
<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<pre><code class="language-css">body {
display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
<blockquote>
  Wow, that’s amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>
`;

// export default () => {
//   return (
//     <EditorProvider
//       slotBefore={<MenuBar />}
//       extensions={extensions}
//       content={content}
//       children={undefined}></EditorProvider>
//   );
// };

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const editor = useEditor({
    extensions: [
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      Link.configure({
        openOnClick: true,
      }),
      TextStyle.configure({ types: [ListItem.name] }),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
      }),
    ],
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none',
      },
    },
    content: `
      <h3 style="text-align:center">
        Devs Just Want to Have Fun by Cyndi Lauper
      </h3>
      <p style="text-align:center">
        I come home in the morning light<br>
        My mother says, <mark>“When you gonna live your life right?”</mark><br>
        Oh mother dear we’re not the fortunate ones<br>
        And devs, they wanna have fun<br>
        Oh devs just want to have fun</p>
      <p style="text-align:center">
        The phone rings in the middle of the night<br>
        My father yells, "What you gonna do with your life?"<br>
        Oh daddy dear, you know you’re still number one<br>
        But <s>girls</s>devs, they wanna have fun<br>
        Oh devs just want to have
      </p>
      <p style="text-align:center">
        That’s all they really want<br>
        Some fun<br>
        When the working day is done<br>
        Oh devs, they wanna have fun<br>
        Oh devs just wanna have fun<br>
        (devs, they wanna, wanna have fun, devs wanna have)
      </p>
    `,
  });

  return (
    <TextContainer>
      <EditorContent editor={editor} />
      <RichText editor={editor} />
    </TextContainer>
  );
};
