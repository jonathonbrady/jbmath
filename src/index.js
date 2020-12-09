import { configure } from '@testing-library/react'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import store from './store'
import { Provider as ReduxProvider } from 'react-redux'

ReactDOM.render(
    <React.StrictMode>
        <ReduxProvider store={store}>
            <App />
        </ReduxProvider>
    </React.StrictMode>,
    document.getElementById('root'));
