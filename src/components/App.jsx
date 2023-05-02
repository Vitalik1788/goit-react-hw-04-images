import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { AppStyle, Alert, Error } from './App/App.styled';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import fetchImages from '../ApiService/ApiService';
import Modal from './Modal/Modal';
import LoadMoreButton from './Button/Button';
import Loader from './Loader/Loader';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [totalHits, setTotalHits] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    const onFetchImages = async () => {
      try {
        setIsLoading(true);
        const data = await fetchImages(searchQuery, page);
        setImages(prevState => [...prevState, ...data.hits]);
        setTotalHits(data.totalHits);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };
    onFetchImages();
  }, [searchQuery, page]);

  const handleFormSubmit = userSearch => {
    setSearchQuery(userSearch);
    setPage(1);
    setImages([]);
  };

  const onLoadMoreImg = () => {
    setPage(prevState => prevState + 1);
  };

  const openModal = modalData => {
    setModalData(modalData);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalData(null);
  };

  const totalPage = totalHits / images.length;

  return (
    <AppStyle>
      <ToastContainer />
      <Searchbar onSubmit={handleFormSubmit} />

      {images && <ImageGallery images={images} openModal={openModal} />}

      {totalPage > 1 && !isLoading && images.length !== 0 && (
        <LoadMoreButton loadMore={onLoadMoreImg} />
      )}

      {isLoading && <Loader />}

      {showModal && <Modal modalData={modalData} closeModal={closeModal} />}
      
      {images.length === 0 &&
        totalHits === 0 &&
        searchQuery !== '' &&
        !isLoading &&
        error === null && (
          <Alert>
            No images with search query: {searchQuery} :( <br />
            Try with new search query :)
          </Alert>
        )}

      {error && (
        <Error>
          Sorry, there was an error with the application: <br /> {error}, try
          again later
        </Error>
      )}
    </AppStyle>
  );
};

export default App;
