import { Howl } from 'howler';

import Button1Sound from  './assets/audio/button1.mp3';
import CountdownSound from  './assets/audio/321go.mp3';
import ExplosionSound from  './assets/audio/explosion.mp3';

export default {
  button1: new Howl({ src: [Button1Sound] }),
  countdown: new Howl({ src: [CountdownSound] }),
  explosion: new Howl({ src: [ExplosionSound] }),
};
