# WebPageInteractiveTutorial

Guide users through complexity of your application via this utility.

![simple_form_presentation (2)](https://user-images.githubusercontent.com/110978681/197809489-a2017ef1-1206-4e47-9ee1-e1e9df146c67.gif)

● Smoth ● Responsive ● Configurable

## Installation
No cdn available yet so just grab a bundle from ```/dist/webpageInteractiveTutorial.js```, make link from your web page, and you are good to go.
## Usage
Basic example:
```js
var tutorial = new WebpageInteractiveTutorial({
    actions: {
        next: {
            use: true,
            text: "Next"
        },
        previous: {
            use: true,
            text: "Previous"
        },
        finish: {
            use: true,
            text: "Complete!"             
        }
    },
    steps: [
        {
            target: document.querySelector("#FirstName"),
            content: "Type your first name here"
        },
        {
            target: document.querySelector("#LastName"),
            content: "Type your last name here"
        }
    ]
});

tutorial.start();
```
A step completion can be made conditional via ```stepEnter```, ```stepExit``` events.
```js
{
    target: btnShare,
    content: "And this is a Share button. Please click here to continue..",
    isNextButtonActive: false,
    stepEnter: function () {
        btnShare.addEventListener("click", btnShareClickEventListener);
    },
    stepExit: function () {
        btnShare.removeEventListener("click", btnShareClickEventListener);
    }
}
```
Use ```setNextActionButtonActive``` to activate next button when a condition is met.
```js
var btnShareClickEventListener = function () {

    //Check your condition here
    
    tutorial.setNextActionButtonActive(true); //Activate on success
};
```
Complete example can be found in ```/examples/complexApp/index.html```.
## Building
```
npm i
npm run build
```
