import TextAlign from '@tiptap/extension-text-align';
import ListItem from '@tiptap/extension-list-item';
import Underline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text';
import Link from '@tiptap/extension-link';
import { EditorProvider, useCurrentEditor } from '@tiptap/react';
import Placeholder from '@tiptap/extension-placeholder';
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
import { useCallback, useState } from 'react';
import { RichTextContainer, TextContainer, ToolBar } from './style';
import { H5 } from '../../styles';
import { colors, spacing } from '../../utils';

const Formatter = ({ editor }: any) => {
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
      {/* <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}>
        <SmallCaps />
      </button> */}

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

// eslint-disable-next-line import/no-anonymous-default-export
const RichText = ({ error, placeholderText, label, selectedValue }: any) => {
  const [value, setValue] = useState<any>('');
  const editor = useEditor({
    extensions: [
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),

      Underline,
      Placeholder.configure({
        placeholder: placeholderText,
      }),
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
    onUpdate({ editor }: any) {
      // setEditorContent(editor.getJSON());

      const toJSON = editor.getJSON();

      let editedData = toJSON.content?.[0]?.content[0]?.text;
      selectedValue(editedData);
      setValue(editedData);
    },
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none',
      },
    },
  });

  return (
    <RichTextContainer>
      <H5 semiBold style={{ marginLeft: 5, marginBottom: spacing.xsmall }} left color={colors.grey}>
        {label}
      </H5>
      <TextContainer error={value.length < 2 && error ? 'error' : ''}>
        <EditorContent editor={editor} />
        <Formatter editor={editor} />
      </TextContainer>
      {value.length < 2 && error && (
        <H5 left color={error ? colors.red : colors.grey}>
          <div>{error}</div>
        </H5>
      )}
    </RichTextContainer>
  );
};

export default RichText;
