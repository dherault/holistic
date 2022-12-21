import { PropsWithChildren, memo, useContext } from 'react'
import { ThemeProvider as EmotionProvider } from '@emotion/react'
import PropTypes from 'prop-types'

import { HonorableTheme } from '../../types'

import ThemeContext from '../../contexts/ThemeContext'
import enhanceTheme from '../../utils/enhanceTheme'
import mergeTheme from '../../utils/mergeTheme'

import { Div } from '../tags'

export type ThemeProviderBaseProps = {
  theme: HonorableTheme
}

export type ThemeProviderProps = PropsWithChildren<ThemeProviderBaseProps>

export const themProviderPropTypes = {
  theme: PropTypes.object,
}

function BaseThemeProvider({ theme = {}, children }: ThemeProviderProps) {
  const userTheme = enhanceTheme(theme)

  return (
    <ThemeContext.Provider value={userTheme}>
      <EmotionProvider theme={userTheme}>
        {children}
        <Div id="honorable-portal" />
      </EmotionProvider>
    </ThemeContext.Provider>
  )
}

function BaseExtendTheme({ theme = {}, children }: ThemeProviderProps) {
  const existingTheme = useContext(ThemeContext)
  const extendedTheme = enhanceTheme(mergeTheme(existingTheme, theme))

  return (
    <ThemeContext.Provider value={extendedTheme}>
      {children}
    </ThemeContext.Provider>
  )
}

BaseThemeProvider.propTypes = themProviderPropTypes
BaseExtendTheme.propTypes = themProviderPropTypes

export const ThemeProvider = memo(BaseThemeProvider)

export const ExtendTheme = memo(BaseExtendTheme)
