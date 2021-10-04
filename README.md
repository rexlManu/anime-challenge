# anime challenge creator

This tool exist to easily create the daily post for anilist with the 100 days challenges.
You can decide which element you want to add easily with the id of the anime

## Stack

Build with tailwind, react and typescript


## Deployment

### Build image

``docker build -t anilist-challenge-creator .``

### Run container

``docker run -d --name anilist-challenge-creator --network proxy --restart=unless-stopped anilist-challenge-creator``