# React Slots

This project was created using React with TypeScript. My reason for choosing React is that it is both simple to use, and is the best framework for front-end applications that are stateful. I decided to add TypeScript in as I am more familiar with it than Flow, due to having worked with Angular, which would have been too bloated for an application this small.

For requesting results from the server, I've gone with Node's built in fetch, plus a small plugin to parse the XML into an Object. For the request body I use an inline template, although for an application with different types of requests it would be ideal to use an XML builder.

The images I'm using are SVG's so that they automatically scale for all screen sizes. By using Bootstrap as the CSS framework I could leverage it's responsive layouts, meaning the application works on all devices, although with minor design flaws.


## Running the application

To run the application, make sure the API server is running using Docker, and then simply run:

```sh
yarn start
```

or

```sh
npm start
```