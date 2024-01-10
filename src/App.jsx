import * as React from 'react';

//custom hook
const useStorageState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

const App = () => {
  const stories = [
    {
      title: 'React',
      url: 'https://reactjs.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
    }, 
    {
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1,
    }
  ];
  
  const [searchTerm, setSearchTerm] = useStorageState(
    'search',
    'Hello World'
  );

  //callback handler
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  
  //array resulting from the filter => pass data to any child
  const searchedStories = stories.filter(function (story) {
    return story.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  //function resulting => pass the state to any child
  const searchedTerm = (term) => {
    return searchTerm;
  };

  return (
    <div>

      <h1>Hacker Stories</h1>
      
      <Search search={searchTerm} onSearch={handleSearch} searchedTerm={searchedTerm} />
      
      <hr />
      
      <List list={searchedStories} /> 

    </div>
  );
};

const List = ({ list }) => ( 
  <ul>
    {list.map((item) => (
      <Item key={item.objectID} item={item} />
    ))}
  </ul> 
);

const Item = ({ item }) => ( 
  <li>
    <span>
      <a href={item.url}>{item.title}</a>
    </span>
    <span>{item.author}</span>
    <span>{item.num_comments}</span>
    <span>{item.points}</span>
  </li> 
);

//props handling inside function declaration 
const Search = ({ onSearch, search, searchedTerm }) => ( 
  <div>
    <label htmlFor="search">Search :</label>
    <input 
      id="search" 
      type="text" 
      onChange={onSearch} 
      value={search} />
    <p>You are searching for : <strong>{searchedTerm()}</strong></p>
  </div>
);

export default App;
