// src/components/SearchBar.js
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState('');

  // Обработчик изменения текста
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  // Обработчик нажатия на кнопку поиска
  const handleSearchClick = () => {
    onSearch(input);
  };

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Поиск фильмов..."
      />
      <button onClick={handleSearchClick}>Найти</button>
    </div>
  );
};

export default SearchBar;
