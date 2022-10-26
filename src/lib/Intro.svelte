<script>
    const wait = (ms = 1000) => new Promise((resize, reje) => {setTimeout(resize,ms)})
    function typingEffect(element, speed) {
        //https://codepen.io/azizbooker/pen/wvgqqpZ
        let text = element.value;
        element.value = "";
        var i = 0;
        var timer = setInterval(function () {
          if (i < text.length) {
            element.value = element.value + text.charAt(i);
            i++;
          } else {
            clearInterval(timer);
          }
        }, speed);
      }

      function reveal_the_story({
            name,
            age,
            description
        }) {
          const intro_container = document.getElementById("main")
          intro_container && intro_container.insertAdjacentHTML("afterend",`<div class="bg-base-100" style="margin: 0 auto; overflow:auto; min-height:400px; max-width: 800px; border-radius: 8px;" id="chap-1">
    <div class="p-10">
    <h2 class="font-bold text-2xl opacity-60">1.</h2>
    <p class="pt-4" style="line-height: 2.5rem; font-size:1.5rem; white-space: break-spaces;">${description}</p>
  </div>
  <img src="https://cdn.iconfinder.com/data/family/previews/preview-2x/tuesday.png?1665403976" class="object-cover" style="width: calc(100% - 12px); border-radius: 8px; margin: 0 auto;" />
   
</div>`)
document.getElementById("chap-1").scrollIntoView({behavior:"smooth",block:"start"})

window.showGenerateStoryButton();

      }
     
    async function intro_typing() {
        const form = document.getElementById("story-generator");
        const childNameInput = document.querySelector('input[name=child-name]');
        const ageInput = document.querySelector('input[name=age]')
        const descriptionInput = document.querySelector('textarea[name=story-description]');
        const openAiInput = document.querySelector('textarea[name=openai-key]');
        const stableDiffusionInput = document.querySelector('textarea[name=stable-diffusion-key]');
        console.log(childNameInput)
        const typingSpeed = 150;
        let name = "Ingeborgz";
        childNameInput.value = name
        typingEffect(childNameInput,typingSpeed)

        await wait(typingSpeed * name.length)
 
        let age = 4;
        ageInput.value = age
        typingEffect(ageInput,typingSpeed)

        await wait(225)
        
        let description = `Strisserne kom! bang`;
        descriptionInput.value = description
        typingEffect(descriptionInput,typingSpeed)

        await wait(typingSpeed * description.length)

        document.getElementById("button-go").click()
        
        await wait(500)

        reveal_the_story({
            name,
            age,
            description
        })

        localStorage.setItem('SPLASH_DISPLAYED', "true");        
    }

   function show_the_story_gen() {
    const story_inputter = document.getElementById("story-inputter")

    if (story_inputter) {
        story_inputter.style.opacity = "1"
        story_inputter.scrollIntoView({behavior:"smooth",block:"start"})
        setTimeout(() => {
            document.getElementById("intro-hero").remove()
        },250)
        
        intro_typing()
    }
   }

</script>
<div>
    <div class="hero p-6 bg-base-200 flex flex-col justify-center items-center" style="height:50vh;" id="intro-hero">
        <div class=" flex flex-col justify-center items-center" style="max-width: 500px;">
            <h1 class="text-5xl font-bold text-center" style="line-height: 4rem;">Generer din helt egen børnebog</h1>
            <p class="py-6">Med et navn, en alder og en lille historie, kan du skabe dine helt egne børnehistorier, lige klar til oplæsning</p>
            <button on:click={show_the_story_gen} class="btn btn-primary" style="max-width: 300px;">Vis mig et eksempel</button>
          </div> 
      </div>
    
</div>
