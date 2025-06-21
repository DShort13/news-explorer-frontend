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
      <Navigation />
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
        <ul>
          {savedArticles.map((item, index) => (
            <SavedText
              key={index}
              data={item}
              handleSavedNews={() => handleSavedNews({ data: item })}
              handleRemoveArticle={handleRemoveArticle}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SavedNews;
