export function speak(phrase: string) {
    const newVoice = new SpeechSynthesisUtterance(phrase);
    const speakSynthesis = window.speechSynthesis;
    newVoice.lang = 'pt-BR';

    speakSynthesis.speak(newVoice);
};