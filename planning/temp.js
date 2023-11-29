const { readFileSync, writeFileSync } = require('fs');
const { cwd } =  require('process');
const { join } =  require('path');
const languages = {
  "ar-XA": {
    "femaleVoice": "Wavenet-D",
    "maleVoice": "Wavenet-C"
  },
  "bn-IN": {
    "femaleVoice": "Wavenet-A",
    "maleVoice": "Wavenet-B"
  },
  "da-DK": {
    "femaleVoice": "Neural2-D",
    "maleVoice": "Wavenet-C"
  },
  "nl-BE": {
    "femaleVoice": "Wavenet-A",
    "maleVoice": "Wavenet-B"
  },
  "nl-NL": {
    "femaleVoice": "Wavenet-E",
    "maleVoice": "Wavenet-C"
  },
  "en-AU": {
    "femaleVoice": "Neural2-C",
    "maleVoice": "Neural2-B"
  },
  "en-GB": {
    "femaleVoice": "Neural2-F",
    "maleVoice": "Neural2-D"
  },
  "en-IN": {
    "femaleVoice": "Wavenet-A",
    "maleVoice": "Wavenet-C"
  },
  "en-US": {
    "femaleVoice": "Neural2-H",
    "maleVoice": "Polyglot-1"
  },
  "es-ES": {
    "femaleVoice": "Neural2-E",
    "maleVoice": "Polyglot-1"
  },
  "es-US": {
    "femaleVoice": "Neural2-A",
    "maleVoice": "Polyglot-1"
  },
  "fil-PH": {
    "femaleVoice": "Neural2-A",
    "maleVoice": "Neural2-D"
  },
  "fr-CA": {
    "femaleVoice": "Neural2-C",
    "maleVoice": "Neural2-D"
  },
  "fr-FR": {
    "femaleVoice": "Neural2-E",
    "maleVoice": "Polyglot-1"
  },
  "de-DE": {
    "femaleVoice": "Neural2-F",
    "maleVoice": "Polyglot-1"
  },
  "gu-IN": {
    "femaleVoice": "Wavenet-A",
    "maleVoice": "Wavenet-B"
  },
  "he-IL": {
    "femaleVoice": "Wavenet-C",
    "maleVoice": "Wavenet-B"
  },
  "hi-IN": {
    "femaleVoice": "Neural2-D",
    "maleVoice": "Neural2-C"
  },
  "id-ID": {
    "femaleVoice": "Wavenet-A",
    "maleVoice": "Wavenet-C"
  },
  "it-IT": {
    "femaleVoice": "Neural2-A",
    "maleVoice": "Neural2-C"
  },
  "ja-JP": {
    "femaleVoice": "Neural2-B",
    "maleVoice": "Neural2-D"
  },
  "kn-IN": {
    "femaleVoice": "Wavenet-A",
    "maleVoice": "Wavenet-B"
  },
  "ko-KR": {
    "femaleVoice": "Neural2-B",
    "maleVoice": "Neural2-C"
  },
  "ms-MY": {
    "femaleVoice": "Wavenet-C",
    "maleVoice": "Wavenet-D"
  },
  "ml-IN": {
    "femaleVoice": "Wavenet-C",
    "maleVoice": "Wavenet-D"
  },
  "cmn-CN": {
    "femaleVoice": "Wavenet-D",
    "maleVoice": "Wavenet-C"
  },
  "cmn-TW": {
    "femaleVoice": "Wavenet-A",
    "maleVoice": "Wavenet-C"
  },
  "mr-IN": {
    "femaleVoice": "Wavenet-C",
    "maleVoice": "Wavenet-B"
  },
  "nb-NO": {
    "femaleVoice": "Wavenet-E",
    "maleVoice": "Wavenet-D"
  },
  "pl-PL": {
    "femaleVoice": "Wavenet-D",
    "maleVoice": "Wavenet-C"
  },
  "pt-BR": {
    "femaleVoice": "Neural2-C",
    "maleVoice": "Neural2-B"
  },
  "pt-PT": {
    "femaleVoice": "Wavenet-D",
    "maleVoice": "Wavenet-C"
  },
  "pa-IN": {
    "femaleVoice": "Wavenet-C",
    "maleVoice": "Wavenet-D"
  },
  "ru-RU": {
    "femaleVoice": "Wavenet-C",
    "maleVoice": "Wavenet-D"
  },
  "sv-SE": {
    "femaleVoice": "Wavenet-A",
    "maleVoice": "Wavenet-E"
  },
  "ta-IN": {
    "femaleVoice": "Wavenet-C",
    "maleVoice": "Wavenet-D"
  },
  "te-IN": {
    "femaleVoice": "Standard-A",
    "maleVoice": "Standard-B"
  },
  "tr-TR": {
    "femaleVoice": "Wavenet-A",
    "maleVoice": "Wavenet-E"
  },
  "vi-VN": {
    "femaleVoice": "Neural2-A",
    "maleVoice": "Neural2-D"
  },
  "yue-HK": {
    "femaleVoice": "Standard-C",
    "maleVoice": "Standard-D"
  }
}

// Read the JSON file
const readJsonFile = (filePath) => {
  try {
    const jsonData = readFileSync(filePath, 'utf-8');
    return JSON.parse(jsonData);
  } catch (error) {
    console.error('Error reading JSON file:', error);
    return null;
  }
};

// Write to a new JSON file
const writeJsonFile = (filePath, data) => {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    writeFileSync(filePath, jsonData, 'utf-8');
    console.log('JSON file written successfully!');
  } catch (error) {
    console.error('Error writing JSON file:', error);
  }
};

// Example usage
const outputFilePath = join(cwd(), 'languageFile.html');



let htmlFile = `<select>`;
    for (const item in languages) {
        htmlFile += `<option value="${item}">${item}</option>`;
    }
    htmlFile += `</select>`;
    writeFileSync(outputFilePath, htmlFile, 'utf-8');



