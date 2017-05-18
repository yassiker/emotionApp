const availableEmotions = [
  { name: 'Angry', key: 'anger' },
  { name: 'Contempt', key: 'contempt' },
  { name: 'Disgust', key: 'disgust' },
  { name: 'Scared', key: 'fear' },
  { name: 'Happy', key: 'happiness' },
  { name: 'Neutral', key: 'neutral' },
  { name: 'Sad', key: 'sadness' },
  { name: 'Surprise', key: 'surprise' },

];

export function getRandomEmotion() {
  return new MotionConfig(availableEmotions[Math.floor(Math.random() * availableEmotions.length)]);
}


class MotionConfig {

  constructor(emotion) {
    this.emotionName = emotion.name;
    this.emotionKey = emotion.key;
  }

  extractEmotionScore(scores) {

    return this.emotionScore = scores[this.emotionKey];
  }
}


