import './global/styles.module.css'
import styles from './app.module.css'
import shuffleImage from "./assets/shuffle.svg"


import axios from 'axios'
import { useEffect, useState } from 'react'
import { apiImagePath, apiKey } from './config/api'

interface movieProps {
  id: number,
  overview: string,
  title: string
  poster_path: string
}


function App() {
  const [radomMoviePositon, setRandomMoviePositon] = useState(0)
  const [moviesList, setMoviesList] = useState<movieProps[]>([])
  const [movie, setMovie] = useState<movieProps>()

  const Axios = axios.defaults

  let Random = {
    randomNumber(){
        return Math.floor(Math.random() * 100)
    },

    radomMoviePosition(){
      let moviePositon = Random.randomNumber()
      while(moviePositon >= moviesList.length || moviePositon < 0){
        moviePositon = Random.randomNumber()
      }
      
      return moviePositon
    },
    randomMoviePositionWithoutRepeat(){
      let moviePositon = Random.radomMoviePosition()
      while(radomMoviePositon === moviePositon){
        moviePositon = Random.radomMoviePosition()
      }

      setRandomMoviePositon(state => moviePositon)

      return moviePositon
    }
  }

  useEffect(() => {
    let moviesURl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-br&page=1`
    axios.get(moviesURl).then(response => setMoviesList(response.data.results))
  }, [])

  function handleGetRandomMovie(){
    let moviePosition = Random.randomMoviePositionWithoutRepeat()
    let movieChoiced = moviesList[moviePosition]
    setMovie(movieChoiced)    
  }





  return (
    <div className={styles.app}>
      <header>
        <img src={shuffleImage} alt="iamge de duas setas se cruzando" />
        <h1>Não sabe oque assistir?</h1>
      </header>
      <main>
        
        {
          movie &&
            <section className={styles.movieContent}>
              <img src={`${apiImagePath}${movie?.poster_path}`}/>
              <div className={styles.movieDetails}>
                <h2>{movie?.title} </h2>
                <p>{movie?.overview}</p>
              </div>
            </section>
        }
        <button onClick={handleGetRandomMovie}>
          <img src={shuffleImage} alt="iamge de duas setas se cruzando" />
          <strong>encontrar filme</strong>
        </button>
        <p className={styles.advise}>Clique em "Encontrar filme" que taremos informações de algum filme para assistir hoje</p>
      </main>
    </div>
  )
}

export default App
