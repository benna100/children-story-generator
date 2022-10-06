import './app.css'
import App from './App.svelte'

const app = new App({
  target: document.getElementById('app')
})


// const daisyui = document.createElement("link")
// daisyui.href = "https://cdn.jsdelivr.net/npm/daisyui@2.31.0/dist/full.css"
// daisyui.rel = "stylesheet"
// daisyui.type = "text/css"
// document.head.insertAdjacentElement("beforeend",daisyui);

// const tailwind = document.createElement("script")
// tailwind.src = "https://cdn.tailwindcss.com"
// document.head.insertAdjacentElement("beforeend",tailwind);

export default app
