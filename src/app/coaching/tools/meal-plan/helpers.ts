import { type CoachingMealPlanMeal } from "./useCoachingMealPlanState";

export const getMealPlanTotals = (meals: CoachingMealPlanMeal[]) => {
  return meals.reduce(
    (acc, meal) => {
      const mealTotal = meal.foods.reduce(
        (acc, food) => {
          return {
            protein: acc.protein + food.calculatedProtein,
            carbs: acc.carbs + food.calculatedCarbs,
            fat: acc.fat + food.calculatedFat,
            calories: acc.calories + food.calculatedCalories,
          };
        },
        { protein: 0, carbs: 0, fat: 0, calories: 0 },
      );

      return {
        protein: acc.protein + mealTotal.protein,
        carbs: acc.carbs + mealTotal.carbs,
        fat: acc.fat + mealTotal.fat,
        calories: acc.calories + mealTotal.calories,
      };
    },
    { protein: 0, carbs: 0, fat: 0, calories: 0 },
  );
};

export const calculateMealTotals = (meal: CoachingMealPlanMeal) => {
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFat = 0;
  let totalCalories = 0;

  meal.foods.forEach((food) => {
    totalProtein += food.calculatedProtein;
    totalCarbs += food.calculatedCarbs;
    totalFat += food.calculatedFat;
    totalCalories += food.calculatedCalories;
  });

  return {
    totalProtein,
    totalCarbs,
    totalFat,
    totalCalories,
  };
};
