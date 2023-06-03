import { useParams } from "react-router-dom";
import DevelopersEdit from "../components/developersEdit";
import PublishersEdit from "../components/publishersEdit";

const DevelopersPublishersEditPage = () => {
  const { entity } = useParams()

  return (
    <>
      {entity === 'developers' && (<DevelopersEdit />)}
      {entity === 'publishers' && (<PublishersEdit />)}
    </>
  )
}

export default DevelopersPublishersEditPage;
 