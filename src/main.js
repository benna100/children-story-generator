import './app.css'
import App from './App.svelte'

const app = new App({
  target: document.getElementById('app')
})

const st = document.createElement("script")
st.src = "https://cdn.tailwindcss.com"
document.head.insertAdjacentElement("beforeend",st)
export default app
