import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from './components/MovieList';
import SearchBar from './components/SearchBar';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);  // Состояние для фильмов
  const [error, setError] = useState(null);   // Состояние для ошибок

  // Загрузка фильмов при запуске приложения (с использованием useEffect)
  useEffect(() => {
    // Эта функция будет вызвана при монтировании компонента
    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://online-cinema-server-theta.vercel.app/movies'); // Замените на свой URL API или JSON
        if (response.data && response.data.Search) {
          setMovies(response.data.Search); // Сохраняем фильмы в состоянии
          setError(null);  // Если фильмы найдены, сбрасываем ошибку
        } else {
          setMovies([]);  // Если фильмов нет, очищаем список
          setError('Фильмы не найдены');  // Устанавливаем сообщение об ошибке
        }
      } catch {
        setError('Ошибка при получении данных. Попробуйте снова.');  // Устанавливаем ошибку
        setMovies([]);  // Очищаем список фильмов при ошибке
      }
    };

    fetchMovies();  // Вызываем функцию загрузки фильмов
  }, []);  // Пустой массив зависимостей — это означает, что эффект сработает только один раз при монтировании компонента

  // Обработчик поиска
  const handleSearch = async (searchTerm) => {
    try {
      const response = await axios.get('https://online-cinema-server-theta.vercel.app/movies', {
        params: { search: searchTerm }
      });

      if (response.data.Search && response.data.Search.length > 0) {
        setMovies(response.data.Search);
        setError(null);
      } else {
        setMovies([]);
        setError('Фильмы не найдены');
      }
    } catch {
      setError('Ошибка при получении данных. Попробуйте снова.');
      setMovies([]);
    }
  };

  return (
    <div className="app-container">
      <h1 className="header">Онлайн-кинотеатр</h1>
      <SearchBar onSearch={handleSearch} />
      {error && <p className="error-message">{error}</p>}
      <MovieList movies={movies} />
    </div>
  );
}

export default App;
