import React, {useState, useEffect} from 'react';
import {db} from '../services/firebase';

const exerciseList = ['Hanging Knee Raise', 'Hanging Straight Leg Raise', 'Machine Crunch', 'Reaching Situp', 'Rope Crunch', 'V-Up', 'Barbell Bent Over Row', 'Barbell Bent Over Row to Chest', 'Underhand EZ Bar Row to Stomach', 'Chest Supported Row', 'Incline Dumbbell Row', 'Supported Single Arm Dumbbell Row', 'Inverted Row', 'Seated Cable Row', 'Pullup', 'Chinup', 'Lat Pulldown', 'Dumbbell Pullover', 'Machine Pullover', 'Barbell Curl', 'EZ Bar Curl', 'Close Grip Barbell Curl', 'Dumbbell Curl', 'Cable Curl', 'Hammer Curl', 'Preacher Curl', 'Dumbbell Twist Curl', 'Cable Twist Curl', 'Standing Calf Machine', 'Seated Calf Machine', 'Leg Press Calf Extension', 'Barbell Calf Raise', 'Stair Calf Raise', 'Bench Press', 'Wide Grip Bench Press', 'Close Grip Bench Press', 'Incline Bench Press', 'Wide Grip Incline Bench Press', 'Close Grip Incline Bench Press', 'Flat Dumbbell Bench Press', 'Flat Machine Bench Press', 'Pushup', 'Close Grip Pushup', 'Dumbbell Incline Press', 'Flat Dumbbell Flye', 'Incline Dumbbell Flye', 'Cable Flye', 'Machine Chest Flye', 'Barbell Wrist Curl', 'Dumbbell Wrist Curl', 'Machine Wrist Curl', 'Overhead Press', 'Behind The Neck Overhead Press', 'Seated Overhead Press', 'Dumbbell Overhead Press', 'Seated Dumbbell Overhead Press', 'Machine Shoulder Press', 'Barbell Lunge', 'Dumbbell Lunge', 'Sumo Squat', 'Deficit Deadlift', 'Sumo Deadlift', 'Conventional Deadlift', 'Trap Bar Deadlift', 'Stiff-Legged Deadlift', 'Romanian Deadlift', 'Good Morning', 'Back Raise', 'Lying Leg Curl', 'Seated Leg Curl', 'High Bar Back Squat', 'Low Bar Back Squat', 'Paused High Bar Back Squat', 'Paused Low Bar Back Squat', 'Front Squat', 'Leg Press', 'Hack Squat', 'Bulgarian Split Squat', 'Barbell Facepull', 'Dumbbell Facepull', 'Cable Facepull', 'Dumbbell Rear Lateral Raise', 'Barbell Upright Row', 'Dumbbell Upright Row', 'Cable Upright Row', 'Dumbbell Side Lateral Raise', 'Thumbs Down Dumbbell Side Lateral Raise', 'Barbell Shrug', 'Dumbbell Shrug', 'Barbell Triceps Overhead Extension', 'Dips', 'Barbell Skullcrusher', 'Cable Overhead Triceps Extension', 'Cable Single Arm Pushdown', 'Cable Triceps Pushdown', 'Dumbbell Skullcrusher', 'EZ Bar Overhead Triceps Extension', 'Inverted Skullcrusher', 'Machine Triceps Extension', 'Machine Triceps Pushdown', 'Rope Overhead Triceps Extension'];

const categoryList = ['abs', 'abs', 'abs', 'abs', 'abs', 'abs', 'backHorizontal', 'backHorizontal', 'backHorizontal', 'backHorizontal', 'backHorizontal', 'backHorizontal', 'backHorizontal', 'backHorizontal', 'backVertical', 'backVertical', 'backVertical', 'backVertical', 'backVertical', 'biceps', 'biceps', 'biceps', 'biceps', 'biceps', 'biceps', 'biceps', 'biceps', 'biceps', 'calves', 'calves', 'calves', 'calves', 'calves', 'chest', 'chest', 'chest', 'chest', 'chest', 'chest', 'chest', 'chest', 'chest', 'chest', 'chest', 'chest', 'chest', 'chest', 'chest', 'forearms', 'forearms', 'forearms', 'frontDeltoids', 'frontDeltoids', 'frontDeltoids', 'frontDeltoids', 'frontDeltoids', 'frontDeltoids', 'glutes', 'glutes', 'glutes', 'glutes', 'glutes', 'glutes', 'glutes', 'hamstrings', 'hamstrings', 'hamstrings', 'hamstrings', 'hamstrings', 'hamstrings', 'quads', 'quads', 'quads', 'quads', 'quads', 'quads', 'quads', 'quads', 'rearDeltoids', 'rearDeltoids', 'rearDeltoids', 'rearDeltoids', 'sideDeltoids', 'sideDeltoids', 'sideDeltoids', 'sideDeltoids', 'sideDeltoids', 'traps', 'traps', 'triceps', 'triceps', 'triceps', 'triceps', 'triceps', 'triceps', 'triceps', 'triceps', 'triceps', 'triceps', 'triceps', 'triceps'];

const exerciseObject = {};

for (let i = 0; i < exerciseList.length; i++){
  exerciseObject[exerciseList[i]] = {
      name: exerciseList[i],
      muscleGroup: categoryList[i],
      e1rm: 0,
      trainingMax: 0,
      increment: 5,
      history: {}
  }
}

function Temp(){
  db.collection('exercises').doc('5BEKrKo63WKoVVVLF1mc').set(exerciseObject, {merge: true});
  return <></>
}

export default Temp;