import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import productSlice from './redux/productSlice.jsx'
import categorySlice from './redux/categorySlice.jsx'
import cartSlice from './redux/cartSlice.jsx'
import searchSlice from './redux/searchSlice.jsx'

const queryClient = new QueryClient()

const store = configureStore({
  reducer: {
    product: productSlice,
    categoryitems: categorySlice,
    cart: cartSlice,
    search: searchSlice
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
)
