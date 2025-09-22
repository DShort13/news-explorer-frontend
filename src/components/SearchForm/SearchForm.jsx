import { useEffect, useState } from "react";
import "./SearchForm.css";

function SearchForm({ onSubmit, debounceFetch, query, setQuery }) {
  const [isSearchValid, setIsSearchValid] = useState(true);
  const [validationError, setValidationError] = useState("");

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setQuery(searchTerm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!query.trim()) {
      setIsSearchValid(false);
      setValidationError("Please enter a keyword");
      return;
    }

    setIsSearchValid(true);
    onSubmit(query);
  };

  useEffect(() => {
    return () => {
      debounceFetch.cancel();
    };
  }, [debounceFetch]);

  return (
    <div className="search__container">
      <div className="search">
        <div className="search__text">
          <h1 className="search__title">What's going on in the world?</h1>
          <p className="search__instructions">
            Find the latest news on any topic and save them in your personal
            account.
          </p>
          {/* </div> */}
          <div className="search__form_controls">
            <label className="search__form_container" onSubmit={handleSubmit}>
              <input
                type="text"
                id="search-input"
                value={query}
                minLength={2}
                maxLength={30}
                onChange={handleInputChange}
                placeholder="Type to search"
                className="search__bar"
              />
            </label>
            <button
              className="search__button"
              name="search"
              title="Search"
              type="submit"
            >
              Search
            </button>
            <span
              className={
                isSearchValid ? "search__error-inactive" : "search__error"
              }
            >
              {validationError}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchForm;
