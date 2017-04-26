
module.exports = {

  encoder: function (data) {

        let buffer = atob(data);

        var array = new Uint8Array(new ArrayBuffer(buffer.length));

        for (i = 0; i < buffer.length; i++) {
            array[i] = buffer.charCodeAt(i);
        }

        fetch('https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize?*', {
            method: 'POST',
            body: array,
            headers: {
                'Ocp-Apim-Subscription-Key': '7bea3b94b4434e118e3715da57d8c17f',
                'Content-Type': 'application/octet-stream'
            },
            credentials: 'same-origin',
        })
        .then(function(response) {
          return response.json() })
        .then(function(responseData){
          return responseData; })
          .then((data) => {
            //alert(Global.yes);
            alert("anger : " + data[0].scores.anger);

            /*alert("contempt : " + data[0].scores.contempt);
            alert("disgust : " + data[0].scores.disgust);
            alert("fear : " + data[0].scores.fear);
            alert("happiness : " + data[0].scores.happiness);
            alert("neutral : " + data[0].scores.neutral);
            alert("sadness : " + data[0].scores.sadness);
            alert("surprise : " + data[0].scores.surprise);*/

            //alert(Math.max(data[0].scores.anger, data[0].scores.contempt, data[0].scores.disgust, data[0].scores.fear, data[0].scores.happiness, data[0].scores.neutral, data[0].scores.sadness, data[0].scores.surprise));
           }).catch(function(err) {
              console.log(err);
          })

  }

};
