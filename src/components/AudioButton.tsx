import { useAppState } from '@/state/AppState';

type Props = {
  text: string;
  label?: string;
};

export function AudioButton({ text, label = 'Listen in Dutch' }: Props) {
  const { activeProfile } = useAppState();

  function speak() {
    if (!('speechSynthesis' in window)) {
      alert('Speech is not supported in this browser. Read the text aloud yourself.');
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'nl-NL';
    utterance.rate = activeProfile.settings.slowSpeech ? 0.75 : 0.95;
    window.speechSynthesis.speak(utterance);
  }

  return (
    <button type="button" className="btn btn--secondary" onClick={speak}>
      <span aria-hidden="true">🔊</span>
      {label}
    </button>
  );
}
