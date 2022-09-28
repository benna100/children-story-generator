<script>
  import svelteLogo from './assets/svelte.svg'
  import Counter from './lib/Counter.svelte'
  import Chapter from './lib/Chapter.svelte'

</script>


<main>
  
  <h1 class="text-5xl">Velkommen til Din personlige børnehistorie</h1>

  <div class="card" style="background:purple;">
    <Counter />
  </div>

  <div>
    <Chapter></Chapter>
  </div>
</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
