
export function getIcon(key) {
  switch(key) {
  case 'anger':
    return require('../app/assets/imgs/icons/anger.png');
  case 'happiness':
    return require('../app/assets/imgs/icons/happy.png');
  case 'contempt':
    return require('../app/assets/imgs/icons/contempt.png');
  case 'fear':
    return require('../app/assets/imgs/icons/fear.png');
  case 'sadness':
    return require('../app/assets/imgs/icons/sad.png');
  case 'neutral':
    return require('../app/assets/imgs/icons/neutral.png');
  case 'surprise':
    return require('../app/assets/imgs/icons/surprise.png');
  case 'disgust':
    return require('../app/assets/imgs/icons/disgust.png');
  }
}



