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
  onChange(value: string | boolean): void
  valueType?: 'markdown' | 'html'
}

const Markdown: FC<Props> = (props, value) => {
  const [contentNotFoundError, setContentNotFoundError] = useState(true)
  const {
    initialValue,
    previewStyle,
    height,
    initialEditType,
    useCommandShortcut,
  } = props

  const editorRef = useRef<EditorType>()
  const handleChange = useCallback(() => {
    if (!editorRef.current) {
      setContentNotFoundError(true)
      return
    } else {
      setContentNotFoundError(false)
      console.log(contentNotFoundError)
      props.onChange(contentNotFoundError)
    }

    const instance = editorRef.current.getInstance()
    const valueType = props.valueType || 'markdown'

    props.onChange(
      valueType === 'markdown' ? instance.getMarkdown() : instance.getHTML(),
    )
  }, [props, editorRef.current])

  return (
    <div>
      <EditorWithForwardedRef
        {...props}
        initialValue={initialValue}
        previewStyle={previewStyle || 'vertical'}
        height={height || '550px'}
        initialEditType={initialEditType || 'markdown'}
        useCommandShortcut={useCommandShortcut || true}
        ref={editorRef}
        onChange={handleChange}
      />
    </div>
  )
}

export default Markdown
