<script>

  import Chapter from "./Chapter.svelte";
import {openai_prompt, diffusion_prompt} from "./fetchers"
  import {hasLocalStorage} from './localStorage.js';
	import { afterUpdate, tick } from 'svelte';

  const FAKE_IT = false
  const FAKE_LOADED_STORY = false

  // let prompt = ""
  // const update_prompt = (e) => {
  //   prompt = e.target.value
  //   console.log("prompt is",prompt)
  // }
  /** User inputs*/
  
  let childNameLocalStorage = hasLocalStorage('CHILD_NAME') ? localStorage.getItem('CHILD_NAME') : '';
  let childAgeLocalStorage = hasLocalStorage('CHILD_AGE') ? localStorage.getItem('CHILD_AGE') : '';

  $: childName = FAKE_IT ? "Ingeborg" : childNameLocalStorage;
  $: childAge = FAKE_IT ? 4 : childAgeLocalStorage;
  $: storyDescription = FAKE_IT ? "møder en delfin der kan spille guitar": "";

  
  let openAiKey = hasLocalStorage('OPENAI_KEY') ? localStorage.getItem('OPENAI_KEY') : '';
  let stableDiffusionKey = hasLocalStorage('STADIFF_KEY') ? localStorage.getItem('STADIFF_KEY') : '';

  $: prompt = `Det følgende er en historie til en ${childAge} årig barn, barnet hedder ${childName}. ${storyDescription}. \n`;

  $: chapters = [];
  
  let loading_story = FAKE_LOADED_STORY ? true : false

	// let render_resultImage = FAKE_LOADED_STORY ? "https://cdn.dribbble.com/users/965441/screenshots/16250331/media/008f2ec9b01f0b3556622bd82a44abe6.jpg?compress=1&resize=1600x1200&vertical=top" : "";
  // let render_resultStory = FAKE_LOADED_STORY ? `Her er en historie` : "";
  
  const generateStory = async () => {
    if(openAiKey) {
      localStorage.setItem('OPENAI_KEY', openAiKey);
    }

    if(stableDiffusionKey) {
      localStorage.setItem('STADIFF_KEY', stableDiffusionKey);
    }

    loading_story = true
    console.log("original prompt: ", prompt)

    let storyResult = await openai_prompt({prompt,fake:FAKE_IT,openAiKey}).catch((err) => {
      alert(err)
    });

    // Ja tak nu hacker vi
    storyResult = storyResult.replaceAll(` "`,`\n\n"`);
    storyResult = storyResult.replaceAll(`" `,`"\n\n`);
    
    console.log("story: ", storyResult)
    loading_story = false
    chapters.push({story:storyResult,prompt})
    chapters = chapters;
    // afterUpdate(() => {
    // });
    setTimeout(() => {
        document.getElementById("chap-"+(chapters.length - 1)).scrollIntoView({behavior:"smooth",block:"start"})
    }, 100);
    // window.scrollTo({ top: document.body.scrollHeight / 2, behavior: 'smooth' })
    console.log(chapters)

    /** Create image */
    const englishOneliner = `${storyResult} \nOne line english summary: `;
    const englishSummary = await openai_prompt({
      prompt:englishOneliner,
      fake:FAKE_IT,
      openAiKey
    }).catch((err) => {
      alert(err)
    });

    console.log("Summary: ", englishSummary);

    const imagePromptText = `${englishSummary} Children's Book Illustration, taylor barron, basia tran`.replace(childName, 'a child');

    console.log(imagePromptText);

    console.log("Image prompt: ", imagePromptText);
    console.log(stableDiffusionKey,openAiKey)
    diffusion_prompt({
      prompt: imagePromptText,
      fake: FAKE_IT,
      stableDiffusionKey
    }).then((url) => {
      /* output */
      // render_resultImage = url;
      chapters = chapters.map((chap,i) => i === chapters.length - 1 ? ({...chap,image:url}) : chap)
    console.log(chapters)

      loading_story = false
    }).catch((err) => {
      alert(err)
    });
  }

  let isVisibleIntroGenerateButton = false;
  const showGenerateStoryButton = () => {
    console.log(1);
    isVisibleIntroGenerateButton = true;
  }

  const introEnd = () => {
    setTimeout(() => {
      document.querySelector('h1').scrollIntoView({behavior:"smooth",block:"start"});
    }, 100);

    $: childName = "";
    $: childAge =  "";
    $: storyDescription = "";

    setTimeout(() => {
      isVisibleIntroGenerateButton = false;
    }, 300);
  }

  window.showGenerateStoryButton = showGenerateStoryButton;
  
  const continueStory = async (e) => {
    const button = e.target;
    
    e.target.children[0].style.display = "none"
    e.target.children[1].style.display = "";
    console.log("previous:",chapters[chapters.length - 1])
    console.log("next prompt",[prompt, ...chapters.map((s) => s.story)].join(" "))
    const continuingStory = await openai_prompt({
      prompt:[prompt, ...chapters.map((s) => s.story)].join(" "),
      fake:FAKE_IT,
      openAiKey
    }).catch((err) => {
      alert(err)
    });

    chapters.push({story:continuingStory})
    chapters = chapters;
    setTimeout(() => {
      document.getElementById("chap-"+(chapters.length - 1)).scrollIntoView({behavior:"smooth",block:"start"})
    }, 100)

    const englishOneliner = `${continuingStory} \nOne line summary: `;
    const englishSummary = await openai_prompt({
      prompt:englishOneliner,
      fake:FAKE_IT,
      openAiKey
    }).catch((err) => {
      alert(err)
    });

    const imagePromptText = `${englishSummary} Children's Book Illustration, taylor barron, basia tran`.replace(childName, 'a child');

    diffusion_prompt({
      prompt: imagePromptText,
      fake: FAKE_IT,
      stableDiffusionKey
    }).then((url) => {
      /* output */
      // render_resultImage = url;
      chapters = chapters.map((chap,i) => i === chapters.length - 1 ? ({...chap,image:url}) : chap)
      // loading_story = false
    }).catch((err) => {
      alert(err)
    });

    button.parentNode.remove()

  }
