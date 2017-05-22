
export function getIcon(key) {
  switch(key) {
  case 'anger':
    return require('../app/assets/imgs/anger.jpeg');
  case 'happiness':
    return require('../app/assets/imgs/happy.jpeg');
  case 'contempt':
    return require('../app/assets/imgs/contempt.jpeg');
  case 'fear':
    return require('../app/assets/imgs/fear.jpeg');
  case 'sadness':
    return require('../app/assets/imgs/sad.jpeg');
  case 'neutral':
    return require('../app/assets/imgs/neutral.jpeg');
  case 'surprise':
    return require('../app/assets/imgs/surprise.jpeg');
  case 'disgust':
    return require('../app/assets/imgs/disgust.jpeg');
  }
}

export function getBackImage(key) {
  switch(key) {
  case 'Angry':
    return require('../app/assets/imgs/angry.jpg');
  case 'Happy':
    return require('../app/assets/imgs/happy.jpg');
  case 'Contempt':
    return require('../app/assets/imgs/contempt.jpg');
  case 'Scared':
    return require('../app/assets/imgs/fear.jpg');
  case 'Sad':
    return require('../app/assets/imgs/sad.jpg');
  case 'Neutral':
    return require('../app/assets/imgs/neutral.jpg');
  case 'Surprise':
    return require('../app/assets/imgs/surprise.jpg');
  case 'Disgust':
    return require('../app/assets/imgs/disgust.jpg');
  }
}



