# SushiNinja

SushiNinja is a fun single player game for sushi chefs of all ages. Players have three lives and click and drag to swing their blade. The game is built entirely using JavaScript and was inspired by HalfBrick's Fruit Ninja.

[Live Site](http://www.jonathan-tsao.com/SushiNinja)

## Minimum Viable Features
Listed below are the minimum features SushiNinja will have by September 10th, 2017.

1. Sword slices are rendered when the mouse is pressed
1. Images of sushi move based on position updates given a velocity and frame rate
1. Points are awarded for each sushi that comes in contact with sword slices
1. A "menu" and "game-over" screen is able to be rendered to start and restart games

## Technologies, Libraries, APIs
SushiNinja will be written in JavaScript using the following libraries and APIs.

#### p5.js
[p5.js](https://p5js.org/) is a processing library that provides APIs for easy rendering. The library loops through methods at a changeable frame per second rate. I plan to use this library to render animations and changes to the page smoothly.

A subsection of the p5.js library is the p5.sound.js libary. This library utilizes parts of the Web Audio API for users to implement into their projects. I plan to use this subsection of p5 to add sound effects to sword slicing and to the game itself.

## Wireframes

This app will have two pages on a cartoon background canvas, a game introduction page and a game detail page.

The introduction page will describe the objective and controls for the game.

![Introduction Page](/docs/introduction.jpg)

The game detail page will have sushi pieces moving left and right. Lives will be rendered on the top right corner, score will be rendered on the top left corner.

![Image Detail Page](/docs/game_detail.jpg)

## Implementation Timeline

#### Day 1
Setup necessary modules and libraries. Finish working on sword slicing functionality and background rendering.
* Use "Setup" and "Draw" p5 functions to create re-rendering loop
* Setup background
* Develop mouse-click action using p5 methods

#### Day 2
Implement sushi pieces and their movements. Integrate sword slice collision with sushi.
* Begin sushi pieces using ellipses with position and velocity
* Update position based on velocity every frame
* Check sword slice objects position with sushi piece position
* Change sushi pieces to images

#### Day 3
Add game details to create cartoon-like feel. Add music and sound effects using p5.sound.js. Clean up total game and check for bugs.
* Add background and lives to be rendered to canvas
* Use p5.sound.js API to add sounds and music
