import $ from 'jquery';
import { changeTextButton } from '../main';
import { speak } from '../speak/speak';

const textarea = $('#textarea');
let listening = false;

export function voiceRecognition() {
  // @ts-ignore
  const voice = window.webkitSpeechRecognition || window.SpeechRecognition;
  const newVoice = voice !== undefined ? new voice() : null;

  if(!newVoice) {
    alert('não suportado!');
    return null;
  };

  newVoice.lang = 'pt-BR';

  newVoice.onstart = () => {
    listening = true;
    changeTextButton(listening);
  };
  newVoice.onend = () => {
    listening = false;
    changeTextButton(listening);
  };
  newVoice.onerror = (err: Error) => {
    console.log('error', err);
  };
  newVoice.onresult = (res: any) => {
    const results = res.results[0][0].transcript as string;
    textarea.val(results);
    console.log(results); // temp
    
    // rules to speak
    if(results.toLowerCase().includes('que horas são?')) {
      speak(new Date().toLocaleTimeString());
    } else if(results.toLowerCase().includes('hoje')) {
      speak(new Date().toLocaleDateString());
    };
  };

  newVoice.listening = listening;

  return newVoice;
};

export function getBrowserVersion() {
  const { userAgent } = navigator;
  const browserVersion = userAgent.toLowerCase();
  const arrayBrowsers = ['firefox', 'edg', 'chrome', 'safari'];
  let isCompatible = true;

  if(browserVersion.includes(arrayBrowsers[0])) {
    isCompatible = false;
  } else if(browserVersion.includes(arrayBrowsers[1])) {
    const regexp = new RegExp(arrayBrowsers[1] + '/([0-9]*)');
    const resp = regexp.exec(browserVersion);
    const numberVersion = resp ? Number(resp[1]) : 0;
    isCompatible = numberVersion >= 79;
  } else if(browserVersion.includes(arrayBrowsers[2])) {
    const regexp = new RegExp(arrayBrowsers[2] + '/([0-9]*)');
    const resp = regexp.exec(browserVersion);
    const numberVersion = resp ? Number(resp[1]) : 0;
    isCompatible = numberVersion >= 33;
  } else if(browserVersion.includes(arrayBrowsers[3])) {
    const regexp = new RegExp(arrayBrowsers[3] + '/([0-9]*)');
    const resp = regexp.exec(browserVersion);
    const numberVersion = resp ? Number(resp[1]) : 0;
    isCompatible = numberVersion >= 14.1;
  }

  return isCompatible;
}