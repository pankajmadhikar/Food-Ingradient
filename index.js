const searchBtn = document.getElementById("search-btn");
const mealList = document.getElementById("meal");
const mealDetailsContent = document.querySelector(".meal-details-content");
const recipeCloseBtn = document.getElementById("recipe-close-btn");

// event listener
searchBtn.addEventListener("click", () => {
  let searchInputText = document.getElementById("search-input").value.trim();
  fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputText}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("data", data);
      let html = "";
      if (data.meals) {
        data.meals.forEach((meal) => {
          html += `
            <div class="meal-item" data-id="${meal.idMeal}">
            <div class="meal-img">
              <img src="${meal.strMealThumb}" alt="food" />
            </div>
            <div class="meal-name">
              <h3>${meal.strMeal}</h3>
              <a href="#" class="recipe-btn">Get Recipe</a>
            </div>
          </div>
            `;
        });
        mealList.classList.remove("notFound");
      } else {
        html = "sorry,we didn't find any meal";
        mealList.classList.add("notFound");
      }
      mealList.innerHTML = html;
    });
});

mealList.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("recipe-btn")) {
    let mealItem = e.target.parentElement.parentElement;
    fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`
    )
      .then((response) => response.json())
      .then((data) => mealRecipeModel(data.meals));
  }
});

// create model
function mealRecipeModel(meal) {
  meal = meal[0];
  let html = `
  <h2 class="recipe-title">${meal.strMeal}</h2>
  <p class="recipe-category">${meal.strCategory}</p>
  <div class="recipe-instruct">
    <h3>Instruction:</h3>
    <p>
     ${meal.strInstructions}
    </p>
   
  </div>
  <div class="recipe-meal-img">
    <img src="${meal.strMealThumb}" alt="food" />
  </div>
  <div class="recipe-link">
    <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
  </div>
  `;
  mealDetailsContent.innerHTML = html;
  mealDetailsContent.parentElement.classList.add("showRecipe");
}

recipeCloseBtn.addEventListener("click", () => {
  mealDetailsContent.parentElement.classList.remove("showRecipe");
});
