import { useState } from "react";
import "./SearchForm.css";

function SearchForm() {
  const [searchItem, setSearchItem] = useState("");

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);
  };

  return (
    <div>
      <div className="search__text">
        <h1 className="search__title">What's going on in the world?</h1>
        <p className="search__instructions">
          Find the latest news on any topic and save them in your personal
          account.
        </p>
      </div>
      <input
        type="text"
        value={searchItem}
        onChange={handleInputChange}
        placeholder="Type to search"
        className="search__bar"
      />
    </div>
  );
}

export default SearchForm;
