import { Howl } from 'howler';

/*
 *  Sound effects are licensed under Creative Commons 0 License
 *  All sources are credited below
 */

// https://freesound.org/people/josepharaoh99/sounds/379339/
import Button1Sound from  './assets/audio/button1.mp3';

// https://freesound.org/people/LimitSnap_Creations/sounds/277673/
import CountdownSound from  './assets/audio/321go.mp3';

// https://freesound.org/people/Iwiploppenisse/sounds/156031/
import ExplosionSound from  './assets/audio/explosion.mp3';

export default {
  button1: new Howl({ src: [Button1Sound] }),
  countdown: new Howl({ src: [CountdownSound] }),
  explosion: new Howl({ src: [ExplosionSound] }),
};
