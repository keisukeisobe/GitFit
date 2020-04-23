import React, {useState, useEffect} from 'react';
import {db} from '../services/firebase';
import Select from 'react-select';

function Postexercises(){
  const [writeError, setWriteError] = useState(null);
  const [selectedOption, setSelectedOption] = useState({value: 'abs', label: 'Abs'});
  const [exerciseObject, setExerciseObject] = useState(
    {
      name: '',
      muscleGroup: 'abs',
      e1rm: 0,
      trainingMax: 0,
      increment: 5,
      history: {}
    }
  );

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    console.log(`${selectedOption.value} was selected`);
    //form reset
    setExerciseObject(
      {
        name: '',
        muscleGroup: selectedOption.value,
        e1rm: 0,
        trainingMax: 0,
        increment: 5,
        history: {}
      }
    );
  }

  const handleExerciseChange = (event) => {
    setExerciseObject({
      ...exerciseObject,
      [event.currentTarget.name]: event.currentTarget.value
    });
    console.log(`${event.currentTarget.name} was set to ${event.currentTarget.value}`);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setWriteError(null);
    exerciseObject.muscleGroup = selectedOption.value;
    db.collection('exercises').doc('5BEKrKo63WKoVVVLF1mc').set(
      {
        [exerciseObject.name]: exerciseObject 
      },
      {merge: true}
    )
    .then( () => {
      setExerciseObject(
        {
          name: '',
          muscleGroup: '',
          e1rm: 0,
          trainingMax: 0,
          increment: 5,
          history: {}
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
        <legend>Upload Exercise</legend>
        <label htmlFor="muscle-group-select">Select a muscle group:</label>
        <Select value={selectedOption} onChange={handleSelectChange} options={options}/>
        <ul>
          <li>
            <label htmlFor="exerciseName">
              Name: 
              <input type="text" name="name" id="exerciseName" value={exerciseObject.name} onChange={handleExerciseChange}></input>
            </label>
          </li>
        </ul>
      </fieldset>
      <input type="submit" value="Submit" />
    </form>
  )
}

export default Postexercises;