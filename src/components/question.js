import React from 'react';

function Question(props) {
  return props.currentQuestionData === null ? <p>Loading... </p> :
    (
      <div>
        <h2 className="question">Q: {props.currentQuestionData.question}</h2>
        {
          props.currentQuestionData.options.map((option, index) => {
            return (
              <p className="question-options" key={index}>{option.text} [{option.value}]</p>
            );
          })
        }
      </div>
    );
}

export default Question;