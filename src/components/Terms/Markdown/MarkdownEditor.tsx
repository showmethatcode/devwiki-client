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
// controlled -> 부모에서 상태 관리
// uncontrolled -> 자체적으로 상태관리
// 상태 자체를 부모가 갖고있고, 그 상태가 비었는지 아닌지를 통해 부모에서 판단
// 마크다운 value의 상태를 부모가 관리하게끔 해야 한다.
// 마크다운 에디터가 에디터로서의 기능만 가져서 재사용을 할 수 있게끔

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
    const valueType = props.valueType || 'markdown'
    props.setMarkdownContent(
      valueType === 'markdown' ? instance.getHTML() : instance.getMarkdown(),
    )
  }, [props, editorRef])
  // 제어컴포넌트, 비제어 컴포넌트 다시 보기

  return (
    <div>
      <EditorWithForwardedRef
        {...props}
        initialValue={initialValue}
        previewStyle={previewStyle ?? 'vertical'}
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
