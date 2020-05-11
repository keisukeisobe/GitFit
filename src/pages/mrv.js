import React, {useState, useEffect} from 'react';
import {auth, db } from '../services/firebase';
import Table from '../components/table';
import styled from 'styled-components';

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

function Mrv(){
  const [currentUser, setCurrentUser] = useState(auth().currentUser);
  const [currentMRV, setCurrentMRV] = useState(0);
  const [currentMEV, setCurrentMEV] = useState(0);
  const [baseline, setBaseline] = useState([]);

  useEffect( () => {
    db.collection('users').doc(currentUser.uid).get()
    .then(doc => {
      if(!doc.exists){
        console.log('Document does not exist, baseline MRV modifier set to 0.')
      } else {
        setCurrentMRV(doc.data().baselineMRV);
        setCurrentMEV(doc.data().baselineMEV);
      }
    })
    db.collection('volume').doc('baseline').get()
    .then(doc => {
      if(!doc.exists){
        console.log('Document does not exist, baseline volumes not inputted.')
      } else {
        let data = [];
        let keys = Object.keys(doc.data()).sort();
        keys.map((k, index) => {
          data[index] = doc.data()[k]
          return data[index];
        });
        setBaseline(data);
      }
    })
  }, [currentUser.uid])

  const columns = React.useMemo(
    () => [
      {
        Header: 'Muscle Group',
        accessor: 'muscleGroup'
      },
      {
        Header: 'MV',
        accessor: 'maintenanceVolume'
      },
      {
        Header: 'MEV',
        accessor: 'minimumEffectiveVolume'
      },
      {
        Header: 'MAV MIN',
        accessor: 'maximumAdaptiveVolumeMin'
      },
      {
        Header: 'MAV MAX',
        accessor: 'maximumAdaptiveVolumeMax'
      },
      {
        Header: 'MRV',
        accessor: 'maximumRecoverableVolume'
      },
      {
        Header: 'FRQ MIN',
        accessor: 'frequencyMin'
      },
      {
        Header: 'FRQ MAX',
        accessor: 'frequencyMax'
      },
    ],
    []
  );

  const data = React.useMemo(
    () => baseline,
    [baseline]
  );

  const mevColumns = React.useMemo(
    () => [
      {
        Header: '',
        accessor: 'blank',
      },
      {
        Header: 'Hypertrophy',
        accessor: 'hypertrophy',
      },
      {
        Header: 'Strength',
        accessor: 'strength',
      },
      {
        Header: 'Peaking',
        accessor: 'peaking',
      },
    ], []
  );

  const mevData = React.useMemo(
    () => [
      {
        blank: 'Squat',
        hypertrophy: `${Math.ceil(7.5 + currentMEV)} sets/week`,
        strength: `${Math.ceil(5.5 + currentMEV)} sets/week`,
        peaking: `${Math.ceil(4.5 + currentMEV)} sets/week`,
      },
      {
        blank: 'Bench',
        hypertrophy: `${Math.ceil(9 + currentMEV)} sets/week`,
        strength: `${Math.ceil(8 + currentMEV)} sets/week`,
        peaking: `${Math.ceil(6.5 + currentMEV)} sets/week`,
      },
      {
        blank: 'Deadlift',
        hypertrophy: `${Math.ceil(5.5 + currentMEV)} sets/week`,
        strength: `${Math.ceil(4.5 + currentMEV)} sets/week`,
        peaking: `${Math.ceil(2.5 + currentMEV)} sets/week`,
      }
    ], [currentMEV]
  );

  const mrvData = React.useMemo(
    () => [
      {
        blank: 'Squat',
        hypertrophy: `${Math.floor(14 + currentMRV)} sets/week`,
        strength: `${Math.floor(9 + currentMRV)} sets/week`,
        peaking: `${Math.floor(6 + currentMRV)} sets/week`,
      },
      {
        blank: 'Bench',
        hypertrophy: `${Math.floor(17 + currentMRV)} sets/week`,
        strength: `${Math.floor(11 + currentMRV)} sets/week`,
        peaking: `${Math.floor(8.5 + currentMRV)} sets/week`,
      },
      {
        blank: 'Deadlift',
        hypertrophy: `${(11 + currentMRV)} sets/week`,
        strength: `${(7 + currentMRV)} sets/week`,
        peaking: `${(4.5 + currentMRV)} sets/week`,
      }
    ], [currentMRV]
  );
  

  return (
    <div>
      <p>
        Your baseline MEV modifier is {`${currentMEV > 0 ? '+' : '-'}${currentMEV}`} sets/week. 
        Your baseline MRV modifier is {`${currentMRV > 0 ? '+' : '-'}${currentMRV}`} sets/week.
      </p>
      <p>
        What this means is that based on your height, sex, training history, etc., that you need an estimated +1 sets/week to reach minimum effective volumes for hypertrophy/strength compared to median MEV values for the three main lifts. For MRV, you need an estimated {`${currentMRV} ${currentMRV > 0 ? 'more' : 'less'}`} sets per week than the median MRV recommendations for the three main lifts.
      </p>
      <p>
        Progressive overload is a key factor in training if you want to grow bigger and stronger. Starting at our minimum effective volume, our training should increase in intensity and/or volume throughout our mesocycle. The final week of a mesocycle before your deload could hit your maximum recoverable volume, but it's not recommended to go above your MRV for more than a week, and you should deload right after.  
      </p>
      <p>
        By the end of your mesocycle, you should have accumulated enough fatigue that a deload or active recovery period is necessary.
      </p>
      <p>
        See below for a table of your MEVs for each major compound lift:
      </p>
      <Styles>
        <Table columns={mevColumns} data={mevData} />
      </Styles>
      <p>
        And your MRVs for each major compound lift:
      </p>
      <Styles>
        <Table columns={mevColumns} data={mrvData} />
      </Styles>
      <p>
        Take the squat, for example: a reasonable structure to our programming would be to start near {Math.ceil(7.5 + currentMEV)} sets/week, and increase the amount of overloading squat sets we do per week, increase the amount of squat prime mover (quad, hamstring) accessories, increase intensities, or most likely, a combination of all three.
      </p>  
      <p>
        Next, let's focus on our compound variation selection.
      </p>
      <Styles>
        <Table columns={columns} data={data} />
      </Styles>
    </div>
  );
}

export default Mrv;

