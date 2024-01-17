import * as React from 'react';

const initialStories = [
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

  //items are in global scope
  //here is only a state of items
  //real Sories wont be altered in any way
  const [stories, setStories] = React.useState(initialStories);

  //callback handler to dismiss an item
  //make a new Stories array filtering with objectID
  const handleRemoveStory = (item) => {
    const newStories = stories.filter(
      (story) => item.objectID !== story.objectID
    );

    setStories(newStories);
  };
  
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
      
      <List list={searchedStories} onRemoveItem={handleRemoveStory} /> 

    </div>
  );
};

const List = ({ list, onRemoveItem }) => ( 
  <ul>
    {list.map((item) => (
      <Item key={item.objectID} 
            item={item} 
            onRemoveItem={onRemoveItem}
      />
    ))}
  </ul> 
);

//onRemoveItem is the callbackhandler and triggers the filtering
const Item = ({ item, onRemoveItem }) => ( 
  <li>
    <span>
      <a href={item.url}>{item.title}</a>
    </span>
     <span>{item.author}</span>
    <span>{item.num_comments}</span>
    <span>{item.points}</span>
    <span>
      <button type="button" onClick={() => onRemoveItem(item)}>
        Dismiss
      </button>
    </span>
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
