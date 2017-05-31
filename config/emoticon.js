
export function getIcon(key) {
  switch(key) {
  case 'anger':
    return require('../app/assets/imgs/angry.png');
  case 'happiness':
    return require('../app/assets/imgs/happy.png');
  case 'contempt':
    return require('../app/assets/imgs/contempt.png');
  case 'fear':
    return require('../app/assets/imgs/fear.png');
  case 'sadness':
    return require('../app/assets/imgs/sad.png');
  case 'neutral':
    return require('../app/assets/imgs/neutral.png');
  case 'surprise':
    return require('../app/assets/imgs/surprise.png');
  case 'disgust':
    return require('../app/assets/imgs/disgust.png');
  }
}



