import { useState } from 'react'
import './App.css'
import { SettingsPopup } from './components/SettingsPopup/SettingsPopup';
import { Timer } from './components/Timer/Timer';
import { SettingsContext } from './context/SettingsContext';

function App() {

  const [isSettingsPopupVisible, setIsSettingsPopupVisible] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(45);
  const [breakMinutes, setBreakMinutes] = useState(15);


  return (
    <main>
      <SettingsContext.Provider value={{
        workMinutes,
        breakMinutes,
        setWorkMinutes,
        setBreakMinutes,
        setIsSettingsPopupVisible
      }}>
        { isSettingsPopupVisible ? <SettingsPopup/> : <Timer/> }
      </SettingsContext.Provider>
      
    </main>
    
  )
}

export default App
