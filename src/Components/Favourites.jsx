import React from 'react'


const Favourites = ({ favourites, removeFav }) => {
  return (
    <div>
      {
      favourites.map(favourite => {
        return (
            <div key={favourite.imdbID} className='movie-card' >
                <img src={favourite.Poster} />
                <div className='overlay'>
                  <button className='remove-fav-btn' onClick={() => removeFav(favourite.imdbID)}>Remove</button>
                </div>
          
             </div>
        )
      })}
    </div>
  )
}

export default Favourites
