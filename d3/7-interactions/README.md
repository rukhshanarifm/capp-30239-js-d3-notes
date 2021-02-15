# HW3 Makeover Monday

In this assignment you will engage in the age old practice of redesign. Eminent design commenter/author Don Norman says in his most famous work, the Design of Everyday Things, that while it might be tempting as designers to just criticize endlessly, it is far better to offer a solution with your criticism. In this assignment you will provide a short criticism of an extant visualization as well as redesign of it.

In particular we will draw from the popular redesign community Make over monday. To begin go to https://www.makeovermonday.co.uk/data/ and find a data set or visualization you are interested in or a visualization you really hate. Once you've found something you like download the data from data.world. The data will probably be well formatted. Put the file in the data/ folder and you'll be ready to roll. (Don't pick something with a huge amount of data, or something that's super messy, you want to spend your time visualizing, not data wrangling).


1. Find the original visualization. Write a short commentary on why it is an ineffective visualization. Think about the theories discussed earlier in the course, and draw upon your own embodied experience of viewing the visualization. This shouldn't be long; 300 words would be fine. This should be in the criticism.md file.

2. Design and implement your redesign. You will do this through programming in d3. To facilitate this construction we've provided the scaffold of a modern web app (see below section of scaffold). 



_tip_: I find that it can help to sketch on paper before starting. You could also do a little exploratory analysis by plopping the data set into whatever analysis program you might be comfortable with. Perhaps a jupyter notebook? Maybe google sheets or excel? Maybe even tableau? All are find options, but you should use the one you already know how to work. This pre-design step can be really helpful, as d3 charts are often somewhat involved to make, it can save you a lot of heartache to test a design in an environment that does a lot of the work for you. Famous physicist Richard Feynmann was fond of saying "never do a calculation before you know the answer". Sketching and exploratory analysis allow you to know if something will work without the commitment of using a heavy weight tool like d3. 

## Scaffold

In this folder I've provided an example project that enables you to use modern javascript tooling with as little effort as possible. This scaffold includes

- a dev server that combines javascript modules and presents them to the browser. This comes with auto-reload for free! It's great.
- It also includes linters and auto-formaters so you'll be able to check if your writing well styled javascript code. I have some pretty strong linting in here, which I like but maybe you don't.

##  DON'T CHECK IN NODE_MODULES

### Getting things running

As always, have npm/node/yarn installed.

```sh
npm install
# then
npm run start

# or if yarn-ing
yarn
# then
yarn start
```


You will still need to be explicit about your imports, eg
```js
import {functionFromModule} from 'target-module';
```

In this scaffold I have not installed any d3 packages. Some helpful ones (read the ones I usually end up using) are d3-selection, d3-scale, and d3-shape. To add one of these packages just do

```sh
npm install --save packageName

# or if yarning
yarn add packageName
```

You can then use those packages inside of js files via import statements at the top of the file you want to use. For instance

```js
import {scaleLinear} from 'd3-scale';
```

## Develop your vis

Develop occurs in the src/ directory. You can probably write your whole vis inside of the app.js file, however it can be help to separate out repeated functions into utils and the like. Do so as you wish. You are welcome to change index.html and main.css as you see fit. 


## (Optional) Deploying to the web. 

There is an infinity of different ways one might jam a website into the internet. There are two especially easy ways to deploy single-page apps, such as the one described in this scaffold, onto the internet.  

### Netlify

Netlify is an excellent company that tries to make the dev process as easy as possible. The way you deploy this scaffold there is get an account, start a new project, point it to the relevant github folder (that contains just this scaffold!), set the build command to be 'yarn build' and that's it. I believe there is also a way to just upload a zip of a folder you want to deploy, but I am less familiar with that route, see their documentation if that interests you.


### GH Pages

gh-pages is a wonderful resource for doing web-development, and allows you to have classy YOU_PERSONAL_DOMAIN/projectName type links. You can deploy this scaffold there by running 'yarn build' in your command line, committing the modified file, and push to github. If you've configured your projects settings correct it should all just work out. 

An important gotcha: if you want to have a project page, you need to have set up a personal site. For instance I have a site mcnuttandrew.github.io which has basic resume type information about me. All of my other projects then live on urls off of this mcnuttandrew.github.io/forum-explorer and the like. Your personal page doesn't have to be fancy or complicated, it can say "placeholder" or be a picture of a dog with sunglasses, anything gets the job done. If you don't have a personal site then your project page will be treated as your personal site, which will make the link unstable, should you ever decided to have a personal site. Not the end of the world just annoying.




## Grading

Unlike in the previous assignment, (code) style is a matter of taste. The scaffold comes with a linter and prettier, but it's up to you if you want to use them (i think you should, as it makes it easier to write better code, but thats just my opinion). 

Your grade will be based on 

- Whether your criticism is valid
- Whether your redesign works when we look at it
- Whether your redesign uses d3
- Whether your redesign addresses those criticisms

This is an opportunity to try out new things and make interesting visualizations. Opportunities like this are a good way to challenge yourself and develop as a designer, as well as a technologist. However, you don't have to take that challenge! You are welcome to be conservative and to make meat and potatoes visualization if it gets the job done. 




##  DON'T CHECK IN NODE_MODULES