</script>

<h1 class="text-4xl pt-10 pb-10 text-center p-2">Generer din egen børnebog 📖</h1>

<div class="p-6 text-2xl w-full flex flex-col justify-items-center" id="story-generator" style="margin: 0 auto; max-width: 800px;">
 <div class="flex">
  <div class="flex w-full">
    <div class="grow mr-3"> 
      <p class="">Barnets navn</p>
      <input bind:value={childName} class="input text-secondary-content mb-6 bg-secondary w-full placeholder:text-blue-800 placeholder-black::placeholder  placeholder:text-blue-800" type="text" name="child-name" placeholder="fx. Valdemar" /> 
    </div>
    <div class="grow">
      <p>Barnets alder</p>
      <input class="input text-secondary-content mb-6 bg-secondary w-full placeholder:text-blue-800" bind:value={childAge} name="age" type="text" placeholder="fx. 5" />
    </div>
  </div>
 </div>
    <p>Hvad skal historien handle om?</p>
    <textarea name="story-description" class="textarea block bg-secondary h-10 mb-10 w-full placeholder:text-blue-800" bind:value={storyDescription} id="" placeholder="fx. Historien skal handle om en drage med hat på"></textarea>

    <p>OpenAI kodeord api nøgle. <a class="underline" href="https://github.com/benna100/children-story-generator#f%C3%B8r-du-starter">Guide her</a></p>
    <input class="input text-secondary-content mb-6 bg-secondary w-full placeholder:text-blue-800" bind:value={openAiKey}  type="password" placeholder="" name="openai-key" />

    <p>Stable Diffusion api nøgle. <a class="underline" href="https://github.com/benna100/children-story-generator#f%C3%B8r-du-starter">Guide her</a></p>
    <input class="input text-secondary-content mb-6 bg-secondary w-full placeholder:text-blue-800" bind:value={stableDiffusionKey}  type="password" placeholder="" name="stable-diffusion-key" />
    <!--
    <p>Vi lover ikke at stjæle dine api nøgler 🤞 <br> Du kan selv tjekke koderne <a class="underline" href="https://github.com/benna100/children-story-generator/blob/a13ec322119a5c625af1758658f9ace612c1d134/assets/index.7e304e36.js#L1">her</a> (men de er lidt svære)</p><br>
-->

{#if isVisibleIntroGenerateButton}
<button class="btn btn-primary mt-6 bottom-3 w-60 self-center fixed" on:click={introEnd}>
  Generer din egen historie
</button>
{/if}

  {#if ! loading_story}

  <button id="button-go" class="btn btn-primary mt-6 w-60 self-center" on:click={generateStory}>
    Generer din historie
  </button>
  
  {:else}

  <button class="btn btn-info w-84 self-center mt-6">
    
    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg> Vent venligst... 
    
  </button>
  {/if}
  
  
  <!-- <div class="animate-spin"></div> -->
 
</div>

<!-- {#if render_resultImage} -->
{#if chapters.length > 0}
<div class="divider mb-10">Din historie:</div>
{/if}
<!-- <div class="bg-base-100 flex" style="margin: 0 auto; overflow:auto; min-height:400px; max-width: 800px;">
  <img src="{render_resultImage}" class="w-full sm:w-1/2 ml-2 mr-4 sm:float-right" />
  <p class="text-3xl p-2" style="line-height: 2.5rem; font-size:1.6rem; white-space: break-spaces;">{render_resultStory}</p>
</div> -->


	{#each chapters as chapter, index}
  
  <div class="bg-base-100" style="margin: 0 auto; overflow:auto; min-height:400px; max-width: 800px; border-radius: 8px;" id="chap-{index}">
    <div class="p-10">
    <h2 class="font-bold text-2xl opacity-60">{index + 1}.</h2>
    <p class="pt-4" style="line-height: 2.5rem; font-size:1.5rem; white-space: break-spaces;">{chapter.story}</p>
  </div>
    {#if chapter.image}
    <img src="{chapter.image}" class="object-cover" style="width: calc(100% - 12px); border-radius: 8px; margin: 0 auto;" />
    {:else}
    <div class="flex align-center pt-24 flex-col bg-base-300 rounded text-center" style="height:270px; width: calc(100% - 12px); border-radius: 8px; margin: 0 auto;">
      <svg class="animate-spin -ml-1 mr-3 h-12 w-12 text-primary m-8" style="margin: 0 auto;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <p class="mt-2 opacity-70 font-bold">henter dit billede</p>
</div>
    {/if}  
  </div>
  


<div class="text-center p-8">
  <button class="btn btn-primary w-60 self-center" on:click={continueStory}><span class="pointer-events-none">Fortsæt historien</span><div style="display:none;" class="flex"> <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg> Vent venligst... </div></button>
</div>

		<!-- <li><a target="_blank" href="https://www.youtube.com/watch?v={cat.id}">
			{cat.name}
		</a></li> -->
	{/each}

<!-- {/if} -->