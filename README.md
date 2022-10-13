# Personlige børnebøger

## Setup

To run using Visual Studio Liver Server run `node server.mjs`

To run personally run `npm run dev`

To deploy to github pages run `npm run deploy`

## Keys

You need two keys to run this project:

1. OpenAI token to generate text: Go to [here](https://beta.openai.com/account/api-keys) and click the `Copy` button
2. Stable Diffusion token to generate images from text: Go to [here](https://rapidapi.com/developer/security/default-application_6713076) or into the security of your app

To get an OpenAi token go to [here](https://beta.openai.com/overview)

To get a stable diffusion token go to [here](https://rapidapi.com/dezgo/api/dezgo)


## Før du starter

For at bruge denne applikation skal du oprette to kodeord. 

1. Det ene kodeord bruger vi til at generere teksten på børnebogen
2. Det andet kodeord bruger vi til at generere billeder til teksten

### OpenAI kodeord

For at få OpenAI kodeordet skal du oprette en bruger her: [https://openai.com/api/](https://openai.com/api/). Når den er oprettet skal du gå ind på [denne side](https://beta.openai.com/account/api-keys) og vælge `Create new secret key`. Det er kodeordet til OpenAI. Hold kodeordet hemmeligt!

### Stable Diffusion kodeord
For at få kodeordet til at oprette billeder skal du oprette en ny bruger [her](https://rapidapi.com/dezgo/api/dezgo). Derefter skal man subscribe til [api'et](https://rapidapi.com/dezgo/api/dezgo). 

Når man har subscribed skal [man gå oversigten](https://rapidapi.com/developer/apps) over ens apps. Klikke på `Security` og hvor der står `Key` det er ens kode ord. Puha for en omgang