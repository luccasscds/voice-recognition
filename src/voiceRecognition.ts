import $ from 'jquery';
import { changeTextButton } from './main';
import { speak } from './speak';

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
      
      if(results.includes('horas')) {
        speak(new Date().toLocaleTimeString());
      }
    };

    newVoice.listening = listening;
  
    return newVoice;
};