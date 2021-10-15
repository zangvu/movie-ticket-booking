export const getYoutubeThumbnail = (url, quality) => {
  if (url) {
    let videoId, thumbnail, result;
    if ((result = url.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/))) {
      videoId = result.pop();
    } else if ((result = url.match(/youtu.be\/(.{11})/))) {
      videoId = result.pop();
    }

    if (videoId) {
      if (typeof quality == 'undefined') {
        quality = 'high';
      }

      var qualityKey = 'maxresdefault'; // Max quality
      if (quality === 'low') {
        qualityKey = 'sddefault';
      } else if (quality === 'medium') {
        qualityKey = 'mqdefault';
      } else if (quality === 'high') {
        qualityKey = 'hqdefault';
      }

      thumbnail =
        'http://img.youtube.com/vi/' + videoId + '/' + qualityKey + '.jpg';
      return thumbnail;
    }
  }
  return false;
};
