// src/components/MovieCard.js
import React from 'react';

function MovieCard({ movie }) {
  return (
    <div>
      <img src={movie.Poster} alt={movie.Title} />
      <h2>{movie.Title}</h2>
      <p>Рейтинг: {movie.imdbRating}</p>
    </div>
  );
}

export default MovieCard;
