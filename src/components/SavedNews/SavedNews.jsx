import { useContext } from "react";
import Navigation from "../Navigation/Navigation";
import SavedText from "../SavedText/SavedText";
import "./SavedNews.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SavedNews({ savedArticles, handleRemoveArticle }) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const allKeywords = savedArticles
    .map((item) => item.keywords)
    .flat()
    .filter(Boolean);

  const uniqueKeywords = [...new Set(allKeywords)];
  console.log("All unique keywords:", uniqueKeywords);
  console.log(savedArticles);

  const keywordsText =
    uniqueKeywords.length > 2
      ? `${uniqueKeywords.slice(0, 2).join(", ")} and ${
          uniqueKeywords.length - 2
        } others`
      : uniqueKeywords.join(", ");

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <section className="saved__info">
        <p>Saved articles</p>
        <p>
          {currentUser.username}, you have {savedArticles.length} saved articles
        </p>
        <p>
          By keywords: <span>{keywordsText}</span>
        </p>
      </section>
      <div>
          <SavedText
            handleRemoveArticle={handleRemoveArticle}
            savedArticles={savedArticles}
          />
      </div>
    </div>
  );
}

export default SavedNews;
