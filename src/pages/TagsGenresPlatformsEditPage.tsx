import { useParams } from "react-router-dom";
import TagsEdit from "../components/tagsEdit";
import GenresEdit from "../components/genresEdit";
import PlatformsEdit from "../components/platformsEdit";

const TagsGenresPlatformsEditPage = () => {
  const { entity } = useParams()

  return (
    <>
      {entity === 'tags' && (<TagsEdit />)}
      {entity === 'genres' && (<GenresEdit />)}
      {entity === 'platforms' && (<PlatformsEdit />)}
    </>
  )
}

export default TagsGenresPlatformsEditPage;
 