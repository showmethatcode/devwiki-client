import React, { useState } from 'react'
import SimpleMdeReact from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'

export const ControlledUsage = () => {
  const [value, setValue] = useState('Initial')

  const onChange = (value: string) => {
    setValue(value)
  }

  return <SimpleMdeReact value={value} onChange={onChange} />
}
