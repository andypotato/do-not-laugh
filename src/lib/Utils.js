export default class Utils {

  static formatTime(value) {

    let hundreds = parseInt((value % 1000) / 10),
         seconds = parseInt((value / 1000) % 60),
         minutes = parseInt((value / (1000*60)) % 60);

    hundreds = (hundreds < 10) ? "0" + hundreds : hundreds;
    minutes  = (minutes < 10)  ? "0" + minutes  : minutes;
    seconds  = (seconds < 10)  ? "0" + seconds  : seconds;

    return minutes + ":" + seconds + "." + hundreds;
  }
}