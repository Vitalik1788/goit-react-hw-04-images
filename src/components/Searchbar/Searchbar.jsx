import { useState } from 'react';
import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';
import { ReactComponent as Icon } from '../IMG/searchImg.svg';
import { toast } from 'react-toastify';
import { PropTypes } from 'prop-types';

const Searchbar = ({ onSubmit }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    if (searchValue.trim() === '') {
      toast.error('Please enter search query field', {
        theme: 'colored',
        autoClose: 3000,
      });
      return;
    }
    onSubmit(searchValue);
    setSearchValue('');
  };

  return (
    <Header>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <Icon width={20} height={20} />
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchValue}
          onChange={event =>
            setSearchValue(event.currentTarget.value.toLowerCase())
          }
        />
      </SearchForm>
    </Header>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
