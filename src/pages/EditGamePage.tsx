import { useParams } from "react-router-dom";

const EditGamePage = () => {
  const { id } = useParams();

  return(
    <div>edit game: {id}</div>
  )
}

export default EditGamePage;
