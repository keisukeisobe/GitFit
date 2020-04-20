import React, {useState, useEffect} from 'react';
import {db} from '../services/firebase';

//THIS PAGE IS SOLELY FOR UPLOADING QUESTIONS TO THE DATABASE.
function Questions() {
  const [readError, setReadError] = useState(null);
  const [writeError, setWriteError] = useState(null);

  const questionArray = [
    {
      question: "What is your gender?",
      options: [
        {
          text: "Male",
          mev: 0,
          mrv: 0
        },
        {
          text: "Female",
          mev: 1.5,
          mrv: 5
        },
      ]
    },
    {
      question: "What is your weight class? (Use the former weight if you are female and the latter weight if you are male.)",
      options: [
        {
          text: "Light (57kg/75kg)",
          mev: 1.5,
          mrv: 4
        },
        {
          text: "Medium (75kg/100kg)",
          mev: 0.5,
          mrv: 2
        },
        {
          text: "Heavy (90kg/125kg)",
          mev: -0.5,
          mrv: -2
        },        {
          text: "Superheavy (90kg+/125kg+)",
          mev: -1.5,
          mrv: -4
        },
      ]
    },
    {
      question: "What is your height? (Use the former height if you are female and the latter height if you are male.)",
      options: [
        {
          text: "Short (160cm/170cm)",
          mev: 1.0,
          mrv: 2
        },
        {
          text: "Medium (167cm/182cm)",
          mev: 0.5,
          mrv: 1
        },
        {
          text: "Tall (175cm/195cm)",
          mev: -0.5,
          mrv: -1
        },        {
          text: "Very Tall (175cm+/195cm+)",
          mev: -1,
          mrv: -2
        },
      ]
    },
    {
      question: "What is your strength class by USPA standards?",
      options: [
        {
          text: "Low (Class III, IV)",
          mev: -.5,
          mrv: 1
        },
        {
          text: "Moderate (Class I, II)",
          mev: 0,
          mrv: 0
        },
        {
          text: "High (Master, Elite)",
          mev: 0.5,
          mrv: -1
        },        {
          text: "Very High (International Elite)",
          mev: 1,
          mrv: -3
        },
      ]
    },
    {
      question: "What is your experience level with lifting weights?",
      options: [
        {
          text: "Beginner (<4 years)",
          mev: -1.0,
          mrv: 0
        },
        {
          text: "Intermediate (4-8 years)",
          mev: -0.5,
          mrv: 2
        },
        {
          text: "Advanced (8-12 years)",
          mev: 0.5,
          mrv: 0
        },        {
          text: "Very Advanced (12+ years)",
          mev: 1,
          mrv: -2
        },
      ]
    },
    {
      question: "What is your age? ",
      options: [
        {
          text: "<19 years old",
          mev: -1,
          mrv: 2
        },
        {
          text: "20-29 years old",
          mev: -.5,
          mrv: 1
        },
        {
          text: "30-39 years old",
          mev: 0,
          mrv: 0
        },        {
          text: "40-49 years old",
          mev: .5,
          mrv: -2
        },
        {
          text: "50+ years old",
          mev: 1,
          mrv: -4
        }
      ]
    },
    {
      question: "Please rate your diet.",
      options: [
        {
          text: "Poor (insufficient calorie intake)",
          mev: 0.5,
          mrv: -3
        },
        {
          text: "Average (hitting macros)",
          mev: 0,
          mrv: 0
        },
        {
          text: "Good (good meal timing, macros, and overall intake)",
          mev: -0.5,
          mrv: 1
        },
      ]
    },
    {
      question: "Please rate your sleep quality.",
      options: [
        {
          text: "Poor (<5 hours/night)",
          mev: 0.5,
          mrv: -3
        },
        {
          text: "Average (5-7 hours/night)",
          mev: 0,
          mrv: 0
        },
        {
          text: "Good (7+ hours/night)",
          mev: -0.5,
          mrv: 1
        },
      ]
    },
    {
      question: "Please rate your stress outside of lifting.",
      options: [
        {
          text: "High stress",
          mev: 0.5,
          mrv: -3
        },
        {
          text: "Average stress",
          mev: 0,
          mrv: 0
        },
        {
          text: "Low stress",
          mev: -0.5,
          mrv: 1
        },
      ]
    },
    {
      question: "Please rate your historical recovery ability.",
      options: [
        {
          text: "Poor",
          mev: 0,
          mrv: -2
        },
        {
          text: "Below Average",
          mev: 0,
          mrv: -1
        },
        {
          text: "Average",
          mev: 0,
          mrv: 0
        },
        {
          text: "Above Average",
          mev: 0,
          mrv: 1
        },
        {
          text: "Exceptional",
          mev: 0,
          mrv: 2
        },
      ]
    },
    {
      question: "Do you take performance enhancing drugs?",
      options: [
        {
          text: "Yes",
          mev: 0,
          mrv: 3
        },
        {
          text: "No",
          mev: 0,
          mrv: 0
        }
      ]
    },
  ];

  useEffect(() => {
    db.collection('questions').doc('8gVdHO35vFxnwux6zhCT').set({questionArray: questionArray})
  });

  return <></>
}

export default Questions;