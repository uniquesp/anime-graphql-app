import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client'

const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_URI,
  cache: new InMemoryCache(),
})


createRoot(document.getElementById('root')).render(
 <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  
)
