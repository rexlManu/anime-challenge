# anime challenge creator

[![Docker Image](https://badgen.net/badge/icon/docker?icon=docker&label)]([https://https://docker.com/](https://hub.docker.com/r/rexlmanu/anilist-challenge-creator))


This tool exist to easily create the daily post for anilist with the 100 days challenges.
You can decide which element you want to add easily with the id of the anime

## Stack

Build with tailwind, react and typescript

## Deployment

### Build image

``docker build -t anilist-challenge-creator .``

### Push

``docker push rexlmanu/anilist-challenge-creator``

### Run container

``docker run -d --name anilist-challenge-creator --network proxy --restart=unless-stopped rexlmanu/anilist-challenge-creator``