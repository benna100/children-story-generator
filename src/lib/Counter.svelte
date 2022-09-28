<script>

  let prompt = ""
  const update_prompt = (e) => {
    prompt = e.target.value
    console.log("prompt is",prompt)
  }
  let count = 0;
  let childName = "Inge";
  let childAge = 4;
  let storyDescription = "leger med en banan der har fundet en ballon";

  let story = "Der var engang en prinsesse. ";

const summarizeAndTranslate = async (story) => {
  const summationAndTranslatePrompt = `The following is a translation and a tldr of the following text: ${story} \n Translation and tldr: `
  const imagePrompt = await prompt_request(summationAndTranslatePrompt);
  console.log(imagePrompt);
  fetchImage(imagePrompt);
}

  const generateStory = async () => {
    console.log(childName);
    console.log("hej");
    const prompt = `Det følgende er en historie til en ${childAge} årig pige. Den handler om en pige der hedder ${childName} som ${storyDescription}`;
    story = await prompt_request(prompt);
    summarizeAndTranslate(story);
  }

  const fetchImage = (imagePrompt) => {

    const stadiff = sessionStorage.getItem("STADIFF_KEY") || window.prompt("Enter your api key")
    sessionStorage.setItem("STADIFF_KEY",stadiff)

    const prefixed_prompt = `An image from a childrens book of ${imagePrompt} in the style of Sir John Tenniel `

    const encodedParams = new URLSearchParams();
encodedParams.append("prompt", prefixed_prompt);
encodedParams.append("steps", "50");
encodedParams.append("height", "512");
encodedParams.append("guidance", "7.5");
encodedParams.append("sampler", "k_lms");
encodedParams.append("width", "512");

const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'X-RapidAPI-Key': stadiff,
		'X-RapidAPI-Host': 'dezgo.p.rapidapi.com'
	},
	body: encodedParams
};

fetch('https://dezgo.p.rapidapi.com/text2image', options)
	.then(response => response.blob())
	.then(blob => {
    const url = URL.createObjectURL(blob)
    console.log("got a new url",url)
    const img = document.createElement("img")
    img.src = url
    document.body.insertAdjacentElement("beforebegin",img)
  })
	.catch(err => console.error(err));
  };





  const prompt_request = async (prompt) => {
    const openaiKey = sessionStorage.getItem("OPENAI_KEY") || window.prompt("Enter your api key")
    sessionStorage.setItem("OPENAI_KEY",openaiKey)
    const res = await fetch("https://api.openai.com/v1/completions",{headers:{
    "content-type":"application/json",
    "Authorization": `Bearer ${openaiKey}`,
  },method:"post",body:JSON.stringify({"model": "text-davinci-002", "prompt": prompt, "temperature": 0, "max_tokens": prompt.length * 2})
  })
    const json = await res.json()
    return json.choices[0].text && json.choices[0].text.trim()
  }

  const firstLetterOfResult = story[0];
</script>

<p>Generer en historie om en pige der hedder <input bind:value={childName}  type="text" placeholder="Enter your name" /> som er 
  <input bind:value={childAge}  type="text" placeholder="Enter your age" /> år gammel. Den skal handle om <textarea bind:value={storyDescription} name="" id="" cols="30" rows="10"></textarea></p>

<button on:click={generateStory}>
  Generer din historie
</button>
<p><span class="first-letter">{firstLetterOfResult}</span>{story}</p>

<style>
  .mama {
    filter:invert(1);
  }

  .first-letter {
    font-size: 3rem;
  }
</style>