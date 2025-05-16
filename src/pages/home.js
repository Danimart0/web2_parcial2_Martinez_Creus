import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
      .then(res => res.json())
      .then(data => setCategories(data.categories));
  }, []);

  return (
    <div className="p-4 grid gap-4 md:grid-cols-3">
      {categories.map(cat => (
        <Link to={`/category/${cat.strCategory}`} key={cat.idCategory} className="category">
          <img src={cat.strCategoryThumb} alt={cat.strCategory} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h2 className="text-xl font-semibold">{cat.strCategory}</h2>
           
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Home;
