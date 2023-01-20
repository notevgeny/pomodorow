import { useState, useEffect, useContext, useRef } from 'react';

import { PlayButton } from '../../ui/Buttons/PlayButton';
import { PauseButton } from '../../ui/Buttons/PauseButton';
import { SettingsButton } from '../../ui/Buttons/SettingsButton';
import { ResetButton } from '../../ui/Buttons/ResetButton';

import { SettingsContext } from '../../context/SettingsContext';

import { CircularProgressbar, buildStyles  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import sound from "../../../signal.mp3";


const Timer = () => {

  const [isPaused, setIsPaused] = useState(true);
  const [timerMode, setTimerMode] = useState('work'); // work/break
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [sessionsAmount, setSessionsAmount] = useState(0);

  const audio = new Audio(sound);

  const settingsInfo = useContext(SettingsContext);

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const timerModeRef = useRef(timerMode);

  const sessionsRef = useRef(sessionsAmount);


  const initTimer = () => {
    secondsLeftRef.current = settingsInfo.workMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);
  }

  const switchTimerMode = () => {
    const nextMode = timerModeRef.current === 'work' ? 'break': 'work';
    const nextSeconds = (nextMode === 'work' ? settingsInfo.workMinutes : settingsInfo.breakMinutes) * 60;
    setTimerMode(nextMode);
    timerModeRef.current = nextMode;
    setSecondsLeft(nextSeconds);
    secondsLeftRef.current = nextSeconds;
  }

  const handleSessions = () => {
    setSessionsAmount(++sessionsRef.current);
  }

  const handleAudio = () => {
    audio.play()
  }

  const tick = () => {
    setSecondsLeft(secondsLeftRef.current--)
  }

  useEffect(() => {
    initTimer();

    const interval = setInterval(() => {
      if (secondsLeftRef.current === 0 && timerModeRef.current === 'work'){
        handleSessions()
      }

      if (isPausedRef.current){
        return;
      }

      if (secondsLeftRef.current === 0){
        handleAudio() 
        return switchTimerMode()
      }

      tick();

    }, 1000);

    return () => clearInterval(interval);


  }, [settingsInfo])

  const totalSeconds = timerMode === 'work' ? settingsInfo.workMinutes * 60 : settingsInfo.breakMinutes * 60
  const percentage = Math.round(secondsLeft / totalSeconds * 100);

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if (seconds < 10) seconds = '0' + seconds; 

  return (
    <div>
      <CircularProgressbar 
        value={percentage} 
        text={minutes + ':' + seconds} 
        styles={
          buildStyles({
            pathColor: timerMode === 'work' ? 'var(--red)' : 'var(--green)',
            textColor: '#fff',
            trailColor: 'rgba(255, 255, 255, 0.7)',
          })
        } 
      />
      <div className='sessions'>Work sessions processed: {sessionsAmount}</div>

      <div className='button-nav'>
        {isPaused ? 
        <PlayButton 
          onClick={() => {
            setIsPaused(false)
            isPausedRef.current = false;
          }}/> 
        : 
        <PauseButton 
          onClick={()=> {
            setIsPaused(true);
            isPausedRef.current = true;
          }}
        />
        }
        <ResetButton
          onClick={() => {
            isPausedRef.current = true;
            setIsPaused(isPausedRef.current);
            setSessionsAmount(0);
            sessionsRef.current = 0;
            timerModeRef.current = 'work';
            setTimerMode(timerModeRef.current);   
            initTimer();
          }}  
        />
        
      </div>

      <div style={{marginTop: '20px'}}>
        <SettingsButton 
          onClick={() => settingsInfo.setIsSettingsPopupVisible(true)}
        />
      </div>

    </div>
    
  );
};

export {Timer};