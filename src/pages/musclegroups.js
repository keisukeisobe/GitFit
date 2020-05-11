import React, {useState, useEffect} from 'react';
import {auth, db} from '../services/firebase';

function MuscleGroups() {
  const [currentUser, setCurrentUser] = useState(auth().currentUser);
  const [writeError, setWriteError] = useState(null);
  const [muscleGroups, setMuscleGroups] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    setWriteError(null);
    db.collection('users').doc(currentUser.uid).set({muscleGroups}, {merge: true});
  }

  const handleChange = (event) => {
    const value = event.target.value;
    setMuscleGroups({
      ...muscleGroups,
      [event.target.name]: value
    });
  }

  return (
    <>
      <p>
        This program assumes you will be training your chest, quads, and glutes with compound movements (bench press, squat, and deadlifts). For the other muscle groups, you should pick and choose whether you specifically want to grow or maintain those muscle groups. 
      </p>
      <p>
        The options for each muscle group are "Maintain, Grow (Low Volume), Grow (Medium Volume), Grow (High Volume), and Overreaching (Very High Volume)." 
      </p>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Muscle Group Goals</legend>
          <label>Abs:
            <select name="abs" id="abs-select" onChange={handleChange}>
              <option value="maintain">Maintain</option>
              <option value="low">Grow (Low Volume)</option>
              <option value="medium">Grow (Medium Volume)</option>
              <option value="high">Grow (High Volume)</option>
              <option value="veryHigh">Overreaching (Very High Volume)</option>
            </select>
          </label>
          <br></br>
          <label>Back (Horizontal Pulling):
            <select name="backHorizontal" id="back-Horizontal-select" onChange={handleChange}>
              <option value="maintain">Maintain</option>
              <option value="low">Grow (Low Volume)</option>
              <option value="medium">Grow (Medium Volume)</option>
              <option value="high">Grow (High Volume)</option>
              <option value="veryHigh">Overreaching (Very High Volume)</option>
            </select>
          </label> 
          <br></br>         
          <label>Back (Vertical Pulling):
            <select name="backVertical" id="back-Vertical-select" onChange={handleChange}>
              <option value="maintain">Maintain</option>
              <option value="low">Grow (Low Volume)</option>
              <option value="medium">Grow (Medium Volume)</option>
              <option value="high">Grow (High Volume)</option>
              <option value="veryHigh">Overreaching (Very High Volume)</option>
            </select>
          </label>   
          <br></br> 
          <label>Biceps:
            <select name="biceps" id="biceps-select" onChange={handleChange}>
              <option value="maintain">Maintain</option>
              <option value="low">Grow (Low Volume)</option>
              <option value="medium">Grow (Medium Volume)</option>
              <option value="high">Grow (High Volume)</option>
              <option value="veryHigh">Overreaching (Very High Volume)</option>
            </select>
          </label>              
          <br></br>
          <label>Calves:
            <select name="calves" id="calves-select" onChange={handleChange}>
              <option value="maintain">Maintain</option>
              <option value="low">Grow (Low Volume)</option>
              <option value="medium">Grow (Medium Volume)</option>
              <option value="high">Grow (High Volume)</option>
              <option value="veryHigh">Overreaching (Very High Volume)</option>
            </select>
          </label>
          <br></br>
          <label>Forearms:
            <select name="forearms" id="forearms-select" onChange={handleChange}>
              <option value="maintain">Maintain</option>
              <option value="low">Grow (Low Volume)</option>
              <option value="medium">Grow (Medium Volume)</option>
              <option value="high">Grow (High Volume)</option>
              <option value="veryHigh">Overreaching (Very High Volume)</option>
            </select>
          </label>
          <br></br>        
          <label>Hamstrings:
            <select name="hamstrings" id="hamstrings-select" onChange={handleChange}>
              <option value="maintain">Maintain</option>
              <option value="low">Grow (Low Volume)</option>
              <option value="medium">Grow (Medium Volume)</option>
              <option value="high">Grow (High Volume)</option>
              <option value="veryHigh">Overreaching (Very High Volume)</option>
            </select>
          </label>
          <br></br>
          <label>Deltoids (Rear):
            <select name="rearDeltoids" id="rear-deltoids-select" onChange={handleChange}>
              <option value="maintain">Maintain</option>
              <option value="low">Grow (Low Volume)</option>
              <option value="medium">Grow (Medium Volume)</option>
              <option value="high">Grow (High Volume)</option>
              <option value="veryHigh">Overreaching (Very High Volume)</option>
            </select>
          </label>
          <br></br>   
          <label>Deltoids (Side):
            <select name="sideDeltoids" id="side-deltoids-select" onChange={handleChange}>
              <option value="maintain">Maintain</option>
              <option value="low">Grow (Low Volume)</option>
              <option value="medium">Grow (Medium Volume)</option>
              <option value="high">Grow (High Volume)</option>
              <option value="veryHigh">Overreaching (Very High Volume)</option>
            </select>
          </label>
          <br></br>                             
          <label>Traps:
            <select name="traps" id="traps-select" onChange={handleChange}>
              <option value="maintain">Maintain</option>
              <option value="low">Grow (Low Volume)</option>
              <option value="medium">Grow (Medium Volume)</option>
              <option value="high">Grow (High Volume)</option>
              <option value="veryHigh">Overreaching (Very High Volume)</option>
            </select>
          </label>
          <br></br>      
          <label>Triceps:
            <select name="triceps" id="triceps-select" onChange={handleChange}>
              <option value="maintain">Maintain</option>
              <option value="low">Grow (Low Volume)</option>
              <option value="medium">Grow (Medium Volume)</option>
              <option value="high">Grow (High Volume)</option>
              <option value="veryHigh">Overreaching (Very High Volume)</option>
            </select>
          </label>
          <br></br>   
          <input type="submit" value="Submit"/>           
        </fieldset>
      </form>
    </>
  );
}

export default MuscleGroups;