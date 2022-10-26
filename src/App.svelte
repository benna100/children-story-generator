<script>
  import svelteLogo from './assets/svelte.svg'
  import Counter from './lib/Counter.svelte'
  import Intro from "./lib/Intro.svelte"
  import Chapter from './lib/Chapter.svelte'
  import {hasLocalStorage} from './lib/localStorage.js'; 
</script>

<main class="bg-primary" style="min-height:100vh;" id="main">
  <!-- {#if !hasLocalStorage('SPLASH_DISPLAYED')} -->
  <Intro />
  <!-- {/if} -->
  <div id="story-inputter" class="mb-24" style="opacity:0.2;">
    <Counter />
  </div>
  
</main>
