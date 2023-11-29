import { Storage, Bucket, File } from "@google-cloud/storage";
import {Translate} from '@google-cloud/translate/build/src/v2';
import { v1beta1 } from "@google-cloud/text-to-speech";
import {log, error} from 'firebase-functions/logger';
import { languages } from "./languages";
type synthesisReq = Parameters<v1beta1.TextToSpeechClient["synthesizeSpeech"]>[0];

export class TTS_Storage {
  readonly bucketUrl = "gs://rnbovoicefx.appspot.com";
  private storage: Storage;
  private bucket: Bucket;
  public audioFile!: File;
  private tts: v1beta1.TextToSpeechClient;
  private translator: Translate;
  constructor() {
    this.tts = new v1beta1.TextToSpeechClient();
    this.translator = new Translate();
    this.storage = new Storage();
    this.bucket = this.storage.bucket(this.bucketUrl);
    log(`targeting bucket ${this.bucket.name}`);
  }
  lookupVoiceName(langCode: string, isFemale: boolean) {
    let voices = languages[langCode as keyof typeof languages];
    let voice = voices[isFemale ? 'femaleVoice' : 'maleVoice'];
    return `${langCode}-${voice}`;
  }
  async synthesizeSpeech(text: string, lang: string) {
    const filename = this.formatFilename(text, lang);
    try {
        const data = this.formatTTSdata(text, lang);
        log(`writing data: ${data}`);
        const [response] = await this.tts.synthesizeSpeech(data);
        log(`response data: ${response.audioConfig}`);
        const buf = Buffer.from(response?.audioContent ?? '');
        log(`writing speech to file: ${filename}`);
        await this.uploadFile(filename, buf);
        log(`uploaded file: ${filename}`);
} catch (err) {
    error(err);
}
return filename;
}
formatTTSdata(text: string, languageCode: string) {
    const input = {ssml: this.formatSSML(text)};
    const name = this.lookupVoiceName(languageCode, true);
    const voice = {languageCode, name};
    const audioConfig = { 
        "audioEncoding": "MP3",
        "sampleRateHertz": 44100
    };
    return {
        input,
        voice,
        audioConfig
      } as synthesisReq;
}
  async translate(text: string, lang: string) {
    const [translation] = await this.translator.translate(text, lang);
    log(`translated ${text} to ${translation}`);
    return translation;
}
formatSSML(text: string) {
    return `<speak>${text}</speak>`;
  }
  formatFilename(text: string, lang: string) {
    let truncText = text.replace(/\s/g, "_");
    if (truncText.length > 12) {
      truncText = truncText.slice(0, 10) + "...";
    }
   // return `tts_recordings/${lang}_${truncText}.mp3`;
   return `${lang}_${truncText}.mp3`;
  }
  async uploadFile(filename: string, data: Buffer) {
    this.audioFile = this.bucket.file(filename);
    log(`uploading file: ${filename}`);
    await this.audioFile.save(data, { metadata: { contentType: "audio/mp3" } });
  }
}
