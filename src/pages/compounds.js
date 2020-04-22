import React, {useState} from 'react';
import {auth, db} from '../services/firebase';
import Select from 'react-select';

const options = {
  bench: [
    {value: 'stnadardBench', label: 'Standard Grip Bench Press'},
    {value: 'closeGrip', label: 'Close Grip Bench Press'},
    {value: 'wideGrip', label: 'Wide Grip Bench Press'},
    {value: 'inclineBench', label: 'Incline Bench Press'}
  ],
  squat: [
    {value: 'lowBackSquat', label: 'Low Bar Back Squat'},
    {value: 'highBackSquat', label: 'High Bar Back Squat'},
    {value: 'frontSquat', label: 'Front Squat'},
    {value: 'pausedSquat', label: 'Paused Squat'},
    {value: 'pinSquat', label: 'Pin Squat'}
  ],
  deadlift: [
    {value: 'conventionalDeadlift', label: 'Conventional Deadlift'},
    {value: 'sumoDeadlift', label: 'Sumo Deadlift'},
    {value: 'pausedDeadlift', label: 'Paused Deadlift'},
    {value: 'rackPull', label: 'Rack Pulls'},
    {value: 'blockPull', label: 'Block Pulls'}
  ]
}

function Compounds() {
  const [currentUser, setCurrentUser] = useState(auth().currentUser);
  const [benchVariations, setBenchVariations] = useState([]);
  const [squatVariations, setSquatVariations] = useState([]);
  const [deadliftVariations, setDeadliftVariations] = useState([]);
  const [writeError, setWriteError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    setWriteError(null);
    let exercises = [...benchVariations, ...squatVariations, ...deadliftVariations].map(element => {
      return element.label;
    });
    db.collection('users').doc(currentUser.uid).set({exercises}, {merge: true});
  }

  return (
    <>
      <p>
        This program assumes that you will be training chest with some kind of bench press, quads with some kind of barbell squat, and glutes/posterior chain with some kind of deadlift.
      </p>    
      <p>
        Depending on your level of advancement, you may be doing just bench press, squats, and deadlifts, and no variations, or you may be doing three different types of bench press (for example) in one week. Select what compound movements you would like to do below.
      </p>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Compound Lift Selection</legend>
          <label>Select your bench press lifts:</label>
          <Select isMulti onChange={setBenchVariations} options={options.bench} />
          <label>Select your squat lifts:</label>
          <Select isMulti onChange={setSquatVariations} options={options.squat} />
          <label>Select your deadlifts:</label>
          <Select isMulti onChange={setDeadliftVariations} options={options.deadlift} />
          <input type="submit" value="Submit"/>
        </fieldset>
      </form>
    </>
  )
}

export default Compounds;