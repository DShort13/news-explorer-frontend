import React from "react";

const SavedNewsContext = React.createContext({
  savedArticles: [],
  setSavedArticles: () => {},
});

export default SavedNewsContext;
