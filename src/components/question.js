import React from 'react';

function Question(props) {
  return (
    <>
      {`Q${props.questionIndex}: ${props.question.question}`}
      {props.question.options.map((option, optionIndex) => {
        return (
          <ul key={optionIndex}>
            <li>
            <input type="radio" id={option.text} value={option.value} name={`question${props.questionIndex}`} onChange={props.setInput}></input>
            <label htmlFor={option.text}>
              {option.text}
            </label>
            </li>
          </ul>
        );
      })}
    </>
  );
}

export default Question;