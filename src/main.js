import App from './App.svelte'
import axios from 'axios'

axios.defaults.baseURL = 'https://app-challenge-api.herokuapp.com'

const app = new App({
  target: document.getElementById('app')
})

export default app
