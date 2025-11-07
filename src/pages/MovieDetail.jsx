import { useParams } from 'react-router-dom'

export default function MovieDetail() {
  
  const { id } = useParams()

  return (
    <div>
      <h1>Movies Detail</h1>
      <p>Movie ID: {id}</p>
    </div>
  )
}