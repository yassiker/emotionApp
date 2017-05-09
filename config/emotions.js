const availableEmotions = [
  { name: 'Angry', key: 'anger' },
  { name: 'Contempt', key: 'contempt' },
  { name: 'Disgust', key: 'disgust' },
  { name: 'Scared', key: 'scared' },
  { name: 'Happy', key: 'happy' },
  { name: 'Neutral', key: 'neutral' },
  { name: 'Sad', key: 'sad' },
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
    this.emotionScore = scores[this.emotionKey];
  }
}

// step 1: from list of available emotions, take one
// step 2: pass it into MotionApi

// step 3: take result from api and add it into motion config
// step 4: pass motion config to result

// step 5: based on received motion config, show the result


