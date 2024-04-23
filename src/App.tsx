/*
--------------------------------------- CHANGE LOG ---------------------------------------
Date(DD/MM/YY)        Author      Version         Remarks
------------------------------------------------------------------------------------------
18/03/2024            Amer Syu     1.0.0           - Base Setup 
*/

// From Lib
import { RouterProvider } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'

//Local Import
import { router } from './assets/navigation/Navigator'
import i18n from './assets/utilities/i18n'
import ApolloClient from './ApolloClient'
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from './assets/styles/theme'

const App: React.FC = () => {


  return (
    <I18nextProvider i18n={i18n}>
      <ApolloClient>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RouterProvider router={router} />
        </ThemeProvider>
      </ApolloClient>
    </I18nextProvider>
  )
}

export default App
