import { useState } from 'react';
import { FaSearch } from 'react-icons/fa'
import { Form, InputGroup } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import './Search.css';


const Search = ({ addNewSymbol, setSearchVisibility, updateSymbol, search_research_vis, trending_symbols }) => {
  const [search_string, setSearchString] = useState('');
  const [search_results, setSearchResults] = useState([]);
  const searchSymbol = value => {
    fetch(`${process.env.REACT_APP_API_URL}/search?q=${value}`)
      .then(response => response.json())
      .then(data => {
        const results = data.quotes;

        setSearchResults(results);
      });
  };

  const getSymbol = value => {
    fetch(`${process.env.REACT_APP_API_URL}/get_symbol/?symbol=${value[0].symbol}`)
      .then(response => response.json())
      .then(data => {
        console.log(trending_symbols, data)
        if (trending_symbols.findIndex(d => d.symbol === data[0].symbol) === -1)
          addNewSymbol(data[0]);
        updateSymbol([data[0]]);
      })
  };

  const handleSearchChange = value => {
    setSearchString(value);
    if (value.length > 0) {
      searchSymbol(value);
      setSearchVisibility('results__cont');
    }
  };

  const handleResultsClick = value => {
    setSearchString(value.symbol);
    setSearchResults([]);
    getSymbol([value]);
    setSearchVisibility('d-none');
  }

  return (
    <div className='search-bar-container'>
      <div className='input-wrapper'>
        <InputGroup>
          <InputGroup.Text>
            <FaSearch />
          </InputGroup.Text>
          <Form.Control
            className='search-box'
            placeholder='Search'
            value={search_string}
            onChange={e => handleSearchChange(e.target.value)}
          />
        </InputGroup>
      </div>
      
      <div className={search_research_vis} >
        {search_results.length > 0 && search_results.map(d => 
          d.symbol ? (
            <div
              className='search-result'
              key={uuidv4()}
              onClick={e => handleResultsClick(d)}
            >
              {d.symbol} &nbsp; {d.shortname }
            </div>
          ) : null
        )}
      </div>
    </div>
  )
}

export default Search;  