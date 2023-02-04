# Imagine-Cup-2023 Project: Callnalysis

## Project Details

### What is Callnalysis?

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
- call-gpt 
  - src (Astro frontend but with solidjs components, [check here for integrating React](https://docs.astro.build/en/core-concepts/framework-components/) if you don't want to use solid )
- openai-completion (our Azure functions project, should rename this to backend/functions)
  - completion (function for gpt completion api)
  - saveCall (function to save call)

### How to Run
- call-gpt frontend, I'm using pnpm, its a lot faster and more efficient than npm, [install it here](https://pnpm.io/installation)
```powershell
cd call-gpt
pnpm install
pnpm start
```

- functions
just open up the function > index.ts and press ```f5``` and visual studio code should run it for you

- secrets
  - for call-gpt frontend, create a .env file under the call-gpt folder and fill in ```SPEECH_KEY``` and ```SPEECH_REGION```, these are for our speech service, you'll need to create one yourself, its free
  - for azure functions, create a local.settings.json file (same level with package.json file) under the functions app with this json
  ```
  {
    "IsEncrypted": false,
    "Values": {
      "AzureWebJobsStorage": "",
      "FUNCTIONS_WORKER_RUNTIME": "node",
      "OpenAIApiKey": "API_KEY"
    },
    "Host": {
      "LocalHttpPort": 7071,
      "CORS": "*",
      "CORSCredentials": false
    }
  }
  ```
