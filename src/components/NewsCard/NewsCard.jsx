import { useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import SavedNewsContext from "../../contexts/SavedNewsContext";
import "./NewsCard.css";

function NewsCard({
  item,
  handleSaveArticle,
  handleUnsaveArticle,
  handleRemoveArticle,
}) {
  const dateFormat = (dateString) => { 
    // Create an 'options' object to store custom date format
    const options = { month: "long", day: "numeric", year: "numeric" };
    // Convert published date into Date format
    return new Date(dateString).toLocaleDateString("en-us", options);
  };
  const dateFormatted = dateFormat(item.publishedAt || item.date);

  const { currentUser } = useContext(CurrentUserContext);
  const { savedArticles, setSavedArticles } = useContext(SavedNewsContext);

  const isSaved = savedArticles.some(
    (article) =>   article.link === item.url || article.link === item.link
  );
  const location = useLocation();

  const handleSaveClick = () => {
    if (!currentUser) {
      console.error("User not logged in");
      return;
    }

    if (!item) {
      console.error("No article item provided to save.");
      return;
    }

    if (isSaved) {
      handleUnsaveArticle(item);
    } else {
      const articleData = {
        id: item.url || item.link || item.id,
        source: item.source?.name || item.source,
        title: item.title,
        date: item.publishedAt || item.date,
        description: item.description,
        image: item.urlToImage || item.image,
        keywords: item.keyword || item.keywords,
        link: item.url || item.link || item.id,
      };

      handleSaveArticle(articleData);
    }
  };

  return (
    <li className="articles">
      <img
        className="article__image"
        src={item.urlToImage || item.image}
        alt={item.description}
      />
      {currentUser ? (
        location.pathname === "/saved-news" ? (
          <div>
            <div className="article__save-container">
              <button
                type="button"
                className="article__save-btn article__save-btn--remove"
                onClick={() => handleRemoveArticle(item)}
                title="Remove from saved"
              />
              <span className="article__tooltip">Remove from saved</span>
            </div>
            <div className="article__keywords_container">
                <span className="article__keywords">{item?.keywords}</span>
            </div>
          </div>
        ) : (
          <div className="article__save-container">
            <button
              type="button"
              className={`article__save-btn ${
                isSaved ? "article__save-btn--saved" : ""
              }`}
              onClick={handleSaveClick}
              title={isSaved ? "Remove from saved" : "Save article"}
            />
          </div>
        )
      ) : (
        <div className="article__save-container">
          <button
            type="button"
            className="article__save-btn"
            aria-label="Sign in to save articles"
            onClick={() => alert("Please sign in to save articles")}
          />
          <span className="article__tooltip">Sign in to save articles</span>
        </div>
      )}
      <div className="article__text-container">
        <p className="article__date">{dateFormatted}</p>
        <p className="article__title">{item.title}</p>
        <p className="article__description">{item.description}</p>
        <p className="article__source-name">{item.source?.name || item.source}</p>
      </div>
    </li>
  );
}

export default NewsCard;
