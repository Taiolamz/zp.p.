import styled from "styled-components";
import { colors, spacing, borderRadius } from "../../utils";

interface StyleProps {
  error?: string;
  backgroundColor?: string;
  borderColor?: string;
  value?: string;
}

export const TextContainer = styled.div`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border: 1px solid
    ${(p: StyleProps) =>
      p.error ? colors.red : p.borderColor ? p.borderColor : colors.primary};
  border-radius: ${borderRadius.small};
  background-color: ${(p: StyleProps) =>
    p.backgroundColor ? p.backgroundColor : "transparent"};
  border-radius: ${borderRadius.small};
  padding-bottom: ${spacing.xsmall};

> div > div{
  outline: none;
  min-height: ${spacing.xlarge};
  padding-left: ${spacing.small_2};

}

.tiptap p.is-editor-empty:first-child::before {
  color: #adb5bd;
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}
`;

export const ToolBar = styled.div`
display: flex;
column-gap: ${spacing.small};
  align-items: center;
  width: 100%;
  padding-left: ${spacing.small_2};
`;

export const RichTextContainer = styled.div`
margin-bottom: ${spacing.small};
`;