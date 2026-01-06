import { useContext } from "react";
import Navigation from "../Navigation/Navigation";
import SavedText from "../SavedText/SavedText";
import "./SavedNews.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SavedNews({ savedArticles, handleRemoveArticle }) {
  const { currentUser } = useContext(CurrentUserContext);

  const allKeywords = savedArticles
    .map((item) => item.keywords)
    .flat()
    .filter(Boolean);

  const uniqueKeywords = [...new Set(allKeywords)];

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
        <p className="saved__info-keyword_title">Saved articles</p>
        <p className="saved__info-keyword_number">
          {currentUser.username}, you have {savedArticles.length} saved articles
        </p>
        <p className="saved__info-keyword_list">
          By keywords: <span className="saved__info-keywords">{keywordsText}</span>
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
