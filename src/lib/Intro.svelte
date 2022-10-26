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

      window.FAKE_DAT_IMAGE = true;
     
    async function intro_typing() {
        // const form = document.getElementById("story-generator");
        const childNameInput = document.querySelector('input[name=child-name]');
        const ageInput = document.querySelector('input[name=age]')
        const descriptionInput = document.querySelector('textarea[name=story-description]');
        const openAiInput = document.querySelector('input[name=openai-key]');
        const stableDiffusionInput = document.querySelector('input[name=stable-diffusion-key]');
        
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


        // console.log("ja tak ",openAiInput)
        // let oak = "1234567890megetlangapitoken";
        // openAiInput.value = oak
        // typingEffect(openAiInput,typingSpeed)

        // await wait(typingSpeed * oak.length)

        // let sdf = "1234567890megetlangapitoken";
        // stableDiffusionInput.value = sdf
        // typingEffect(stableDiffusionInput,typingSpeed)

        // await wait(typingSpeed * sdf.length)

        document.getElementById("button-go").click()
        
        await wait(1000)

        document.getElementById("continue-history").style.display = "none"

        await wait(10);

        window.showGenerateStoryButton();


        setTimeout(() => {
          window.FAKE_DAT_IMAGE = false 
        }, 3000);
        

        // reveal_the_story({
        //     name,
        //     age,
        //     description
        // })
            
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
