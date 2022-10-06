<script>

  import {openai_prompt, diffusion_prompt} from "./fetchers"

  const FAKE_IT = false

  // let prompt = ""
  // const update_prompt = (e) => {
  //   prompt = e.target.value
  //   console.log("prompt is",prompt)
  // }

  /** User inputs*/
  let childName = "Ingeborg";
  let childAge = 4;
  let storyDescription = "møder en delfin der kan spille guitar";
  
  let loading_story = false

	let render_resultImage = "";
  let render_resultStory = "";
  
  const generateStory = async () => {
    loading_story = true
    
    const prompt = `Det følgende er en historie til en ${childAge} årig barn, barnet hedder ${childName} som ${storyDescription}. \n`;

      console.log("original prompt: ", prompt)

    const storyResult = await openai_prompt({prompt,fake:FAKE_IT}).catch((err) => {
      alert(err)
    });


    render_resultStory = storyResult.replaceAll(". ",".\n\n");
    
    console.log("story: ", render_resultStory)
    
    const englishOneliner = `${storyResult} \nOne line summary: `;
    const englishSummary = await openai_prompt({
      prompt:englishOneliner,
      fake:FAKE_IT
    }).catch((err) => {
      alert(err)
    });

    console.log("Summary: ", englishSummary);

    const imagePromptText = `${englishSummary} Children's Book Illustration, taylor barron, basia tran`.replace(childName, 'a child');

    console.log(imagePromptText);

    console.log("Image prompt: ", imagePromptText);

    diffusion_prompt({
      prompt: imagePromptText,
      fake: FAKE_IT
    }).then((url) => {
      /* output */
      render_resultImage = url;
      loading_story = false
    }).catch((err) => {
      alert(err)
    });
  }
</script>

<h1 class="text-4xl pt-10 pb-10 text-center p-2">Generer din egen børnebog 📖</h1>

<div class="p-6 text-2xl w-1/2" style="margin: 0 auto;">

  <p class="">Generer en historie om</p>
  <input bind:value={childName} class="h-8 input text-secondary-content mb-6 font-bold  bg-secondary" type="text" placeholder="fx. en pige der hedder..." /> 

  <p>Barnets alder er</p>
  <input class="input w-24 font-bold text-secondary-content font-bold mb-6 bg-secondary" bind:value={childAge}  type="text" placeholder="fx. 5" />

    <p>Den skal handle om </p>
    
    <textarea class="textarea block bg-secondary h-36 mb-10" bind:value={storyDescription} name="" id="" cols="30" rows="10" placeholder="fx. møder en drage med en sjov hat på"></textarea>

  {#if ! loading_story}

  <button class="btn btn-primary" on:click={generateStory}>
    Generer din historie
  </button>
  
  {:else}

  <button class="btn btn-info">
    
    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg> Vent venligst... 
    
  </button>
  {/if}
  
  
  <!-- <div class="animate-spin"></div> -->
 
</div>

{#if render_resultImage}
<div class="divider mb-10">Din historie:</div>
<div class="pb-8 w-1/2" style="margin: 0 auto; overflow:auto; min-height:400px;">
  <img src="{render_resultImage}" width="300" height="300" class="float-right ml-2" />
  <p class="text-3xl p-2" style="line-height: 2.5rem; font-size:1.6rem; white-space: break-spaces;">{render_resultStory}</p>
</div>

{/if}