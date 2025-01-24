import { useEffect, useState } from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import MoviesList from './Components/MoviesList'
import Header from './Components/Header'
import ContainerHeading from './Components/ContainerHeading'
import Favourites from './Components/Favourites'
import { Button } from 'react-bootstrap'


function App() {

  const [search, setSearch] = useState("")
  const [fetchSearchResult, setFetchSearchResult] = useState("")
  const [movies, setMovies] = useState([])
  const [isPending, setIsPending] = useState(true)
  const [errorMessage, setErrorMessage] = useState(false)

  const [favourites, setFavourites] = useState(()=>{
    const favMovData = localStorage.getItem("favMov")
    return favMovData ? JSON.parse(favMovData) : []
  })

  useEffect(()=>{
    localStorage.setItem("favMov", JSON.stringify(favourites))
  },[favourites])

  async function searchFilms(movie) {

    try {
      const url = `https://www.omdbapi.com/?s=${movie}&apikey=bbe71058`
      const response = await fetch(url)
      // console.log(response)
      const data = await response.json()

      if(!response.ok){
        throw new Error("Movie not found");

      }

      if(response.ok){
        if(data.Error === "Movie not found!"){
          setErrorMessage(true)
          throw new Error(data.Error)
        }
        
        else{
          setMovies(data.Search)
          // console.log(data)
          setIsPending(false)
          setErrorMessage(false)
        }

        
      }


    } catch (error) {
      setErrorMessage(error.message)
      setSearch("")
      // consol
    }

  }

  useEffect(() => {
    searchFilms(search)
    // setIsPending(true)
  }, [fetchSearchResult])


  function addToFav(film) {
    setFavourites(prevFav => {
      return [...prevFav, film]
    })
  }

  function removeFav(id) {
    setFavourites(favourites.filter(favourite => {
      return favourite.imdbID !== id
    }))
  }

  // console.log(favourites)

  return (
    <>
      <Header search={search} setSearch={setSearch} setIsPending={setIsPending} setFetchSearchResult={setFetchSearchResult} />
      {/* {isPending && search.trim().length !== 0 && "Loading..."} */}
      {errorMessage && <div className='err-message responsiveness'>Movie not found!</div>}
      {movies && <ContainerHeading value={"Films"} />}
      <div className='container responsiveness' >
        {movies && <MoviesList movies={movies} setMovies={setMovies} addToFav={addToFav} removeFav={removeFav} favourites={favourites} />}       
      </div>
      <ContainerHeading value={"Favourites"} />
      <div className='container responsiveness'>
        <Favourites favourites={favourites} removeFav={removeFav} />
      </div>
    </>
  )
}

export default App