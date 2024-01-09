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
const List = (props) => (
  <ul>
    {props.list.map((item) => (
      <Item  key={item.objectID} item={item} />
    ))}
  </ul>
);

const Item = (props) => (
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

const Search = () => {
  const handleChange = (event) => {
    //synthetic event
    console.log(event);
    //value of target (here : input html element)
    console.log(event.target.value);
  };

  return ( 
    <div>
      <label htmlFor="search">Search :</label>
      <input id="search" type="text" onBlur={handleChange}/>
    </div>
  );
};

export default App;
