# Chatroom-API

## Workings

Each user is asked a name (non sensitive), if it exists already they will need to make one until they have selected a name they havent already selected,
on the right hand side will be a list of all people they may speak with in a random order with a maximum of 10, and a search bar with a chat logo next to it
if someone types a name out (non sensitive) it will connect with that person

every time someone tries to message you you will recieve a notification which will allow you to chat back

Each chat session is saved in a database, and the next time someone tries to use those names they will be able to see all chats previously held by the other
person

## To do

-   how will users know that an account is in use?, sql boolean with 0 & 1
-   will only have an API call for get all users?, users on the other end can decide if they want to filter all logged in users
-   have login to user function, check if it is in use or not
-   upon logging out or quitting browser, log out
-   logged in = 1
-   logged out = 0
-   Add http identifier exception filters
