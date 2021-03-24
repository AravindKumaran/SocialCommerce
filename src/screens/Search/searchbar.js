import React, {useState, useRef} from 'react';
import {SearchBar} from 'react-native-elements';

const SearchhBar = ({onSearch}) => {
  const [search, setSearch] = useState('');

  const updateSearch = (search) => {
    setSearch(search);
    onSearch(search);
  };
  return (
    <>
      <SearchBar
        containerStyle={{
          borderRadius: 40,
          width: '100%',
          backgroundColor: '#20232A',
          top: -1,
        }}
        inputContainerStyle={{borderRadius: 30, color: '#20232A'}}
        inputStyle={{
          fontFamily: 'Proxima Nova',
          fontSize: 15,
          fontWeight: '400',
          color: '#ffffff',
          left: 5,
        }}
        searchIcon={{left: 6, size: 25, color: '#ffffff'}}
        placeholder="Search"
        onChangeText={updateSearch}
        value={search}
      />
    </>
  );
};

export default SearchhBar;
