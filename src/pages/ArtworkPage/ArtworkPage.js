import { getItemById } from 'api/items';
import ChevronLeft from 'assets/icons/ChevronLeft.svg';
import Edit from 'assets/icons/Edit.svg';
import IconButton from 'components/IconButton/IconButton';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import './ArtworkPage.scss';

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

  // if (Object.keys(artworkData).length === 0) {
  //   return <h1>No artwork data available</h1>;
  // }

  return (
    <div id="artwork-page">
      <Link to={'/portfolio'}>
        <div className="back-button">
          <ReactSVG src={ChevronLeft} /> <span>Back to Portfolio</span>
        </div>
      </Link>
      <div className="header-section">
        <img
          className="artwork-image"
          src={itemData.image}
          alt={itemData.image}
        />
        <h2>Artist {artworkData.artist}</h2>
        <h3>
          Title, Year {artworkData.title},{artworkData.number}
        </h3>
        <p>
          Medium, Dimensions {artworkData.medium}, {artworkData.size_height}x
          {artworkData.size_width} {artworkData.size_units}
        </p>
      </div>

      <div className="detail-section">
        <div className="inline">
          <h4>Artwork Details</h4>
          <IconButton text={'Edit'} icon={Edit} />
        </div>
      </div>
    </div>
  );
};

export default ArtworkPage;
