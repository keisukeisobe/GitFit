import React, {useState, useEffect} from 'react';
import {auth, db} from '../services/firebase';
import { Redirect } from 'react-router-dom';
import {useSetInput} from '../helpers/setInput';
import Question from '../components/question';

function Assessment() {
  const [readError, setReadError] = useState(null);
  const [writeError, setWriteError] = useState(null);
  const [questionArray, setQuestionArray] = useState(null);
  const [input, setInput] = useSetInput();
  const [currentUser, setCurrentUser] = useState(auth().currentUser);
  const [toMRV, setToMRV] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setWriteError(null);
    Object.keys(input).forEach(k => {
      input[k] = Number(input[k]);
    });
    const answerArray = Object.values(input);
    let mrv = 0;
    let mev = 0;
    answerArray.forEach((k, index) => {
      mrv+=questionArray[index].options[k].mrv;
      mev+=questionArray[index].options[k].mev;
      console.log(`MRV is now ${mrv}, MEV is now ${mev}`)
    })
    console.log(`MRV: ${mrv}, MEV: ${mev}`);
    db.collection('users').doc(currentUser.uid).set(
      {
        answers: answerArray,
        baselineMRV: mrv,
        baselineMEV: mev
      })
      .then( () => setToMRV(true));
  }

  //retrieve question data
  useEffect(() => {
    db.collection('questions').doc('8gVdHO35vFxnwux6zhCT').get()
      .then(doc => {
        if(!doc.exists){
          console.log('Document does not exist.');
        } else {
          setQuestionArray(doc.data().questionArray);
        }
      })
      .catch(err => {
        console.log('Error retrieving document', err.message);
        setReadError(err.message);
      });
  }, []);

  return questionArray === null || questionArray.length !== 11 ? <p>Loading... </p> : (
    <>
      {toMRV ? <Redirect to="/mrv" />: null}
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Athlete Self-Assessment</legend>
            {questionArray.map((question, questionIndex) => {
              return (
                <Question 
                  key={questionIndex}
                  question={question}
                  questionIndex={questionIndex}
                  setInput={setInput} 
                />
              );
            })}
        </fieldset>
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}

export default Assessment;