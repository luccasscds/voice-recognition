import $ from 'jquery';
import { getBrowserVersion, voiceRecognition } from './voice/voiceRecognition';
import { constants } from './constants';

// title page
$('.title').html(`
  ${constants.APP_NAME} <small class="h6 text-muted">V${constants.APP_VERSION}</small>
`);

const button = $('#speak');

if(getBrowserVersion()) {
  button.on('click', function() {
    const recognition = voiceRecognition();
    if(!recognition) return;
  
    recognition.listening ? recognition.stop() : recognition.start();
  });
} else {
  button.attr('disabled', 'true');
}

export function changeTextButton(listening: boolean) {
  const image = $('#iconButton')
  listening ? image.attr('src', "./images/mic.svg") : image.attr('src', "./images/mic_off.svg");
  button.toggleClass('btn-primary');
  button.toggleClass('btn-danger');
};