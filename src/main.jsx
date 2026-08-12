import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './state/store'
import { ClerkProvider } from "@clerk/react";
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}>
 <Provider store={store}>
      <App /> 
    </Provider>
    </ClerkProvider>
       
  </StrictMode>
)
