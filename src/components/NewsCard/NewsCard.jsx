import { useContext, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import SavedNewsContext from "../../contexts/SavedNewsContext";
import "./NewsCard.css";
import { useLocation } from "react-router-dom";

function NewsCard({
  item,
  handleSaveArticle,
  handleUnsaveArticle,
  handleRemoveArticle,
}) {
  // Convert published date into Date format
  const dateFormat = new Date(item.publishedAt);
  // Create an 'options' object to store custom date format
  const options = { month: "long", day: "numeric", year: "numeric" };

  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { savedArticles, setSavedArticles } = useContext(SavedNewsContext);
  const [isSaved, setIsSaved] = useState(false);
  // const [showIcon, setShowIcon] = useState(false);
  const location = useLocation();

  // const handleShowIcon = () => setShowIcon(true);
  // const handleHideIcon = () => setShowIcon(false);

  const handleSaveClick = () => {
    if (!item) {
      console.error("Data is null or undefined");
      return;
    }

    if (!isSaved) {
      setSavedArticles((prevSavedArticles) => {
        const updatedArticles = [...prevSavedArticles, item];
        console.log("savedUpdatedArticles:", updatedArticles);
        return updatedArticles;
      });
      handleSaveArticle(item);
      setIsSaved(true);
    } else {
      setSavedArticles((prevSavedArticles) => {
        const updatedArticles = prevSavedArticles.filter(
          (article) => article && article.id !== item.id
        );
        console.log("updates:", updatedArticles);
        return updatedArticles;
      });
      setIsSaved(false);
    }
  };

  // const handleDeleteClick = () => handleRemoveArticle(item);

  return (
    <li className="articles">
      <img
        className="article__image"
        src={item.urlToImage || item.image}
        alt={item.description}
      />
      {currentUser ? (
        location.pathname === "/savedNews" ? (
          <div className="article__save-container">
            <button
              type="button"
              className="article__save-btn-remove"
              onClick={() => handleRemoveArticle(item.id)}
            />
            <span>Remove from saved</span>
            <div>
              <span>{item?.keywords}</span>
            </div>
          </div>
        ) : (
          <div className="article__save-container">
            <button
              type="button"
              className="article__save-btn"
              onClick={handleSaveClick}
            />
            <span>Sign in to save articles</span>
          </div>
        )
      ) : (
        <div>
          <button type="button" className="article__save-btn"></button>
        </div>
      )}
      <p>{dateFormat.toLocaleDateString("en-us", options)}</p>
      <p>{item.source.name}</p>
      <p>{item.title}</p>
      <p>{item.description}</p>
      <p>{item.source.name}</p>
    </li>
  );
}

export default NewsCard;
