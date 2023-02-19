# Imagine-Cup-2023 Project: Chatnalysis

## Project Details

### Web App Deployed

Web App [here](https://thankful-mushroom-0de6c9303.2.azurestaticapps.net/)

How to use instructions below

### What is Chatnalysis?

We often forget about what we talk about during a long conversation
Chatnalysis is an app that aims to extract intelligence from conversations and help us get the most value from them
</br>

- Chatnalysis can
  - Summarizes the contents of the calls so you don't forget
  - Extract events
  - Extract todos
  - Extract content of interests
  - Analyze for scam
  - Help for asking for quick definitions or explaination using GPT

## Development

### Project Structure

imagine-cup-2023

- supercall (Solidjs frontend)
- functions-backend

### How to Run

- supercall frontend, I'm using pnpm, its a lot faster and more efficient than npm, [install it here](https://pnpm.io/installation)

```powershell
cd supercall
pnpm install
pnpm start
```

- functions
  just open up the function > index.ts and press `f5` and visual studio code should run it for you

- secrets
  - for call-gpt frontend, create a .env file under the call-gpt folder and fill in `SPEECH_KEY` and `SPEECH_REGION`, these are for our speech service, you'll need to create one yourself, its free
  - for azure functions, create a local.settings.json file (same level with package.json file) under the functions app with this json
  ```
  {
    "IsEncrypted": false,
    "Values": {
      "AzureWebJobsStorage": "",
      "FUNCTIONS_WORKER_RUNTIME": "node",
      "OpenAIApiKey": "API_KEY",
      "CosmosDbEndpoint": "",
      "CosmosDbKey": "",
    },
    "Host": {
      "LocalHttpPort": 7071,
      "CORS": "*",
      "CORSCredentials": false
    }
  }
  ```
  
## How to use
- Here is the home page 
<img src="https://user-images.githubusercontent.com/56083944/219586007-a0e5f526-0555-47e0-b012-5baa0ec08625.png"  width="300" />

- Record a conversation, I've prefilled one here about finance, business and smart glasses
<img src="https://user-images.githubusercontent.com/56083944/219586262-679023fa-1bed-40f3-a242-2289a864f778.png"  width="300" />
<img src="https://user-images.githubusercontent.com/56083944/219586299-cf208892-a4e3-4d18-bd79-c73f686570df.png"  width="300" />

- Click on Actions button, choose an action and wait
<img src="https://user-images.githubusercontent.com/56083944/219587010-289760e0-8b88-4291-a5dc-785575a8ef90.png"  width="300" />

- Extract
  - Summary
  <img src="https://user-images.githubusercontent.com/56083944/219587302-7a3e24c8-d086-49b5-b51e-548dc2bc969a.png"  width="300" />
  
  - Tasks
  <img src="https://user-images.githubusercontent.com/56083944/219587339-484aecbd-0634-4491-b64d-f6bbea3961ee.png"  width="300" />
  <img src="https://user-images.githubusercontent.com/56083944/219587361-823c2bd2-fdc9-4fd7-b4c9-3efeb2ceb306.png"  width="300" />

  - Meetings
  <img src="https://user-images.githubusercontent.com/56083944/219587393-e00ba4fd-288f-4c2f-b6ba-bee8a27ff3c1.png"  width="300" />

  - Analyze for interest
  <img src="https://user-images.githubusercontent.com/56083944/219587433-2cfa0af5-2284-4d8d-b32b-8a77de57706c.png"  width="300" />

  - Extract individual interest
  <img src="https://user-images.githubusercontent.com/56083944/219587455-50ef2cee-a721-4824-8872-c0d384286ce0.png"  width="300" />
  <img src="https://user-images.githubusercontent.com/56083944/219587476-4f2cc3c3-db88-4b09-9cf7-2659b1aa6306.png"  width="300" />

- Save them and see them in your profile's productivity page, need to login first
<img src="https://user-images.githubusercontent.com/56083944/219587777-aa601a19-0706-48e8-bff3-ed0e335245ef.png"  width="300" />
<img src="https://user-images.githubusercontent.com/56083944/219587816-0c3d225a-b701-415f-a68c-e22079c8a8bf.png"  width="300" />
<img src="https://user-images.githubusercontent.com/56083944/219587751-2f4fd05b-1307-40ad-b1dc-94ac8ff3b3e7.png"  width="300" />

- Note: You can provide your topic of interests in the profile page for some personalization 
<img src="https://user-images.githubusercontent.com/56083944/219587647-0e75fa71-1abc-4ebd-b9ff-da262ba8e0a0.png"  width="300" />
