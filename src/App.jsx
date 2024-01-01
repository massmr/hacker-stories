import * as React from 'react';

const list = [
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

function App() {
  return (
    <div>

      <h1>Hacker Stories</h1>

      <Search />
      <List />     
      
    </div>
  );
}

function List() {
  return (
    <ul>
      {list.map(function (item) {
        return (
          <li key={item.objectID}>
            {item.title}, {item.author}, {item.num_comments}, {item.points},
            <a target="blank" href={item.url}>{item.url}</a>
          </li>
        );
      })}
    </ul>
  );
}

function Search() {
  return(
    <div>
      <label htmlFor="search">Search :</label>
      <input id="search" type="text" />
    </div>
  );
}

export default App;
