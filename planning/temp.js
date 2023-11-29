const { readFileSync, writeFileSync } = require('fs');
const { cwd } =  require('process');
const { join } =  require('path');
const { request } = require('http');

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
const inputFilePath = join(cwd(), 'languageData.json');
const outputFilePath = join(cwd(), 'languageCodes.json');

const jsonData = readJsonFile(inputFilePath);
if (jsonData) {
    const languages = {};

    for (const item in jsonData.options) {
        const {request_options, user_options} = jsonData.options[item];
        console.log(`language: ${item}`);
        const code = request_options.languageCode;
        if(user_options?.female_voices && user_options?.male_voices) {
           const femaleVoice = user_options.female_voices.pop();
           const maleVoice = user_options.male_voices.pop();
           languages[code] =  {femaleVoice, maleVoice}};
    }

    writeJsonFile(outputFilePath, languages);
}


