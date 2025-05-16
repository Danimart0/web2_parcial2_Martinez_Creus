import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css';
import pinaImg from '../items/pinaf.png'; 

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Dessert');
  const [meals, setMeals] = useState([]);
  const [search, setSearch] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

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

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredMeals = meals.filter(meal =>
    meal.strMeal.toLowerCase().includes(search.toLowerCase())
  );

  const sortMealsByName = () => {
    const sorted = [...filteredMeals].sort((a, b) => a.strMeal.localeCompare(b.strMeal));
    setMeals(sorted);
  };

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
        <div className="hero-section"><div className="hero-image-wrapper">
            <img src={pinaImg} alt="Decoración de piña" />
          </div>
          <div className="hero-content">
            <h5 className="hero-title">👨‍🍳HomeChef</h5>
            <h1 className="line1">Chefs</h1>
             <h1 className="line2">Academy</h1>
             <h1 className="line3">Secrets</h1>
             <p className="hero-description">New recipe for you to try out, let's cook!</p>
          </div>
          
        </div>

        <div className="search-bar-wrapper">
          <input
            type="text"
            placeholder="Buscar recetas..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {isMobile && (
            <button onClick={sortMealsByName} className="sort-button">
              Sort by Name
            </button>
          )}
        </div>

        <h2>Platillos de {selectedCategory}</h2>
        <div className="meal-grid">
          {filteredMeals.map(meal => (
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
