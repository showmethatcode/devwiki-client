import dynamic from 'next/dynamic'
import React, { useState, useCallback, useRef, FC, useEffect } from 'react'
import { Editor as EditorType, EditorProps } from '@toast-ui/react-editor'
import { TuiEditorWithForwardedProps } from './TuiEditorWrapper'

interface EditorPropsWithHandlers extends EditorProps {
  onChange?(value: string): void
}

const Editor = dynamic<TuiEditorWithForwardedProps>(
  () => import('./TuiEditorWrapper'),
  { ssr: false },
)
const EditorWithForwardedRef = React.forwardRef<
  EditorType | undefined,
  EditorPropsWithHandlers
>((props, ref) => (
  <Editor {...props} forwardedRef={ref as React.MutableRefObject<EditorType>} />
))

interface Props extends EditorProps {
  onChange?(value: string | boolean): void
  valueType?: 'markdown' | 'html'
  setIsContentEmpty?: (isContentEmpty: boolean) => void
  setMarkdownContent?: (content: any) => void
}

const Markdown: FC<Props> = (props, value) => {
  const {
    initialValue,
    previewStyle,
    height,
    initialEditType,
    useCommandShortcut,
  } = props

  const editorRef = useRef<EditorType>()
  const handleChange = useCallback(() => {
    const instance = editorRef.current.getInstance()
    if (instance.getMarkdown().length < 1) {
      props.setIsContentEmpty(true)
      return
    } else {
      props.setIsContentEmpty(false)
    }
    const valueType = props.valueType ?? 'markdown'
    props.setMarkdownContent(
      valueType === 'markdown' ? instance.getHTML() : instance.getMarkdown(),
    )
  }, [props, editorRef])

  return (
    <div>
      <EditorWithForwardedRef
        {...props}
        initialValue={initialValue}
        previewStyle={previewStyle ?? 'vertical'}
        height={height ?? '550px'}
        initialEditType={initialEditType || 'markdown'}
        useCommandShortcut={useCommandShortcut || true}
        ref={editorRef}
        onChange={handleChange}
      />
    </div>
  )
}

export default Markdown
