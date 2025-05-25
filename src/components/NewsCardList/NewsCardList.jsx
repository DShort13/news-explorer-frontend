import { useState } from "react";
import NewsCard from "../NewsCard/NewsCard";
import "./NewsCardList.css";

function NewsCardList({
  // defaultNewsArticles,
  searchResults,
  handleSaveArticle,
  handleUnsaveArticle,
  handleRemoveArticle,
}) {
  let [cardView, setCardView] = useState(3);
  const handleResults = () => setCardView(cardView + 3);

  return (
    <section className="articles__container">
      <h2 className="articles__header">Search results</h2>
      <ul className="articles__list">
        {searchResults.slice(0, cardView).map((item) => {
          return (
            <NewsCard
              key={item._id}
              item={item}
              handleSaveArticle={handleSaveArticle}
              handleUnsaveArticle={handleUnsaveArticle}
              handleRemoveArticle={handleRemoveArticle}
            />
          );
        })}
      </ul>
      {cardView <= searchResults.length ? (
        <button className="articles__more-button" onClick={handleResults}>
          Show more
        </button>
      ) : (
        ""
      )}
    </section>
  );
}

export default NewsCardList;
