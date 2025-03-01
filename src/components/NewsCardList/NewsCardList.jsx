import NewsCard from "../NewsCard/NewsCard";

function NewsCardList({ defaultNewsArticles }) {
  return (
    <ul className="articles__list">
      {defaultNewsArticles.map((item) => {
        return <NewsCard key={item._id} item={item} />;
      })}
    </ul>
  );
}

export default NewsCardList;
