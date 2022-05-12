import { Ref, forwardRef } from 'react'

import withHonorable from '../../withHonorable'

import { Div, DivProps } from '../tags'

export type BoxBaseProps = Record<string, never>

export type BoxProps = DivProps & BoxBaseProps

export const BoxPropTypes = {}

function BoxRef(props: BoxProps, ref: Ref<any>) {
  return (
    <Div
      ref={ref}
      {...props}
    />
  )
}

BoxRef.displayName = 'Box'

const ForwardedBox = forwardRef(BoxRef)

ForwardedBox.propTypes = BoxPropTypes

export const Box = withHonorable<BoxProps>(ForwardedBox, 'Box')