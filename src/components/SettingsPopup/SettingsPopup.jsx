import ReactSlider from "react-slider";
import { useContext } from "react";
import { SettingsContext } from "../../context/SettingsContext";
import {BackButton} from '../../ui/Buttons/BackButton';

const SettingsPopup = () => {

  const settingsInfo = useContext(SettingsContext)

  return (
    <div>
      <label>Work: {settingsInfo.workMinutes}:00</label>
      <ReactSlider
        className="slider"
        thumbClassName="thumb"
        trackClassName="track"
        value={settingsInfo.workMinutes}
        onChange={newValue => settingsInfo.setWorkMinutes(newValue)}
        min={25}
        max={120}
      />
      <label>Break: {settingsInfo.breakMinutes}:00</label>
      <ReactSlider
        className="slider break"
        thumbClassName="thumb"
        trackClassName="track"
        value={settingsInfo.breakMinutes}
        onChange={newValue => settingsInfo.setBreakMinutes(newValue)}
        min={5}
        max={60}
      />
      <div style={{marginTop: '20px'}}>
        <BackButton 
          onClick={() => settingsInfo.setIsSettingsPopupVisible(false)}
        />
      </div>
      
    </div>
  );
};

export {SettingsPopup};