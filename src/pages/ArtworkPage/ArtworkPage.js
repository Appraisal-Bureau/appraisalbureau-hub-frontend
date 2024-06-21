import { getItemById } from 'api/items';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ArtworkPage = () => {
  const { id } = useParams();
  const [artworkData, setArtworkData] = useState({});
  const [itemData, setItemData] = useState({});
  // split into item data + artwork data?
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await getItemById(id);
        if (res.data?.attributes) {
          setItemData(res.data.attributes);
          setArtworkData(res.data.attributes.artwork_item.data.attributes);
        } else {
          setItemData({});
          setArtworkData({});
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // get data w/ API query
  // if no data w/ the specified ID, return error message
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (Object.keys(artworkData).length === 0) {
    return <h1>No artwork data available</h1>;
  }

  return (
    <div className="artwork-page">
      <h2>Artist {artworkData.artist}</h2>
      <h3>
        Title, Year {artworkData.title},{artworkData.number}
      </h3>
      <p>
        Medium, Dimensions {artworkData.medium}, {artworkData.size_height}x
        {artworkData.size_width} {artworkData.size_units}
      </p>
    </div>
  );
};

export default ArtworkPage;
