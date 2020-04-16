import React, {useState, useEffect} from 'react';
import {auth, db } from '../services/firebase';

function Mrv(){
  const [currentUser, setCurrentUser] = useState(auth().currentUser);
  const [currentModifier, setCurrentModifier] = useState(0)

  useEffect( () => {
    db.collection('users').doc(currentUser.uid).get()
    .then(doc => {
      if(!doc.exists){
        console.log('Document does not exist, baseline MRV modifier set to 0.')
      } else {
        setCurrentModifier(doc.data().baselineMRV)
      }
    })
  })

  return (
    <div>
      <p>
        Your baseline MRV modifier is {`${currentModifier > 0 ? '+' : '-'}${currentModifier}`} set per week.
      </p>
      <p>
        What this means is that based on your height, sex, training history, etc., that you can do roughly {`${currentModifier} ${currentModifier > 0 ? 'more' : 'less'}`} sets per week than the average MRV recommendations for each muscle group.
      </p>
      <p>
        MRV recommendations can be made for muscle groups or for specific compounds (ex: glute MRV vs. squat MRV), but this tool will use muscle group MRV recommendations.
        MRV can vary significantly based on training frequency as well-- higher training frequency generally means slightly higher MRVs (for example, if you train back 4 times a week, you might be able to get away with 4 more sets/week than if you only trained 2 times a week). 
      </p>
      <p>
        Theoretically, if your focus is to grow a muscle group, your training for that muscle group throughout a mesocycle should move between your minimum adaptable volume at the beginning,
        to your maximum adaptable volume towards the end of the mesocycle (if you are planning on accomplishing progressive overload by increasing volume, that is. You could also accomplish this by 
        keeping volume consistent and increasing intensity). 
      </p>
      <p>
        You could include a short period of functional overreaching at the end as well, meaning your volume would be 
        above your maximum adaptable volume, but below your maximum recoverable volume (anything beyond your maximum recoverable volume will not be helpful). 
      </p>
      <p>
        By the end of your mesocycle, you should have accumulated enough fatigue that a deload or active recovery period is necessary.
      </p>
      <p>
        See below for a baseline volume table for each muscle group.
      </p>
      <table>
        <tr>
          <th>Muscle Group</th>
          <th>MV</th>
          <th>MAV MIN</th>
          <th>MAV MAV</th>
          <th>MRV</th>
        </tr>
        <tr>
          <td>Abs</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>

        </tr>
      </table>

    </div>
  );
}

export default Mrv;

