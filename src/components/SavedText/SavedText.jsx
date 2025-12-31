// import { defaultNewsArticles } from "../../utils/defaultNewsArticles";
import NewsCard from "../NewsCard/NewsCard";
import "./SavedText.css";

function SavedText({ handleRemoveArticle, savedArticles }) {
  return (
    <div className="saved-text__container">
      <ul className="saved-text__articles_list">
        {savedArticles.map((item) => {
          return (
            <NewsCard
              key={item._id}
              item={item}
              handleRemoveArticle={handleRemoveArticle}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default SavedText;
