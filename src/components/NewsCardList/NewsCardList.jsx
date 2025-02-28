import NewsCard from "../NewsCard/NewsCard";
import { defaultNewsArticles } from "../../utils/defaultNewsArticles";

function NewsCardList() {
  return (
    <ul className="articles__list">
      {defaultNewsArticles.map((item) => {
        return <NewsCard key={item._id} item={item} />;
      })}
    </ul>
  );
}

export default NewsCardList;
