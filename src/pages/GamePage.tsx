import { useParams } from "react-router-dom";

const GamePage = () => {
  const { id } = useParams();
  return(
    <div>Game page {id}</div>
  )
}

export default GamePage;
