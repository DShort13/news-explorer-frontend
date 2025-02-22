import { useState } from "react";
import "./SearchForm.css";

function SearchForm() {
  const [searchItem, setSearchItem] = useState("");

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);
  };

  return (
    <div className="search">
      <input
        type="text"
        value={searchItem}
        onChange={handleInputChange}
        placeholder="Type to search"
      />
    </div>
  );
}

export default SearchForm;
