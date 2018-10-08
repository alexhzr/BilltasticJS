![Billtastic Logo](https://i.imgur.com/qMHOlTe.png)

## Overview
This is my final project for the last course I did. It's a bill management application which lets you create your own database filled with products and customers. Then, you can make orders to keep them tracked and order them by status (paid, unpaid, draft). 

There is a live version of my server at OpenShift, and you can download and test the app. Please, check it out! http://billtasticjs-alexhzr.rhcloud.com/

Note: if the server is down and you want to try it, feel free to contact me and I will re-upload the code to the server. OpenShift automatically shuts down projects which remain idle for several days.

## Tools
I used Node.js with Express framework and MongoDB. I thought it would be fun to use some different kind of database and a web app with no view involved, using just JSON to pass the data between the server and the client, and making the client (Android App) handle the view in any way.

The REST communication involves low data use and fast responses.

