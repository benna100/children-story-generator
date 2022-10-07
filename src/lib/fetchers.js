export async function openai_prompt({prompt,fake}) {
  
  if (fake) {
    return "Ingeborg møder en delfin der kan spille guitar. Delfinen spiller en melodi, og Ingeborg synes, at det er den smukkeste musik, hun nogensinde har hørt. Hun spørger delfinen, om den kan lære hende at spille guitar. Delfinen svarer, at det kan den godt. Så Ingeborg og delfinen begynder at spille guitar sammen. Og Ingeborg synes, at det er så sjovt, at hun aldrig vil stoppe igen."
  }

    const openaiKey = !! sessionStorage.getItem("OPENAI_KEY")
      ? sessionStorage.getItem("OPENAI_KEY")
      : window.prompt("Enter your OpenAI api key");

  sessionStorage.setItem("OPENAI_KEY", openaiKey);

  const res = await fetch("https://api.openai.com/v1/completions", {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${openaiKey}`,
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

  const stadiff =
    (sessionStorage.getItem("STADIFF_KEY") && sessionStorage.getItem("STADIFF_KEY") !== "") ||
    window.prompt("Enter your Stable Diffusion api key");
  
  sessionStorage.setItem("STADIFF_KEY", stadiff);

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
      "X-RapidAPI-Key": stadiff,
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
