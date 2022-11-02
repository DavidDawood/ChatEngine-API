# Chatroom-API

## Description

The backend of a full front end and backend nestJS which allows users to view previous chats made by other anonymous users, think omegle but more public, more details and previews on the front-end API GIT README

## Skills and technologies used

-   React
-   NestJS
-   Typescript
-   Javascript
-   MySQL

## Setup

-   Simply use the following commands
    To install, be sure to cd into the second ChatEngine-API tree, the one containing all the actual files

### NOTE

-   If you would like to change the link or port for whatever reason, you may do so in the main.ts file in the src folder, change the number parameter inside of

```
await app.listen(3000);
```

```
npm install
```

-   After you installed it, be sure to also create an .env file while using the exampleENV as a template to link it to your own mySQL, this is a neccessary step

-   To run the page, also cd'ed into the second ChatEngine-API tree

```
npm run start
```

## Developer Notes

-   As this is merely the backend, two instances must be made before being able to use the website, i have decided not to upload it to a cloud hosting software as i find not very useful to do only for a short while on such a useless project rather than have a more profitable application run full time.
-   In terms of complexity, this was a fun challange to do as i am both balancing side projects as well as coding challanges at the same time, this also was a good was to fine tune my skills when it comes to MySQL and nestJS

## Inner workings

![dataStructure](/images/dataStructure.png)

-   structuring follows basic processes, a controller which use the access points to the front end while the services deal with all the nitty gritty work with the repository and logic

## Possible future updates

-   I would like to eventually make this go public as it is a project i had alot of fun with and learnt a tone too, so with possibly more work into it i will open it to a cloud hosting service, or possibly run it on a local server
-   Some other features i would like to add are the following
-   File uploading / images
-   Video sharing / camera video feed
-   Coop games for small online minigames
