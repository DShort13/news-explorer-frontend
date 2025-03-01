import NewsCard from "../NewsCard/NewsCard";

function NewsCardList({ defaultNewsArticles }) {
  return (
    <div>
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
