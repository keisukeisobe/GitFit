import React, {useState, useEffect} from 'react';
import {auth, db} from '../services/firebase';
import {useSetInput} from '../helpers/setInput';
import Question from '../components/question';

function Test() {
  const [readError, setReadError] = useState(null);
  const [writeError, setWriteError] = useState(null);
  const [questionArray, setQuestionArray] = useState(null);
  const [input, setInput] = useSetInput();
  const [currentUser, setCurrentUser] = useState(auth().currentUser);

  const handleSubmit = (event) => {
    event.preventDefault();
    setWriteError(null);
    Object.keys(input).forEach(k => {
      input[k] = Number(input[k]);
    });
    const answerArray = Object.values(input);
    const baselineMRV = answerArray.reduce( (accumulator, currentValue) => accumulator + currentValue);
    db.collection('users').doc(currentUser.uid).set(
      {
        answers: answerArray,
        baselineMRV: baselineMRV
      });
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
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Determining your baseline Maximum Recoverable Volume (MRV)</legend>
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
  );
}

export default Test;