import { useParams } from 'react-router-dom'

export default function TVSeriesDetail() {
    
  const { id } = useParams()

  return (
    <div>
      <h1>TV Series Detail</h1>
      <p>TV Series ID: {id}</p>
    </div>
  )
}