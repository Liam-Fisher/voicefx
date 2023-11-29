import { onCall} from 'firebase-functions/v2/https';

//import {v1beta1} from '@google-cloud/text-to-speech';
import { TTSHTTPRequest } from './types';
import {TTS_Storage} from './helpers/storage';


//const storage = new Storage();
//const tts = new v1beta1.TextToSpeechClient();
const tts_storage = new TTS_Storage();
exports.onCallTest = onCall(
  {cors: true},
  async (req) => {
      const {lang, text} = req.data as TTSHTTPRequest;
      const translation = await tts_storage.translate(text, lang);
      const filename = await tts_storage.synthesizeSpeech(translation, lang);
      return {translation, filename};
  });

  /* 
exports.accessStorage = onCall(
  {cors: true},
async (req) => {
  try {
    
    log(`received request`);
    const bucket = storage.bucket(`gs://rnbovoicefx.appspot.com`);
    
    log(`targeting bucket ${bucket.name}`);
    const reqData = req.data as TTSHTTPRequest;

    let text = reqData.text.replace(/\s/g, '_');

    if(text.length > 12) {
      text = text.slice(0, 10)+'...'; 
    }
    const filename = `${reqData.lang}_${text}`;
    
    log(`writing file: ${filename}`);
    const file = bucket.file(`testData_${((Date.now())%100000).toPrecision(4)}.mp3`);
    const data = {
      input: {text: reqData.text},
      voice: {languageCode: reqData.lang, name: 'en-US-Wavenet-D'},
      audioConfig: {audioEncoding: 0}
    }
    log(`writing data: ${data}`);
    const [response] = await tts.synthesizeSpeech(data);
    
    log(`response data: ${response.audioConfig}`);
    const buf = Buffer.from(response?.audioContent ?? '');

await file.save(buf, {
      metadata: {
              contentType: "audio/mp3",
      }
  });
    res.status(200).send({text:`audio created`});
  }
   catch (err) {
    res.status(500).send({text: `Error creating file,`});
  }
}); */
  /* 
exports.accessStorage = onRequest(
    {cors: true},
  async (req, res) => {
    try {
      
      log(`received request`);
      const bucket = storage.bucket(`gs://rnbovoicefx.appspot.com`);
      
      log(`targeting bucket ${bucket.name}`);
      const reqData = req.body as TTSHTTPRequest;

      let text = reqData.text.replace(/\s/g, '_');

      if(text.length > 12) {
        text = text.slice(0, 10)+'...'; 
      }
      const filename = `${reqData.lang}_${text}`;
      
      log(`writing file: ${filename}`);
      const file = bucket.file(`testData_${((Date.now())%100000).toPrecision(4)}.mp3`);
      const data = {
        input: {text: reqData.text},
        voice: {languageCode: reqData.lang, name: 'en-US-Wavenet-D'},
        audioConfig: {audioEncoding: 0}
      }
      log(`writing data: ${data}`);
      const [response] = await tts.synthesizeSpeech(data);
      
      log(`response data: ${response.audioConfig}`);
      const buf = Buffer.from(response?.audioContent ?? '');

  await file.save(buf, {
        metadata: {
                contentType: "audio/mp3",
        }
    });
      res.status(200).send({text:`audio created`});
    }
     catch (err) {
      res.status(500).send({text: `Error creating file,`});
    }
  }); */
/* 
exports.createCount = onRequest(
  {cors: true},
  async (req, res) => {
log(`received request`);
    try { 
      const data = req.body.ttsData as TTSRequest;
      const bucket = storage.bucket(`gs://scriptedcounts`);
      // 
      // const filename = `${data.voice.languageCode}_${}`
      const file = bucket.file(`testData_${((Date.now())%100000).toPrecision(4)}.mp3`);
      const [response] = await tts.synthesizeSpeech(data);
      const buf = Buffer.from(response?.audioContent ?? '');

  await file.save(buf, {
        metadata: {
                contentType: "audio/mp3",
        },
    });
      res.status(200).send({text:`audio created`});
    }
     catch (err) {
      res.status(500).send({text: `Error creating file,`});
    }
  }
); */


