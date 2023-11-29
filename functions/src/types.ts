
type LanguageCode = 'af-ZA'|'ar-XA'|'ar-SA'|'bg-BG'|'bn-IN'|'ca-ES'|'cs-CZ'|'en-US'|'en-AU'|'en-IN'|'en-GB'|'en-IE'|'en-ZA'|'fr-FR'|'de-DE'|'el-GR'|'gu-IN'|'hi-IN'|'hu-HU'|'id-ID'|'it-IT'|'ja-JP'|'kn-IN'|'ko-KR'|'ml-IN'|'mr-IN'|'nb-NO'|'pl-PL'|'pt-BR'|'pt-PT'|'ru-RU'|'sk-SK'|'es-ES'|'es-MX'|'sv-SE'|'ta-IN'|'te-IN'|'th-TH'|'tr-TR'|'uk-UA'|'vi-VN'|'zh-CN'|'zh-HK'|'zh-TW';
type TTSInput = {text: string}|{ssml: string}; // | SSML
type TTSVoice = {
  languageCode: string;
  name: string;
}
type TTSAudioConfig = {
  audioEncoding: 'MP3'|'OGG_OPUS'; // ?? just MP3 
  volumeGainDb?: number; // [-96, 16]
  pitch?: number; // [-20, 20]
  speakingRate?: number; // [-0.25, 4.0];
}
// move counting data (e.g. start, end, break) to audio
export interface TTSRequest {
  input: TTSInput;
  audioConfig: TTSAudioConfig;
  voice: TTSVoice;
}
export interface TTSHTTPRequest {
  text: string;
  lang: LanguageCode;
  gender: number;
}