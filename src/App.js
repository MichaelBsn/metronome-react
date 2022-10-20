import './App.css';
import { useEffect, useRef, useState } from 'react';
import Timer from './timer.js'

function App() {
  const [bpm, setBpm] = useState(120)
  const [isRunning, setIsRunning] = useState(false)
  const audioContextContainer = useRef(new AudioContext())
  const primaryGain = useRef(audioContextContainer.current.createGain())
  const metronome = useRef(new Timer(beep, 60000 / bpm, { immediate: true }))

  useEffect(() => {
    primaryGain.current.gain.setValueAtTime(0.05, 0);
    primaryGain.current.connect(audioContextContainer.current.destination)
  }, [])

  function handlePlay() {
    console.log(audioContextContainer.current)
    console.log(primaryGain.current)
    if (!isRunning) {
      metronome.current.start()
      setIsRunning(true)
      console.log('metronome started')
    } else {
      metronome.current.stop()
      setIsRunning(false)
      console.log('metronome stopped')
    }
  }

  function beep() {
    const noteOsc = audioContextContainer.current.createOscillator();
    noteOsc.frequency.setValueAtTime(440, 0)
    noteOsc.connect(primaryGain.current);
    noteOsc.start();
    noteOsc.stop(audioContextContainer.current.currentTime + 0.25)
  }

  return (
    <div className="App">
      <p id='bpm-display'>BPM: {bpm}</p>
      <input
        type="range"
        id="bpm-control"
        name="bpm-control"
        min="30"
        max="200"
        step="1"
        defaultValue={bpm}
        onChange={(e) => { setBpm(e.target.value) }}
      />
      <button onClick={handlePlay} id='play-pause'>playbutton</button>
    </div>
  );
}

export default App;
