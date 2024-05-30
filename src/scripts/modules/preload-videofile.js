export default function preloadVideoFile() {
  function loadVideo() {
    var testEl = document.createElement("video"),
        mpeg4, h264, ogg, webm;
    if (testEl.canPlayType) {
        mpeg4 = "" !== testEl.canPlayType('video/mp4; codecs="mp4v.20.8"');
        h264 = "" !== (testEl.canPlayType('video/mp4; codecs="avc1.42E01E"') || testEl.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"'));
        ogg = "" !== testEl.canPlayType('video/ogg; codecs="theora"');
        webm = "" !== testEl.canPlayType('video/webm; codecs="vp8, vorbis"');
    }

    var video = document.createElement("video");
    video.preload = "auto";

    if (ogg) {
        video.src = "https://storage.anon.tg/assets/video/box-opening-mobile.ogg";
        console.log('https://storage.anon.tg/assets/video/box-opening-mobile.ogg');
    } else if (webm) {
        video.src = "https://storage.anon.tg/assets/video/box-opening-mobile.webm";
        console.log('https://storage.anon.tg/assets/video/box-opening-mobile.webm');
    } else if (mpeg4 || h264) {
        video.src = "https://storage.anon.tg/assets/video/box-opening-mobile.mp4";
        console.log('https://storage.anon.tg/assets/video/box-opening-mobile.mp4');
    }

    video.load();

    var video2 = document.createElement("video");
    video2.preload = "auto";

    if (ogg) {
        video2.src = "https://storage.anon.tg/assets/video/box-opening-desctop.ogg";
        console.log('https://storage.anon.tg/assets/video/box-opening-desctop.ogg');
    } else if (webm) {
        video2.src = "https://storage.anon.tg/assets/video/box-opening-desctop.webm";
        console.log('https://storage.anon.tg/assets/video/box-opening-desctop.webm');
    } else if (mpeg4 || h264) {
        video2.src = "https://storage.anon.tg/assets/video/box-opening-desctop.mp4";
        console.log('https://storage.anon.tg/assets/video/box-opening-desctop.mp4');
    }

    video2.load();
}
loadVideo();
}
