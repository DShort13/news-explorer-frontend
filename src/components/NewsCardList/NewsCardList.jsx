import NewsCard from "../NewsCard/NewsCard";
import "./NewsCardList.css";

function NewsCardList({ defaultNewsArticles }) {
  return (
    <div className="articles__container">
      <h2 className="articles__header">Search results</h2>
      <ul className="articles__list">
        {defaultNewsArticles.map((item) => {
          return <NewsCard key={item._id} item={item} />;
        })}
      </ul>
    </div>
  );
}

export default NewsCardList;
