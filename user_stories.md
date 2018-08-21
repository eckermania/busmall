# H1 Busmall Focus Group
This document contains the user stories for Busmall's focus group site and a record of the development tasks.

# H2 User Stories
* As a focus group participant, I want the instructions on the site to be clear and easy to follow.
* As a focus group participant, I want pictures for my selection to appear automatically after I have completed my prior selection.
* As a focus group participant, I want to see a summary of my voting decisions.
* As a focus group participant, I want the site to be aesthetically pleasing and intuitive to use.
* As a marketing researcher, I want to be able to see a summary of the voting decisions made by focus group participants as a percentage of times an item was selected when it was presented. 
* As a marketing researcher, I want the presentation of images to be random to control for question order bias.
* As a marketing researcher, I want the focus group participants to only have 25 opportunities to vote. 
* As a marketing researcher, I want to provide focus group participants with three images to choose from at a time.


# H2 Sprint 1 Tasks (8/20/18)
1. ~Create a container for all of the images.~
2. ~Create a way to select three random images and display them at the time the page first loads.~
3. Write CSS so images will be displayed side by side and as a reasonable size.
4. Add constraints to the selection of images that prevents duplicates within the set of three and between consecutive sets.
5. Create an event and event listener that will recognize a click and provide a new set of images.
6. Add functionality to the event so that both the number of times the image is shown and the number of times the image is selected are counted.
7. Display a table after 25 rounds have been completed to show the number of times each image was shown and the number & % of times that image was selected.

