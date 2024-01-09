import * as React from 'react';


const App = () => {
  console.log("App renders");

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

  return (
    <div>
      <h1>Hacker Stories</h1>
      <Search />
      <hr />
      <List list={stories} /> 
    </div>
  );
};

//use of props as argument
const List = (props) => {
  console.log("List renders");
  return(
  <ul>
    {props.list.map((item) => (
      <Item  key={item.objectID} item={item} />
    ))}
  </ul>
);
};

const Item = (props) => {
  console.log("Item renders");
  return (
  <li>
    <span>{props.item.title}</span>
    <span>{props.item.author}</span>
    <span>{props.item.num_comments}</span>
    <span>{props.item.points}</span>
    <span>
      <a target="blank" href={props.item.url}>{props.item.url}</a>
    </span>
  </li>
);
};

const Search = () => {
  console.log("Search renders");
  
  const [searchTerm, setSearchTerm] = React.useState(""); 

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return ( 
    <div>
      <label htmlFor="search">Search :</label>
      <input id="search" type="text" onChange={handleChange}/>
      <p>Searching for : <strong>{searchTerm}</strong></p>
    </div>
  );
};

export default App;
