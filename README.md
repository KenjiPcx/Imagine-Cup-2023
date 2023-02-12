# Imagine-Cup-2023 Project: Chatnalysis

## Project Details

### Web App Deployed

Web App [here](https://thankful-mushroom-0de6c9303.2.azurestaticapps.net/)

How to use

1. Record a conversation
2. Click on Actions button
3. Choose action
4. Wait
5. Some results are savable (tasks, meeting, topics of interests)

Note: You can provide your topic of interests in the profile page for some personalization

### What is Chatnalysis?

Get more fun and productive with your calls!
And so you don't forget what you were talking about!
</br>

During calls

- Get intent of the caller at any point of the call
- Detect fraudalent content
  - If it is, explains why it is a scam and advice to leave the call
- Detect if its tech support related
  - Show advice and warnings
- Detect if its bank related
  - Show advice and warnings
- (Maybe) Otherwise if it is business oriented
  - Give multiple suggestions on how to answer
  - Analyze what the other user is trying to say in simple English

At the end of the call

- If the call is legit, gives user the choice to
  - Summarizes the contents of the calls so you don't forget
  - Calendar integration
    - Helps schedules any events
    - Helps schedules any todos

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
