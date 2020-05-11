import React, {useState, useEffect} from 'react';
import {db} from '../services/firebase';
import Select from 'react-select';

function Postvolume(){
  const [writeError, setWriteError] = useState(null);
  const [selectedOption, setSelectedOption] = useState({value: 'abs', label: 'Abs'});
  const [volumeObject, setVolumeObject] = useState(
    {
      maintenanceVolume: '',
      minimumEffectiveVolume: '',
      maximumAdaptiveVolumeMin: '',
      maximumAdaptiveVolumeMax: '',
      maximumRecoverableVolume: '',
      frequencyMin: '',
      frequencyMax: '',
      modifier: '',
    }
  );

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    console.log(`${selectedOption} was selected`);
    //form reset
    setVolumeObject(
      {
        maintenanceVolume: '',
        minimumEffectiveVolume: '',
        maximumAdaptiveVolumeMin: '',
        maximumAdaptiveVolumeMax: '',
        maximumRecoverableVolume: '',
        frequencyMin: '',
        frequencyMax: '',
        modifier: '',
      }
    );
  }

  const handleVolumeChange = (event) => {
    setVolumeObject({
      ...volumeObject,
      [event.currentTarget.name]: event.currentTarget.value
    });
    console.log(`${event.currentTarget.name} was set to ${event.currentTarget.value}`);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setWriteError(null);
    Object.keys(volumeObject).forEach(k => {
      volumeObject[k] = Number(volumeObject[k]);
    });
    db.collection('volume').doc('baseline').set(
      {
        [selectedOption.value]: volumeObject 
      },
      {merge: true}
    )
    .then( () => {
      setVolumeObject(
        {
          maintenanceVolume: '',
          minimumEffectiveVolume: '',
          maximumAdaptiveVolumeMin: '',
          maximumAdaptiveVolumeMax: '',
          maximumRecoverableVolume: '',
          frequencyMin: '',
          frequencyMax: '',
          modifier: '',
        }
      );
    })
  }

  const options = [
    {value: 'abs', label: 'Abs'},
    {value: 'backHorizontal', label: 'Back (Horizontal)'},
    {value: 'backVertical', label: 'Back (Vertical)'},
    {value: 'biceps', label: 'Biceps'},
    {value: 'calves', label: 'Calves'},
    {value: 'chest', label: 'Chest'},
    {value: 'forearms', label: 'Forearms'},
    {value: 'frontDeltoids', label: 'Front Deltoids'},
    {value: 'glutes', label: 'Glutes'},
    {value: 'hamstrings', label: 'Hamstrings'},
    {value: 'quads', label: 'Quads'},
    {value: 'rearDeltoids', label: 'Rear Deltoids'},
    {value: 'sideDeltoids', label: 'Side Deltoids'},
    {value: 'traps', label: 'Traps'},
    {value: 'triceps', label: 'Triceps'},
  ]

  //could display all of the inputs using an array map-- but would mess up the 
  //formatting. For now it will stay the way it is
  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Upload Baseline Volume Benchmarks</legend>
        <label htmlFor="muscle-group-select">Select a muscle group:</label>
        <Select value={selectedOption} onChange={handleSelectChange} options={options}/>
        <ul>
          <li>
            <label htmlFor="maintenanceVolume">
              Maintenance Volume: 
              <input type="number" name="maintenanceVolume" id="maintenanceVolume" value={volumeObject.maintenanceVolume} onChange={handleVolumeChange}></input>
              (sets/wk):
            </label>
          </li>
          <li>
            <label htmlFor="minimumEffectiveVolume">
              Minimum Effective Volume: 
              <input type="number" name="minimumEffectiveVolume" id="minimumEffectiveVolume" value={volumeObject.minimumEffectiveVolume} onChange={handleVolumeChange}></input>
              (sets/wk)
            </label>
          </li>
          <li>
            <label htmlFor="maximumAdaptiveVolumeMin">
              Maximum Adaptive Volume Minimum: 
              <input type="number" name="maximumAdaptiveVolumeMin" id="maximumAdaptiveVolumeMin" value={volumeObject.maximumAdaptiveVolumeMin} onChange={handleVolumeChange}></input>
              (sets/wk):
            </label>
          </li>
          <li>
            <label htmlFor="maximumAdaptiveVolumeMax">
              Maximum Adaptive Volume Maximum:
              <input type="number" name="maximumAdaptiveVolumeMax" id="maximumAdaptiveVolumeMax" value={volumeObject.maximumAdaptiveVolumeMax} onChange={handleVolumeChange}></input>
              (sets/wk)
            </label>
          </li>
          <li>
            <label htmlFor="maximumAdaptiveVolumeMed">
              Maximum Adaptive Volume Median:
              <input type="number" name="maximumAdaptiveVolumeMed" id="maximumAdaptiveVolumeMed" value={volumeObject.maximumAdaptiveVolumeMed} onChange={handleVolumeChange}></input>
              (sets/wk)
            </label>
          </li>          
          <li>
            <label htmlFor="maximumRecoverableVolume">
            Maximum Recoverable Volume:
            <input type="number" name="maximumRecoverableVolume" id="maximumRecoverableVolume" value={volumeObject.maximumRecoverableVolume} onChange={handleVolumeChange}></input>
            (sets/wk)
            </label>
          </li>
          <li>
            <label htmlFor="frequencyMin">
            Frequency Minimum:
            <input type="number" name="frequencyMin" id="frequencyMin" value={volumeObject.frequencyMin} onChange={handleVolumeChange}></input>
            (workouts/wk)
            </label>
          </li>
          <li>
            <label htmlFor="frequencyMax">
            Frequency Maximum:
            <input type="number" name="frequencyMax" id="frequencyMax" value={volumeObject.frequencyMax} onChange={handleVolumeChange}></input>
            (workouts/wk)
            </label>
          </li>
          <li>
            <label htmlFor="frequencyMax">
            Modifier:
            <input type="number" name="modifier" id="modifier" value={volumeObject.modifier} onChange={handleVolumeChange}></input>
            </label>
          </li>
        </ul>
      </fieldset>
      <input type="submit" value="Submit" />
    </form>
  )
}

export default Postvolume;