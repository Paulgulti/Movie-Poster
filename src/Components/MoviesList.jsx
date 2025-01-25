import React from 'react'
import ContainerHeading from './ContainerHeading'

const MoviesList = ({ movies, addToFav, favourites, removeFav }) => {

  return (
    <div>
      {movies.map(movie => {
        return (
          <div key={movie.imdbID} className='movie-card' >
            <img src={movie.Poster} />
            <div className='overlay'>
              {favourites.some(favmovie => favmovie.imdbID === movie.imdbID) ?
                <button className='remove-fav-btn' onClick={() => removeFav(movie.imdbID)}>Remove </button>
                :
                <button className="add-to-fav-btn" onClick={() => addToFav(movie)}>Add to Favourites</button>
              }
            </div>
          </div>
        )
      }
      )}
    </div>
  )
}

export default MoviesList
