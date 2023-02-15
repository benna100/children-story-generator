<script>
  import svelteLogo from './assets/svelte.svg'
  import Counter from './lib/Counter.svelte'
  import Intro from "./lib/Intro.svelte"
  import Chapter from './lib/Chapter.svelte'
  import {hasLocalStorage} from './lib/localStorage.js'; 
</script>

<main class="bg-white" style="min-height:100vh;" id="main">
  {#if !hasLocalStorage('SPLASH_DISPLAYED')}
  <Intro />
  {/if}
  
  <div id="story-inputter" class="pb-12" style="opacity:{!hasLocalStorage('SPLASH_DISPLAYED') ? 0.2 : 1};">
    <Counter />
  </div>
  
</main>
