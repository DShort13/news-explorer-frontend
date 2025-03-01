import { defaultNewsArticles } from "../../utils/defaultNewsArticles";
import NewsCard from "../NewsCard/NewsCard";
import "./SavedText.css";

function SavedText() {
  return (
    <div className="saved-text__container">
      <ul className="saved-text__articles">
        {defaultNewsArticles.map((item) => {
          return <NewsCard key={item._id} item={item} />;
        })}
      </ul>
    </div>
  );
}

export default SavedText;
