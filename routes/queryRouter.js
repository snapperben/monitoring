const express = require('express');
const router = express.Router();
const recipeStore = require('../src/recipeStore');

router.get('/recipeDetails',  function(request, response) {
  const recipeStore = require('../src/recipeStore');
  let status = 0,
  result = '{}';

  try {
	  let apiKey = request.query.apikey || '',
		  apiKeyValid = recipeStore.validateApiKey(apiKey),
		  receipeId = request.query.id,
		  recipe = null,
		  hasRecipeId = receipeId !== undefined,
		  recipeExists = apiKeyValid ? recipeStore.recipeExists(receipeId) : false;

	  if (apiKeyValid !== true) {
		  status = 403;
	  } else if (hasRecipeId !== true) {
		  status = 400;
	  } else if (recipeExists !== true) {
		  status = 404;
	  } else {
		  recipe = recipeStore.getRecipe(receipeId);
		  result = recipe;
		  status = 200;
	  }
  } catch (e) {
	  result = {error:"Failed :"+e};
	  status = 500;
  }
  response.status(status).json(result);
});

module.exports = router;