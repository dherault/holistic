import merge from 'lodash.merge'

import { DefaultProps, HonorableTheme } from '../types'

import filterObject from './filterObject'

function resolveDefaultProps(defaultProps: DefaultProps, props: object, theme: HonorableTheme): object {
  if (Array.isArray(defaultProps)) {
    // We use merge here becasue some style props are deeply nested objects
    return defaultProps.reduce((acc, x) => merge(acc, resolveDefaultProps(x, props, theme)), {})
  }

  if (typeof defaultProps === 'function') {
    return filterObject(defaultProps(props, theme))
  }

  return filterObject(defaultProps)
}

export default resolveDefaultProps