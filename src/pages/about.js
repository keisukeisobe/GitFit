import React, {useState} from 'react';

function About() {
  return (
    <div>
      <p><a href="/assessment">MRV assessment:</a> Take a quick assessment to determine your MEV and MRV modifiers based on your demographic information.</p>
      <p><a href="/mrv">MRV results:</a> See how your MRV modifiers will adjust the amount of weekly volume you should be aiming for in the compound lifts.</p>
      <p><a href="/musclegroups">Hypertrophy goals:</a> Adjust your personal goals for each muscle group (maintain vs. grow).</p>
      <p><a href="/compounds">Compound lift selection:</a> Select your compound lifts and variant compound lifts for your program.</p>
      <p><a href="/accessories">Accessory lift selection:</a> INCOMPLETE: Select your accesory (non-compound, hypertrophy-foucsed) exercises.</p>
      <p><a href="/workout">Weekly workout program:</a> INCOMPLETE: Based on your hypertrophy and strength goals, view a rough output of your weekly exercise selection.</p>
      <p><a href="/postexercise">Add an exercise:</a> Add an exercise to the database.</p>
      <p><a href="/login">Login:</a> Login via your Google Account.</p>
    </div>
  )
}

export default About;