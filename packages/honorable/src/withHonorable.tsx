/* eslint-disable no-multi-spaces */
import { ComponentType, Ref, forwardRef, memo, useMemo, useState } from 'react'
import styled from '@emotion/styled'
import isPropValid from '@emotion/is-prop-valid'
import merge from 'lodash.merge'

import {
  HonorableProps,
  StyledHonorableProps,
  StylesProps,
} from './types'

import styleProperties from './data/stylesProperties'
import mpProperties from './data/mpProperties'

import useTheme from './hooks/useTheme'

import isSelector from './utils/isSelector'
import resolveAll from './resolvers/resolveAll'
import resolveDefaultProps from './resolvers/resolveDefaultProps'
import resolveDefaultStyles from './resolvers/resolveDefaultStyles'

const allStyleProperties = [
  'xflex',
  ...mpProperties,
  ...styleProperties,
]
const suffixedAllStyleProperties = allStyleProperties.map(x => `${x}-`)

// React HOC to support style props
function withHonorable<P>(ComponentOrTag: string | ComponentType, name: string) {
  const isTag = typeof ComponentOrTag === 'string'
  const componentPropsTypes = isTag ? {} : ComponentOrTag.propTypes || {}
  const propTypeKeys = Object.keys(componentPropsTypes)

  const HonorableStyle = styled(
    ComponentOrTag as ComponentType<StyledHonorableProps & P>,
    {
      shouldForwardProp: (prop: string) => !(isTag || prop === 'honorable' || prop === 'theme') || isPropValid(prop),
    }
  )(props => props.honorable)

  function Honorable(props: HonorableProps<P>, ref: Ref<any>) {
    const theme = useTheme()
    const [overridenProps, setOverridenProps] = useState({})

    const [honorable, otherProps] = useMemo(() => {
      const aliases = Object.keys(theme.aliases || {})
      const suffixedAliases = aliases.map(x => `${x}-`)
      const stylesProps: StylesProps = {}
      const otherProps = {} as P
      const resolvedProps = { ...props, ...overridenProps }
      const resolvedDefaultProps = resolveDefaultProps(theme[name]?.defaultProps, theme)
      const resolvedDefaultStyles = resolveDefaultStyles(theme[name]?.defaultStyles, resolvedProps, theme)

      Object.entries(props).forEach(([key, value]) => {
        if (
          (
            allStyleProperties.includes(key)
            || suffixedAllStyleProperties.some(x => key.startsWith(x))
            || aliases.includes(key)
            || suffixedAliases.some(x => key.startsWith(x))
            || isSelector(key)
          )
          && !propTypeKeys.includes(key)
        ) {
          stylesProps[key] = value
        }
        else {
          otherProps[key] = value
        }
      })

      return [
        resolveAll(
          merge(
            {},
            // Component defaultStyles
            resolvedDefaultStyles,
            // Global props
            resolveDefaultStyles(theme.global, { ...resolvedProps, ...resolvedDefaultProps, ...resolvedDefaultStyles }, theme),
            // Actual style from props
            stylesProps,
          ),
          theme
        ),
        {
          ...otherProps,
          ...resolvedDefaultProps,
        },
      ]
    }, [props, overridenProps, theme])

    return (
      <HonorableStyle
        ref={ref}
        theme={theme}
        __honorableOrigin={name}
        __honorableOverridenProps={overridenProps}
        __honorableSetOverridenProps={setOverridenProps}
        honorable={honorable}
        {...otherProps}
      />
    )
  }

  const ForwardedHonorable = forwardRef(Honorable)

  ForwardedHonorable.displayName = `Honorable(${name})`
  ForwardedHonorable.propTypes = componentPropsTypes

  return memo(ForwardedHonorable)
}

export default withHonorable
