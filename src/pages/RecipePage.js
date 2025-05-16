import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/recibe.css';
const RecipePage = () => {
  const { id } = useParams();  // Aquí cambia mealId por id
  const [meal, setMeal] = useState(null);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.meals && data.meals.length > 0) {
          const mealData = data.meals[0];
          setMeal(mealData);

          const ingr = [];
          for (let i = 1; i <= 20; i++) {
            const name = mealData[`strIngredient${i}`];
            const measure = mealData[`strMeasure${i}`];
            if (name && name.trim()) {
              ingr.push(`${measure} ${name}`);
            }
          }
          setIngredients(ingr);
        } else {
          setMeal(null);
        }
      })
      .catch(() => setMeal(null));
  }, [id]);

  const removeIngredient = (index) => {
    const updated = ingredients.filter((_, i) => i !== index);
    setIngredients(updated);
  };

  if (!meal) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">{meal.strMeal}</h1>
      <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full md:w-1/2 rounded-lg mb-4" />
      <p><strong>ID:</strong> {meal.idMeal}</p>
      <p><strong>Categoría:</strong> {meal.strCategory}</p>
      <div className="my-4">
        <h2 className="text-xl font-semibold">Instrucciones</h2>
        <p>{meal.strInstructions}</p>
      </div>
      {meal.strYoutube && (
        <p>
          <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
            Ver en YouTube
          </a>
        </p>
      )}
      {meal.strSource && (
        <p>
          <a href={meal.strSource} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
            Página web
          </a>
        </p>
      )}
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Ingredientes</h2>
        <ul>
          {ingredients.map((ingr, index) => (
            <li key={index} className="flex justify-between items-center mb-1">
              <span>{ingr}</span>
              <button onClick={() => removeIngredient(index)} className="text-red-500 hover:text-red-700">
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecipePage;
