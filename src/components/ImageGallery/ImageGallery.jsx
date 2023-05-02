import { ImageList } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { PropTypes } from 'prop-types';

const ImageGallery = ({ images, openModal }) => {
  return (
    <ImageList>
      {images &&
        images.map(image => {
          return (
            <ImageGalleryItem
              key={image.id}
              image={image}
              onImageClick={openModal}
            />
          );
        })}
    </ImageList>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ImageGallery;
