import { useParams } from 'react-router-dom';

const ArtworkPage = () => {
  const { id } = useParams();
  console.log(id);
  // get data w/ API query
  // if no data w/ the specified ID, return error message
  return <div className="artwork-page"></div>;
};

export default ArtworkPage;
