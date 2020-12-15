const main = () => {
	const mealsContainer = document.querySelector('#meals')
	const title = document.querySelector('h1')
	const searchButton = document.querySelector('#search-button')
	const searchInput = document.querySelector('#search-input')
	let meals = mealsContainer.querySelectorAll('meal-item')

	const firstPageLoaded = meals => {
		meals.forEach(meal => {
			fetch('https://www.themealdb.com/api/json/v1/1/random.php')
				.then(response => {
	                if(response.status === 200) {
	                    return response.json();
	                } else {
	                    return Promise.reject('Failed to fetch data');
	                }
	            })
				.then(responseJson => {
					const mealData = responseJson.meals[0]
					const mealImg = meal.querySelector('img')
					const mealName = meal.querySelector('span')

					mealImg.setAttribute('src', mealData.strMealThumb)
					mealImg.setAttribute('alt', mealData.strMeal)
					mealName.innerText = mealData.strMeal
				})
				.catch(message => {
					mealsContainer.innerHTML = `<span>${message}</span>`
				})
		})
	}

	const clickHandler = () => {
		fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput.value}`)
			.then(response => {
                if(response.status === 200) {
                    return response.json();
                } else {
                    return Promise.reject('Failed to fetch data');
                }
            })
			.then(responseJson => {
				mealsContainer.innerHTML = ''
				title.innerText = `Result(s) for '${searchInput.value}'`

				const mealData = responseJson.meals
				let mealItems = ''

				if(mealData) {
					for(let i = 0; i < mealData.length; i++) {
						mealItems += '<meal-item></meal-item>'
					}

					mealsContainer.innerHTML = mealItems

					meals = mealsContainer.querySelectorAll('meal-item')

					meals.forEach((meal, index) => {
						const mealImg = meal.querySelector('img')
						const mealName = meal.querySelector('span')

						mealImg.setAttribute('src', mealData[index].strMealThumb)
						mealImg.setAttribute('alt', mealData[index].strMeal)
						mealName.innerText = mealData[index].strMeal
					})
				}
			})
			.catch(message => {
				mealsContainer.innerHTML = `<span>${message}</span>`
			})

	}

	searchButton.addEventListener('click', clickHandler)

	firstPageLoaded(meals)
}

export default main;