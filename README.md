# Do not laugh
A simple AI game experiment which shows how to integrate TensorFlow.js based [face-api.js](https://github.com/justadudewhohacks/face-api.js "face-api.js") inside a Vue.js / Electron application. You can read the full story in the [related development article on Medium](https://medium.com/@andreas.schallwig/do-not-laugh-a-simple-ai-powered-game-3e22ad0f8166?sk=d57f3cdaf45188a24110a02c48a5cbaa "Medium article").


## How to run
- Clone or download the repository
- Install all dependencies with `npm i`
- Download the required model files [from here](https://github.com/justadudewhohacks/face-api.js/tree/master/weights "from here") and put them into the `/public/data/weights` folder
- Build the application with `npm run electron:build`

## Credits
All media assets (video, sounds) are licensed under the Creative Commons license according to the sources where I found them.
- [Funny cat video on YouTube](https://www.youtube.com/watch?v=kcQi16Te4CY&t=178s "Funny cat video")
- Sounds from various contributors on [FreeSound.org](https://freesound.org/ "FreeSound.org") (see src/sounds.js for detailed credits)
