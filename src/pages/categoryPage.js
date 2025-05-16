

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function CategoryPage() {
  const { categoryName } = useParams();
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`)
      .then(res => res.json())
      .then(data => setMeals(data.meals));
  }, [categoryName]);

  return (
    <div className="container">
      <h1>Platillos de {categoryName}</h1>
      <div className="meal-grid">
        {meals.map(meal => (
          <Link key={meal.idMeal} to={`/recipe/${meal.idMeal}`} className="meal-card">
            <img src={meal.strMealThumb} alt={meal.strMeal} />
            <p>{meal.strMeal}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;
