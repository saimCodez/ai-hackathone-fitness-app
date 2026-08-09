/* js/storage.js - central localStorage helpers for the application
   This module stores data in browser localStorage using key names
   that are easy to read and reuse across pages. */

const STORAGE_KEYS = {
  user: 'aiFitnessCoach.user',
  fitnessGoal: 'aiFitnessCoach.fitnessGoal',
  bmi: 'aiFitnessCoach.bmi',
  calories: 'aiFitnessCoach.calories',
  workoutData: 'aiFitnessCoach.workoutData',
  dietData: 'aiFitnessCoach.dietData',
  habitData: 'aiFitnessCoach.habitData',
  waterData: 'aiFitnessCoach.waterData',
  mealData: 'aiFitnessCoach.mealData',
  workoutTracking: 'aiFitnessCoach.workoutTracking',
  streak: 'aiFitnessCoach.streak'
};

function parseJSON(value) {
  if (typeof value !== 'string') {
    return null;
  }

  try {
    return JSON.parse(value);
  } catch (error) {
    console.warn('storage.js: invalid JSON for localStorage value', error);
    return null;
  }
}

function saveItem(key, value) {
  if (value === undefined) {
    return;
  }

  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('storage.js: failed to save item', key, error);
  }
}

function getItem(key) {
  const value = localStorage.getItem(key);
  return parseJSON(value);
}

function removeItem(key) {
  localStorage.removeItem(key);
}

export function saveUser(user) {
  if (!user || typeof user !== 'object') {
    return;
  }

  const safeUser = {
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    email: user.email || '',
    createdAt: user.createdAt || new Date().toISOString()
  };

  saveItem(STORAGE_KEYS.user, safeUser);
}

export function getUser() {
  return getItem(STORAGE_KEYS.user) || null;
}

export function removeUser() {
  removeItem(STORAGE_KEYS.user);
}

export function saveFitnessGoal(goal) {
  saveItem(STORAGE_KEYS.fitnessGoal, goal);
}

export function getFitnessGoal() {
  return getItem(STORAGE_KEYS.fitnessGoal) || null;
}

export function saveBMI(bmiValue) {
  saveItem(STORAGE_KEYS.bmi, bmiValue);
}

export function getBMI() {
  return getItem(STORAGE_KEYS.bmi) || null;
}

export function saveCalories(calorieData) {
  saveItem(STORAGE_KEYS.calories, calorieData);
}

export function getCalories() {
  return getItem(STORAGE_KEYS.calories) || null;
}

export function saveWorkoutData(data) {
  saveItem(STORAGE_KEYS.workoutData, data);
}

export function getWorkoutData() {
  return getItem(STORAGE_KEYS.workoutData) || null;
}

export function saveDietData(data) {
  saveItem(STORAGE_KEYS.dietData, data);
}

export function getDietData() {
  return getItem(STORAGE_KEYS.dietData) || null;
}

export function saveHabitData(data) {
  saveItem(STORAGE_KEYS.habitData, data);
}

export function getHabitData() {
  return getItem(STORAGE_KEYS.habitData) || null;
}

export function saveWaterData(data) {
  saveItem(STORAGE_KEYS.waterData, data);
}

export function getWaterData() {
  return getItem(STORAGE_KEYS.waterData) || null;
}

export function saveMealData(data) {
  saveItem(STORAGE_KEYS.mealData, data);
}

export function getMealData() {
  return getItem(STORAGE_KEYS.mealData) || null;
}

export function saveWorkoutTracking(data) {
  saveItem(STORAGE_KEYS.workoutTracking, data);
}

export function getWorkoutTracking() {
  return getItem(STORAGE_KEYS.workoutTracking) || null;
}

export function saveStreak(streakValue) {
  saveItem(STORAGE_KEYS.streak, streakValue);
}

export function getStreak() {
  return getItem(STORAGE_KEYS.streak) || null;
}

export function clearAllUserData() {
  Object.values(STORAGE_KEYS).forEach(removeItem);
}

