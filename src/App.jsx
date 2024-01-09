import * as React from 'react';


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
  
  const [searchTerm, setSearchTerm] = React.useState('React');

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

//use of props as argument
const List = ({ list }) => (
  //rest operator (use objectID and separate the rest)
  <ul>
    {list.map(({ objectID, ...item }) => (
      //spread operator (spread all the item object)
      <Item  key={objectID} {...item} />
    ))}
  </ul>
);

const Item = ({ title, url, author, num_comments, points }) => (
  <li>
    <span>{title}</span>
    <span>{author}</span>
    <span>{num_comments}</span>
    <span>{points}</span>
    <span>
      <a target="blank" href={url}>{url}</a>
    </span>
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
