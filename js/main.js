  //     NavBar

  let navLinkWidth = $(".navLink").innerWidth();
  let navBarOffset = $(".navBar").offset().left;
  closNav()
  $(".closebtn").addClass("d-none");

  function closNav() {
      $(".navBar").animate({ "margin-left": `-${navLinkWidth}` }, 500);
      $(".closebtn").addClass("d-none");
      $(".openbtn").removeClass("d-none");

  }


  $(".openLink span").click(function() {
      let navBarOffset = $(".navBar").offset().left;
      if (navBarOffset == 0) {
          $(".closebtn").addClass("d-none");
          $(".openbtn").removeClass("d-none");
          $(".fade1 , .fade2, .fade3, .fade4, .fade5").animate({ "margin-top": "500px", "opacity": "0" }, 1);


          $(".navBar").animate({ "margin-left": `-${navLinkWidth}` }, 500);
      } else {
          $(".fade1 , .fade2, .fade3, .fade4, .fade5").animate({ "margin-top": "0px", "opacity": "1" }, 500);


          $(".closebtn").removeClass("d-none");
          $(".openbtn").addClass("d-none");
          $(".navBar").animate({ "margin-left": `0` }, 500);

      }
  })



  $(".navLink .search").click(function() {
      document.getElementById("search").classList.remove("d-none")

      $("#homedescMeal,#category, #home,#ingredients,#area,#contact").addClass("d-none")

      closNav()
  })
  $(".navLink .category").click(function() {
      document.getElementById("category").classList.remove("d-none")
      $("#homedescMeal,#search, #home,#ingredients,#area,#contact").addClass("d-none")

      closNav()
  })
  $(".navLink .area").click(function() {
      document.getElementById("area").classList.remove("d-none")

      $("#homedescMeal,#category, #home,#ingredients,#search,#contact").addClass("d-none")

      closNav()
  })
  $(".navLink .ingredients").click(function() {
      document.getElementById("ingredients").classList.remove("d-none")

      $("#homedescMeal,#category, #home,#search,#area,#contact").addClass("d-none")

      closNav()
  })
  $(".navLink .contact").click(function() {
          document.getElementById("contact").classList.remove("d-none")

          $("#homedescMeal,#category, #home,#ingredients,#area,#search").addClass("d-none")

          closNav()
      })
      //  END NAVBAR

  ///   START HOME

  async function getmeals(x) {
      let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${x}`)
      if (meals.status != 400) {
          mealRes = await meals.json()

          displayMeals()

      }
  }
  getmeals('')

  function displayMeals() {
      var arr = mealRes.meals

      var cartona = ""
      for (let i = 0; i < arr.length; i++) {

          cartona += `
            <div  onclick="getMeal('${arr[i].idMeal}')"  class="col-md-6 col-lg-3 position-relative overflow-hidden">
                <img src="${arr[i].strMealThumb}" class="w-100 rounded-2" alt="">
                     <div class="img-caption d-flex  align-items-center">
                       <h3 class='mx-auto'>${arr[i].strMeal}</h3>
                      
                </div>
            </div> 
        `

      }
      document.getElementById("home").innerHTML = cartona
  }
  ///   END HOME
  /////   START SEARCH

  async function search(a) {
      let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${a}`)
      if (meals.status != 400) {
          mealRes = await meals.json()
          displayMealsSearch()

      }
  }

  async function searchletter(L) {
      let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${L}`)
      if (meals.status != 400) {
          mealRes = await meals.json()
          displayMealsSearch()

      }
  }

  document.getElementById("searchName").addEventListener("keyup", a => { search(a.target.value) });
  document.getElementById("searchletter").addEventListener("keyup", L => { searchletter(L.target.value) });


  function displayMealsSearch() {
      var arr = mealRes.meals

      var cartona = ""
      for (let i = 0; i < arr.length; i++) {

          cartona += `
            <div onclick="getMeal('${arr[i].idMeal}')" class=" col-md-6 col-lg-3 position-relative overflow-hidden">
                <img src="${arr[i].strMealThumb}" class="w-100 rounded-2" alt="">
                     <div class="img-caption d-flex  align-items-center">
                       <h3 class='mx-auto'>${arr[i].strMeal}</h3>
                      
                </div>
            </div> 
        `

      }
      document.getElementById("searchMeals").innerHTML = cartona

  }

  /////   END SEARCH
  /////  START MEAL DESCRIPTION
  function getMeal(x) {
      displayOneMeal(x)
      $("#homedescMeal").removeClass("d-none")
      $("#category, #home,#ingredients,#search,#contact,#area").addClass("d-none")

  }

  async function displayOneMeal(id) {
      let x = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      if (x.status != 400) {
          meal = await x.json()

          displayMeal()
      }
  }

  function displayMeal() {
      let tags = meal.meals[0].strTags ? meal.meals[0].strTags.split(",") : ""
      let tagsStr = ""
      for (let i = 0; i < tags.length; i++) {
          tagsStr += `<li class="my-2 mx-1 p-1 alert-danger rounded">${tags[i]}</li>`
      }
      let cartona = `
        <div class="col-md-4  text-white">
    					<img class="w-100 rounded-2" src="${meal.meals[0].strMealThumb}" alt=""
    						>
    					<h1>${meal.meals[0].strMeal}</h1>
    				</div>
    				<div class="col-md-8  text-white text-left">
    					<h2>Instructions</h2>
    					<p>${meal.meals[0].strInstructions}</p>
    					<p><span class="fw-bolder">Area :</span> ${meal.meals[0].strArea}</p>
    					<p><span class="fw-bolder">Category :</span> ${meal.meals[0].strCategory}</p>
    					<h3>Recipes :</h3>
    					<ul class="d-flex  flex-wrap" id="recipes">
                        <li>${meal.meals[0].strMeasure1} ${meal.meals[0].strIngredient1}</li>
                        <li>${meal.meals[0].strMeasure2} ${meal.meals[0].strIngredient2}</li>
                        <li>${meal.meals[0].strMeasure3} ${meal.meals[0].strIngredient3}</li>
                        <li>${meal.meals[0].strMeasure4} ${meal.meals[0].strIngredient4}</li>
                        <li>${meal.meals[0].strMeasure5} ${meal.meals[0].strIngredient5}</li>
                        <li>${meal.meals[0].strMeasure6} ${meal.meals[0].strIngredient6}</li>
                       
    					</ul>

    					<h3 class="my-2 mx-1 p-1">Tags :
                        
                        </h3>
    					<ul class="d-flex my-2" id="tags">
                   
    					</ul>


    					<a class="btn btn-success text-white" target="_blank" href="${meal.meals[0].strSource}">Source</a>
    					<a class="btn btn-danger text-white" target="_blank" href="${meal.meals[0].strYoutube}">YouTube</a>
    				</div>`
      $("#homedescMeal").html(cartona);
      $("#tags").html(tagsStr);



  }


  /////  END MEAL DESCRIPTION

  /////  START CATEGORY

  async function category() {
      let category = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
      if (category.status != 400) {
          categoryList = await category.json()
          displaycategory()
      }

  }
  category()

  function displaycategory() {
      var array = categoryList.categories

      var cartona = ""
      for (let i = 0; i < array.length; i++) {

          cartona += `
              <div onclick="catName('${array[i].strCategory}')" class="category col-md-6 col-lg-3 position-relative overflow-hidden">
                  <img src="${array[i].strCategoryThumb}" class="w-100" alt="">
                    <div class="img-caption">
                       <h3  class='mx-auto'>${array[i].strCategory}</h3>
                       <P>${array[i].strCategoryDescription}</p>
                      
                </div>
              </div> 
          `

      }
      document.getElementById("categoryList").innerHTML = cartona


  }

  async function categorymeals(catName) {
      let ient = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${catName}`)
      if (ient.status != 400) {
          category = await ient.json()

          displayMealscategory()
      }

  }

  function catName(catName) {
      categorymeals(catName)
  }

  function displayMealscategory() {
      var array = category.meals

      var cartona = ""
      for (let i = 0; i < array.length; i++) {

          cartona += `
                 <div onclick="getMeal('${array[i].idMeal}')" class=" col-md-6 col-lg-3 position-relative overflow-hidden">
                    <img  src="${array[i].strMealThumb}" class="w-100 rounded-2" alt="">
                         <div class="img-caption d-flex  align-items-center">
                           <h3 class='mx-auto'>${array[i].strMeal}</h3>
                     </div>
                  </div> 
              `

      }
      document.getElementById("categoryList").innerHTML = cartona


  }

  /////  END CATEGORY
  /////  START AREA

  async function area() {
      let area = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
      if (area.status != 400) {
          areaList = await area.json()
          displayarea()
      }

  }
  area()


  function displayarea() {
      var array = areaList.meals

      var cartona = ""
      for (let i = 0; i < array.length; i++) {

          cartona += `
              <div class="area col-md-6 col-lg-3 text-center" onclick="getArea('${array[i].strArea}')">


                  <i class="fa-solid fa-city fa-3x text-danger mb-1"></i>
                
                       <h5 id="h5" class="text-black fw-bold" data-n="${array[i].strArea}">${array[i].strArea}</h5>

                     
                 
              </div> 
          `

      }
      document.getElementById("areaList").innerHTML = cartona


  }

  async function filterByArea(area) {

      let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
      mealsArea = await meals.json()

      displayAreaMeals()
  }
  //   

  function getArea(areaName) {
      filterByArea(areaName)
  }

  function displayAreaMeals() {
      var arr = mealsArea.meals

      var cartona = ""
      for (let i = 0; i < arr.length; i++) {

          cartona += `
            <div onclick="getMeal('${arr[i].idMeal}')" class="col-md-6 col-lg-3 position-relative overflow-hidden">
                <img src="${arr[i].strMealThumb}" class="w-100 rounded-2" alt="">
                     <div class="img-caption d-flex  align-items-center">
                       <h3 class='mx-auto'>${arr[i].strMeal}</h3>
                      
                </div>
            </div> 
        `

      }
      document.getElementById("areaList").innerHTML = cartona


  }
  /////  END AREA
  /////  START ingredient

  async function ingredient() {
      let ient = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
      if (ient.status != 400) {
          ingredients = await ient.json()
          displayingredients()
      }

  }
  ingredient()



  async function ingredientmeals(ingName) {
      let ient = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingName}`)
      if (ient.status != 400) {
          ingredients = await ient.json()

          displayMeslsingredients()
      }

  }

  function getIngr(ingName) {

      ingredientmeals(ingName)

  }



  function displayingredients() {
      var array = ingredients.meals
      var cartona = ""
      for (let i = 0; i < array.length; i++) {

          cartona += `
              <div  onclick="getIngr('${array[i].strIngredient}')" class="ingredients  col-md-6 col-lg-3 text-center">


                 <i class="fa-solid fa-bowl-food fa-3x "></i>
                
                       <h3 class="text-white" >${array[i].strIngredient}</h3>
                         <p class="text-white">${array[i].strDescription ? array[i].strDescription.split(" ").splice(0, 20).join(" ")+"...Read More" : "This is An Amazing Meal"}</p>
                     
                 
              </div> 
          `

      }
      document.getElementById("ingredientsList").innerHTML = cartona


  }

  function displayMeslsingredients() {
      var array = ingredients.meals

      var cartona = ""
      for (let i = 0; i < array.length; i++) {

          cartona += `
            
                
             <div onclick="getMeal('${array[i].idMeal}')" class="ingredients col-md-6 col-lg-3 position-relative overflow-hidden">
                <img src="${array[i].strMealThumb}" class="w-100 rounded-2" alt="">
                     <div class="img-caption d-flex  align-items-center">
                       <h3 class='mx-auto'>${array[i].strMeal}</h3>
                      
                 </div>
            
                     
                 
              </div> 
          `

      }
      document.getElementById("ingredientsList").innerHTML = cartona


  }
  /////  END ingredient

  ////START VALIDATION
  $("#contact input").keyup(function(e) {




      if (NameValid()) {
          $("#invalidname").text(" ");
          $("#userName").css("border-bottom", "10px solid green");
      } else {
          $("#invalidname").text("Special Characters and Numbers not allowed");
          $("#userName").css("border-bottom", "0px ");

      }


      if (EmailValid()) {
          $("#invalidemail").text(" ");
          $("#userEmail").css("border-bottom", "10px solid green");
      } else {
          $("#invalidemail").text("Enter valid email. *Ex: xxx@yyy.zzz");
          $("#userEmail").css("border-bottom", "0px ");

      }

      if (PhoneValid()) {
          $("#invalidphone").text(" ");
          $("#userPhone").css("border-bottom", "10px solid green");
      } else {
          $("#invalidphone").text("Phone Not Valid");
          $("#userPhone").css("border-bottom", "0px ");

      }




      if (PasswordValid()) {
          $("#invalidpassword").text(" ");
          $("#userPassword").css("border-bottom", "10px solid green");
      } else {
          $("#invalidpassword").text("Enter valid password *Minimum eight characters, at least one letter and one number:*");
          $("#userPassword").css("border-bottom", "0px ");

      }

      if (RePasswordValid()) {
          $("#invalidrepassword").text(" ");
          $("#userRePassword").css("border-bottom", "10px solid green");
      } else {
          $("#invalidrepassword").text("Password Not Valid");
          $("#userRePassword").css("border-bottom", "0px ");

      }

      if (AgeValid()) {
          $("#invalidage").text(" ");
          $("#userAge").css("border-bottom", "10px solid green");
      } else {
          $("#invalidage").text("Age Not Valid");
          $("#userAge").css("border-bottom", "0px ");

      }

      if (NameValid() && EmailValid() && PhoneValid() && AgeValid() && PasswordValid() && RePasswordValid()) {

          $("#submit").removeAttr("disabled");
      } else {
          $("#submit").attr("disabled", "true");
      }


  });

  function NameValid() {
      return /^[a-zA-Z ]+$/.test(userName.value)
  }

  function EmailValid() {
      return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(userEmail.value)
  }

  function PhoneValid() {
      return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(userPhone.value)
  }

  function AgeValid() {
      return /^[1-9][0-9]?$|^100$/.test(userAge.value)
  }

  function PasswordValid() {
      return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(userPassword.value)
  }

  function RePasswordValid() {
      return userPassword.value == userRePassword.value
  }

  ////END VALIDATION

  $(document).ready(function() {
      $(".loader").fadeOut(2000, function() {
          $(".spiner").fadeOut(500)
          $("body").css("overflow", "auto")
      });

  })