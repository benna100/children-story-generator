export async function openai_prompt({prompt,fake}) {
  
  if (fake) {
    return "Ingeborg møder en delfin der kan spille guitar. Delfinen spiller en melodi, og Ingeborg synes, at det er den smukkeste musik, hun nogensinde har hørt. Hun spørger delfinen, om den kan lære hende at spille guitar. Delfinen svarer, at det kan den godt. Så Ingeborg og delfinen begynder at spille guitar sammen. Og Ingeborg synes, at det er så sjovt, at hun aldrig vil stoppe igen."
  }

  let openAiSessionStorage = sessionStorage.getItem("OPENAI_KEY")
  const doesSessionStorageExist = openAiSessionStorage && openAiSessionStorage !== "null" && openAiSessionStorage !== ""
  if(!doesSessionStorageExist) {
    const keyFromPrompt = window.prompt("Enter your OpenAI api key");
    if(keyFromPrompt) {
      sessionStorage.setItem("OPENAI_KEY", keyFromPrompt);
      openAiSessionStorage = keyFromPrompt;
    } else {
      alert('Please input a prompt');
      
      window.location.reload();
      
    }
  }

  const res = await fetch("https://api.openai.com/v1/completions", {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${openAiSessionStorage}`,
    },
    method: "post",
    body: JSON.stringify({
      model: "text-davinci-002",
      prompt: prompt,
      temperature: 0,
      max_tokens: prompt.length * 4,
    }),
  });
  const json = await res.json();
  console.log(json)
  // what does it return?
  return json.choices[0].text && json.choices[0].text.trim();
};

export async function diffusion_prompt({prompt,prefix="",suffix="",fake}) {
    return new Promise((rese,reje) => {

      if (fake) {
        return rese("https://daisyui.com/tailwind-css-component-card-1.jpg")
      }

console.log(sessionStorage.getItem("STADIFF_KEY"));
      

  // const stadiff =
  //   (sessionStorage.getItem("STADIFF_KEY") && sessionStorage.getItem("STADIFF_KEY") !== "null" && sessionStorage.getItem("STADIFF_KEY") !== "true") ||
  //   window.prompt("Enter your Stable Diffusion api key");
  
  //   if()
  // sessionStorage.setItem("STADIFF_KEY", stadiff);

  let stableDiffusionSessionStorage = sessionStorage.getItem("STADIFF_KEY")
  const doesSessionStorageExist = stableDiffusionSessionStorage && stableDiffusionSessionStorage !== "null" && stableDiffusionSessionStorage !== ""
  if(!doesSessionStorageExist) {
    const keyFromPrompt = window.prompt("Enter your stable diffusion api key");
    if(keyFromPrompt) {
      sessionStorage.setItem("STADIFF_KEY", keyFromPrompt);
      stableDiffusionSessionStorage = keyFromPrompt;
    } else {
      alert('Please input a prompt');
      window.location.reload();
    }
  }

//   const prefixed_prompt = `An image from a childrens book of ${prompt} in the style of Sir John Tenniel `;
// const final_prompt = [prefix,prompt,suffix].join(" ")
// const final_prompt = prompt

  const encodedParams = new URLSearchParams();
  encodedParams.append("prompt", prompt);
  encodedParams.append("steps", "50");
  encodedParams.append("height", "512");
  encodedParams.append("guidance", "7.5");
  encodedParams.append("sampler", "k_lms");
  encodedParams.append("width", "512");
  

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": stableDiffusionSessionStorage,
      "X-RapidAPI-Host": "dezgo.p.rapidapi.com",
    },
    body: encodedParams,
  };


      fetch("https://dezgo.p.rapidapi.com/text2image", options)
        .then((response) => response.blob())
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          console.log("got a new url", url);
          rese(url)
        //   const img = document.createElement("img");
        //   img.src = url;
        //   document.body.insertAdjacentElement("beforebegin", img);
        })
        .catch((err) => {
            console.error(err);  reje(err)
        });
        
  })

};
