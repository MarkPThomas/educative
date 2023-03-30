// A list of recipes a chef can prepare from the supplied items is given.

// Ingredients required to prepare a recipe are mentioned in the ingredients list.

// The ith recipe has the name recipes_i, and you can create it if you have all the needed ingredients from the ingredients_i list.

// A recipe may be listed as an ingredient in a different recipe.

// For example, the input may specify that custard is an ingredient in a trifle recipe or that trifle is an ingredient
// in a custard recipe.

// Identify which recipes a chef can prepare from the given ingredients from the supplies list.

// Note: It is also considered valid input for two recipes to list each other in their ingredients.

// For example, the input may specify that custard is an ingredient in a trifle recipe and also that trifle is an ingredient
// in a custard recipe.

// Of course, if those are the only two recipes provided in the input, the expected output is an empty list.

export function findRecipes(recipes, ingredients, supplies) {
  const dependencies = {};
  const numberOfIngredients = {};

  for (let i = 0; i < recipes.length; i++) {
    dependencies[recipes[i]] = ingredients[i];
    numberOfIngredients[recipes[i]] = ingredients[i].length;
  }

  // See what recipes can be made directly from supplies
  supplies.forEach((supply) => {
    for (let i = 0; i < recipes.length; i++) {
      const recipeIngredients = dependencies[recipes[i]];
      recipeIngredients.forEach((recipeIngredient) => {
        if (supply === recipeIngredient) {
          numberOfIngredients[recipes[i]]--;
        }
      });
    }
  });

  const possibleRecipes = new Set();

  // Account for recipes that depend on other recipes
  const completedRecipes = [];
  for (let i = 0; i < recipes.length; i++) {
    updateQueue(recipes[i], completedRecipes, numberOfIngredients, possibleRecipes);
  }
  while (completedRecipes.length) {
    const recipeAsIngredient = completedRecipes.shift();
    recipes.forEach((recipe) => {
      const recipeIngredients = dependencies[recipe];
      recipeIngredients.forEach((recipeIngredient) => {
        if (recipeAsIngredient === recipeIngredient) {
          numberOfIngredients[recipe]--;
          updateQueue(recipe, completedRecipes, numberOfIngredients, possibleRecipes);
        }
      });
    });
  }

  // Gather up any remaining completed recipes
  recipes.forEach((recipe) => {
    updateQueue(recipe, completedRecipes, numberOfIngredients, possibleRecipes);
  });

  return Array.from(possibleRecipes);
}

function updateQueue(recipe, completedRecipes, numberOfIngredients, possibleRecipes) {
  if (numberOfIngredients[recipe] === 0) {
    completedRecipes.push(recipe);
    possibleRecipes.add(recipe);
    numberOfIngredients[recipe]--;
  }
}