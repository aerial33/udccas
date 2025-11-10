import RichText from '@/components/RichText'
import React from 'react'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import { Width } from '../Width'

export const Message: React.FC<{ message: any }> = ({ message }) => {
  return (
    <Width className="my-12" width="100">
      {message && <RichText data={message as DefaultTypedEditorState} />}
    </Width>
  )
}
