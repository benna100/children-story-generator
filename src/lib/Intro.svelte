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
        
        const typingSpeed = 100;
        let name = "Ingeborg";
        childNameInput.value = name
        typingEffect(childNameInput,typingSpeed)

        await wait(typingSpeed * name.length)

        let age = 4;
        ageInput.value = age
        typingEffect(ageInput,typingSpeed)

        await wait(225)
        
        let description = `Ingeborg møder en delfin der kan spille guitar...`;
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

        // document.getElementById("button-go").click()


        const FAKE_STORY = `<div id="generated-story"><div class="divider mb-10">Din historie:</div> <div class="bg-base-100" style="margin: 0px auto; overflow: auto; min-height: 400px; max-width: 800px; border-radius: 8px;" id="chap-0"><div class="p-10"><h2 class="font-bold text-2xl opacity-60">1.</h2> <p class="pt-4" style="line-height: 2.5rem; font-size: 1.5rem; white-space: break-spaces;">Delfinen svarer:

"Ja, det kan jeg godt. Men det kræver, at du lærer mig et par ting om guitar først."


Ingeborg er meget glad for at have mødt den søde delfin, og de to bliver hurtigt venner. Delfinen lærer Ingeborg at spille guitar, og Ingeborg lærer delfinen nogle tricks til at spille bedre. 
De to bliver snart rigtig gode venner, og de spiller ofte guitar sammen. De har det så sjovt, at de aldrig vil skilles igen.</p></div> <img src="https://media.discordapp.net/attachments/903695121810346076/1034949174497648672/DALLE_2022-10-26_23.58.15_-_An_illustration_of_a_child_that_meets_a_dolphin_that_can_play_guitar_Childrens_Book_Illustration_taylor_barron_basia_tran.png" class="object-cover" style="width: calc(100% - 12px); border-radius: 8px; margin: 0px auto;"></div><div class="flex justify-center"><a class="btn btn-primary mt-6 w-60 self-center" href="/">Generer din historie</a></div>`

document.getElementById("generated-story").innerHTML =  FAKE_STORY
document.getElementById("generated-story").scrollIntoView({behavior:"smooth"})

        
        // await wait(1000)

        // document.getElementById("continue-history").style.display = "none"

        // await wait(10);

        // window.showGenerateStoryButton();


        // setTimeout(() => {
        //   window.FAKE_DAT_IMAGE = false 
        // }, 3000);
        

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
