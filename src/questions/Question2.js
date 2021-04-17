import React, { useState, useRef, useEffect } from "react";

export default function Question2(props) {
  // Situation: Create a search bar that filters items in the list as the user types.
  // Feel free to refactor as you feel necessary.

  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]); // to handle when you want to search any text on the input
  const searchTextInputRef = useRef(null);

  const shoppingList = [
    "Peanut Butter",
    "Peas",
    "Butter",
    "Beans",
    "Eggs",
    "Quiche",
    "Cheese",
  ];

  const handleSearchTextChange = () => {
    const textToSearch = searchTextInputRef.current.value;
    setSearchText(textToSearch);
  };

  useEffect(() => {
    const results = shoppingList.filter((fruit) => fruit.includes(searchText));
    setSearchResults(results);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  return (
    <div>
      <input
        value={searchText}
        onChange={handleSearchTextChange}
        ref={searchTextInputRef}
      />
      {searchResults.map((item) => {
        return <div key={item}>{item}</div>;
      })}
    </div>
  );
}
