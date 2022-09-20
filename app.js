const searchBtn= document.getElementById('search-btn');
const mealList=document.getElementById('meal');
mealDetailsContent=document.querySelector('.meal-details-content');
const recipeCloseBtn=document.getElementById('recipe-close-btn');

// event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', ()=>{
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});

// get meallist that match the ingredients
function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(res=> res.json())
    .then(data=> {
        let html= "";
        if(data.meals){
            data.meals.forEach(meal => {
                html+=`
                <div  class="meal-item" data-id="${meal.idMeal}">
                    <div class="meal-img">
                        <img src="${meal.strMealThumb}" alt="food">
                    </div>
                    <div class="meal-name">
                        <h3>${meal.strMeal}</h3>
                        <a href="#" class="recipe-btn">Get Recipe</a>
                    </div>
                </div>
                `;
            
            });
            
        
        
        }else{
            html="Sorry! It is not found.";
        }


        mealList.innerHTML=html;
        mealList.classList.add('not-found');
    })
}

function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem=e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(res=>res.json())
        .then(data=> mealRecipeModal(data.meals))
    }
}

// create a modal
function mealRecipeModal(meal){
    meal=meal[0];
    let html = `
    <div class="meal-details-content">
    <h2 class="recipe-title">${meal.strMeal}</h2>
    <p class="recipe-category">${meal.strCategory}</p>
    <div class="recipe-instruct">
        <h3>Ingredients:</h3>
        <ul id="ingredient-style">
        <li>${meal.strIngredient1}</li>
        <li>${meal.strIngredient2}</li>
        <li>${meal.strIngredient3}</li>
        <li>${meal.strIngredient4}</li>
        <li>${meal.strIngredient5}</li>
        <li>${meal.strIngredient6}</li>
        <li>${meal.strIngredient7}</li>
        <li>${meal.strIngredient8}</li>
        <li>${meal.strIngredient9}</li>
        <li>${meal.strIngredient10}</li>
        <li>${meal.strIngredient11}</li>
        <li>${meal.strIngredient12}</li>
        <li>${meal.strIngredient13}</li>
        <li>${meal.strIngredient14}</li>
        <li>${meal.strIngredient15}</li>
        <li>${meal.strIngredient16}</li>
        <li>${meal.strIngredient17}</li>
        <li>${meal.strIngredient18}</li>
        <li>${meal.strIngredient19}</li>
        </ul>
    </div>
   </div>
      <div class="recipe-meal-img">
        <img src="${meal.strMealThumb}" alt="">
   <div class="recipe-link">
        <a href="${meal.strYoutube}" target="_blank">watch vedio</a>
    </div>
    
    `
    mealDetailsContent.innerHTML=html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}

