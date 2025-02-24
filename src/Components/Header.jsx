import React from 'react'

const Header = ({ search, setSearch, setIsPending, setFetchSearchResult }) => {

  return (
    <div className='header '>
      <p className="logo">Movie Hub</p>
      <div className="search-input">
        <input  className='search-input-field'
                value={search} 
                onChange={(e)=>{
                  setSearch(e.target.value)
                }} 
                placeholder='Search...'
        />
        <button className='search' onClick={()=>setFetchSearchResult(search)}>&#128269;</button>
      </div>
      {/* <div className="signin-signup">

      </div> */}
    </div>
  )
}

export default Header
