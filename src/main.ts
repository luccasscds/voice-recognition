import $ from 'jquery';

$('#app')!.html(`
  <textarea id="textarea" rows="10"></textarea>
  <button id="speak">Pode falar</button>
`);

const button = $('#speak');
const textarea = $('#textarea');
let listening = false;

button.on('click', function() {
  const recognition = speed();
  if(!recognition) return ;

  listening ? recognition.stop() : recognition.start();
  changeTextButton();
});

function speed() {
  // @ts-ignore
  const voice = window.webkitSpeechRecognition;
  const newVoice = new voice();

  newVoice.lang = 'pt-BR';

  newVoice.onstart = () => {
    listening = true;
    changeTextButton();
  };
  newVoice.onend = () => {
    listening = false;
    changeTextButton();
  };
  newVoice.onerror = (err: Error) => {
    console.log('error', err);
    listening = false;
  };
  newVoice.onresult = (res: any) => {
    textarea.val(res.results[0][0].transcript);
  };

  return newVoice;
};

function changeTextButton() {
  button.text(listening ? 'Parar de falar' : 'Pode falar');
};