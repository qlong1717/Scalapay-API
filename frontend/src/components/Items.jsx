import React from 'react';

const ItemList = ({ items, onSelect }) => {
  
    return (
      <div>
        <h3>Choose Items:</h3>
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              <button onClick={() => onSelect(item)}>Select</button>{' '}
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  export default ItemList;