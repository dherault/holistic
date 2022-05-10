import { useMemo, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CssBaseline, ThemeProvider, mergeTheme } from 'honorable'

import theme from './extended-honorable-theme'

import Home from './scenes/Home'

import ThemeModeContext from './contexts/ThemeModeContext'

function App() {
  const [themeMode, setThemeMode] = useState('light')
  const themeModeContextValue = useMemo(() => [themeMode, setThemeMode], [themeMode])

  return (
    <ThemeModeContext.Provider value={themeModeContextValue}>
      <ThemeProvider theme={mergeTheme(theme, { mode: themeMode })}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route
              path="*"
              element={<Home />}
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ThemeModeContext.Provider>
  )
}

export default App
