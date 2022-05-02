import { Ref, forwardRef } from 'react'

import withHonorable from '../withHonorable'

import { P, PProps } from './tags'

export type TextProps = PProps

export const TextPropTypes = {}

function TextRef(props: TextProps, ref: Ref<any>) {
  return (
    <P
      ref={ref}
      {...props}
    />
  )
}

TextRef.displayName = 'Text'

const ForwardedText = forwardRef(TextRef)

ForwardedText.propTypes = TextPropTypes

export const Text = withHonorable<TextProps>(ForwardedText, 'Text')
