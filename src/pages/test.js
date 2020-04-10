import React, {useState, useEffect} from 'react';
import {db} from '../services/firebase';
import Question from '../components/question';

function Test() {
  const [readError, setReadError] = useState(null);
  const [currentQuestionId, setCurrentQuestionId] = useState('1');
  const [currentQuestionData, setCurrentQuestionData] = useState(null);

  useEffect(() => {
    db.collection('questions').doc(currentQuestionId).get()
      .then(doc => {
        if (!doc.exists){
          console.log('Error displaying question!');
        } else {
          //console.log('Question data', doc.data());
          setCurrentQuestionData(doc.data());
        }
      })
      .catch(err => {
        setReadError(err);
        console.log('Error retrieving document', readError);
      });
  }, [currentQuestionId, readError]);

  return (
    <div>
      <p>First we will determine a rough estimate on your MRV based on your demographics and training history.</p>
      <Question
        currentQuestionId={currentQuestionId}
        currentQuestionData={currentQuestionData}
        setCurrentQuestionId={setCurrentQuestionId}
      />
    </div>
  );
}

export default Test;