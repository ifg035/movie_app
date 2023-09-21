import {useState,useEffect} from 'react'
import './App.css';

function App() {
  const [loading,setLoading] = useState(true)
  const [movie, setMovies] = useState([])
  useEffect(()=>{
    fetch("https://yts.mx/api/v2/list_movies.json?limit=30")
    .then(response => response.json())
    .then(json => {
      setLoading(false);
      setMovies(json.data.movies);
      console.log(json.data.movie);
    });
  },[]); //빈 배열 ; 한번만 실행 vs dapendencies 자정 
  return (
    <div className="App">
        <h1>영화 정보 앱({movie.length})</h1>
        <div>{ loading ? <p>데이터 수신중입니다.</p> :null}</div>
        <ul class ="gap1 d-flex flex-wrap">
          {movie.map(movie => 
          <li ket={movie.id}>
            <a href={movie.url}>
            <img src={movie.medium_cover_image} alt={movie.title_english} />
            <p>제목:{movie.title}</p>
            <p class="genres">
              장르 :{movie.genres.map((genre=> 
              <strong class="genre"> {genre} </strong>
              ))}
              </p>
            <p>언어:{movie.language === "en"? "영어":null}</p>
            <p>평점:{movie.ratimg} /10 </p>
            <p>상영시간: {movie.runtime} 분</p>
            </a>
            </li>
            )}
        </ul>
    </div>
  );
}

export default App;
