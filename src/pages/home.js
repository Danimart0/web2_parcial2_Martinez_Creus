import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Dessert');
  const [meals, setMeals] = useState([]);

  useEffect(() => {
      fetch('https://www.themealdb.com/api/json/v1/1/categories.php')   
      .then(res => res.json())
      .then(data => setCategories(data.categories));
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`)
        .then(res => res.json())
        .then(data => setMeals(data.meals || []));
    }
  }, [selectedCategory]);

  return (
     
    <div className="layout">
      <aside className="sidebar">
        <h2>Categorías</h2>
        <ul>
          {categories.map(cat => (
            <li key={cat.idCategory}>
              <button
                onClick={() => setSelectedCategory(cat.strCategory)}
                className={selectedCategory === cat.strCategory ? 'active' : ''}
              >
                <img
                  src={cat.strCategoryThumb}
                  alt={cat.strCategory}
                  className="category-thumb"
                />
                <span>{cat.strCategory}</span>
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <main className="content">
        <div className="search-bar">
          <input type="text" placeholder="Buscar recetas..." />
        </div>
        <h2 className="text-xl font-bold mb-4">Platillos de {selectedCategory}</h2>
        <div className="meal-grid">
          {meals.map(meal => (
            <Link to={`/recipe/${meal.idMeal}`} key={meal.idMeal} className="meal-card">
              <img src={meal.strMealThumb} alt={meal.strMeal} />
              <p>{meal.strMeal}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
