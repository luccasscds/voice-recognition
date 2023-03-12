import $ from 'jquery';
import { voiceRecognition } from './voiceRecognition';

const button = $('#speak');
button.on('click', function() {
  const recognition = voiceRecognition();
  if(!recognition) return;

  recognition.listening ? recognition.stop() : recognition.start();
});

export function changeTextButton(listening: boolean) {
  button.text(listening ? 'Parar de falar' : 'Pode falar');
  button.toggleClass('btn-primary');
  button.toggleClass('btn-danger');
};