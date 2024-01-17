import * as React from 'react';

//custom hook :
  //is used for => SearchTerm
const useStorageState = (key, initialState) => {
  //Set a state for value : 
    //check if there is a localStorage for key
    //if not, use initial state
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );

  //Check for any change in value, key
  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

//App is the main component
const App = () => {

  //this is only data
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
  
  //usage of the custom hook
  const [searchTerm, setSearchTerm] = useStorageState(
    'search',
    'React'
  );

  //callback handler, its purpose is to use it in child components
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  
  //used to filter list items, works with lowercase => will be passed as props
  const searchedStories = stories.filter(function (story) {
    return story.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>

      <h1>Hacker Stories</h1>
      
      <InputWithLabel
        id="search"
        label="Search"
        value={searchTerm} 
        onInputChange={handleSearch} 
        isFocused
      >
        <strong>Search :</strong>
      </InputWithLabel> 
        
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
const InputWithLabel = ({ id, value, type='text', onInputChange, isFocused, children }) => {
  
  const inputRef = React.useRef();
  
  React.useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return ( 
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      <input
        ref={inputRef}
        id={id} 
        type={type} 
        onChange={onInputChange} 
        value={value} />
    </>
  );
}

export default App;
