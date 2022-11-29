export async function openai_prompt({ prompt, fake, openAiKey }) {
  if (fake) {
    return `Ingeborg møder en delfin der kan spille guitar. Delfinen spiller en melodi, og Ingeborg synes, at det er den smukkeste musik, hun nogensinde har hørt. 
    Hun spørger delfinen, om den kan lære hende at spille guitar. 
    Delfinen svarer, at det kan den godt. Så Ingeborg og delfinen begynder at spille guitar sammen. Og Ingeborg synes, at det er så sjovt, at hun aldrig vil stoppe igen.`;
  }

  const res = await fetch("https://api.openai.com/v1/completions", {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${openAiKey}`,
    },
    method: "post",
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.5,
      presence_penalty: 0.75,
      frequency_penalty: 0.25,
      max_tokens: 500,
      // max_tokens: prompt.length * 6,
    }),
  });
  const json = await res.json();
  console.log(json);
  // what does it return?
  if (json && Array.isArray(json.choices)) {
    return json.choices[0].text && json.choices[0].text.trim();
  }
  return false;
  return `Ingeborg møder en delfin der kan spille guitar. Delfinen spiller en melodi, og Ingeborg synes, at det er den smukkeste musik, hun nogensinde har hørt. 
  Hun spørger delfinen, om den kan lære hende at spille guitar. 
  Delfinen svarer, at det kan den godt. Så Ingeborg og delfinen begynder at spille guitar sammen. Og Ingeborg synes, at det er så sjovt, at hun aldrig vil stoppe igen.`;
}

export async function diffusion_prompt({
  prompt,
  prefix = "",
  suffix = "",
  fake,
  openAiKey,
}) {
  return new Promise((rese, reje) => {
    if (fake) {
      return setTimeout(() => {
        console.log("2");
        rese(
          "https://cdn.dribbble.com/users/965441/screenshots/16233874/media/ac1494cf02cfce24c2e864bce1c2136a.jpg?compress=1&resize=1600x1200&vertical=top"
        );
      }, 500);
    }

    if (window.FAKE_DAT_IMAGE) {
      rese(
        "https://media.discordapp.net/attachments/903695121810346076/1034949174497648672/DALLE_2022-10-26_23.58.15_-_An_illustration_of_a_child_that_meets_a_dolphin_that_can_play_guitar_Childrens_Book_Illustration_taylor_barron_basia_tran.png"
      );
    }

    fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + openAiKey,
      },
      body: JSON.stringify({ prompt, n: 1, size: "512x512" }),
    })
      .then((r) => r.json())
      .then((r) => {
        //response_format:"b64_json"
        rese(r.data[0].url);
      })
      .catch((err) => {
        reje(err);
      });

    //   const encodedParams = new URLSearchParams();
    //   encodedParams.append("prompt", prompt);
    //   encodedParams.append("steps", "50");
    //   encodedParams.append("height", "512");
    //   encodedParams.append("guidance", "7.5");
    //   encodedParams.append("sampler", "k_lms");
    //   encodedParams.append("width", "512");

    //   const options = {
    //     method: "POST",
    //     headers: {
    //       "content-type": "application/x-www-form-urlencoded",
    //       "X-RapidAPI-Key": stableDiffusionKey,
    //       "X-RapidAPI-Host": "dezgo.p.rapidapi.com",
    //     },
    //     body: encodedParams,
    //   };

    //   fetch("https://dezgo.p.rapidapi.com/text2image", options)
    //     .then((response) => response.blob())
    //     .then((blob) => {
    //       const url = URL.createObjectURL(blob);
    //       console.log("got a new url", url);
    //       rese(url)
    //     //   const img = document.createElement("img");
    //     //   img.src = url;
    //     //   document.body.insertAdjacentElement("beforebegin", img);
    //     })
    //     .catch((err) => {
    //         console.error(err);

    //         reje(err)
    //     });
  });
}
