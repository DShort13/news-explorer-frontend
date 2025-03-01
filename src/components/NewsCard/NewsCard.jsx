import "./NewsCard.css";

function NewsCard({ item }) {
  // Convert published date into Date format
  const dateFormat = new Date(item.publishedAt);
  // Create an 'options' object to store custom date format
  const options = { month: "long", day: "numeric", year: "numeric" };

  return (
    <li className="articles">
      <img
        className="article__image"
        src={item.urlToImage}
        alt="News article"
      />
      <div className="article__save-container">
        <button type="button" className="article__save-btn" />
      </div>
      <p>{dateFormat.toLocaleDateString("en-us", options)}</p>
      <p>{item.source.name}</p>
      <p>{item.title}</p>
      <p>{item.description}</p>
      <p>{item.source.name}</p>
    </li>
  );
}

export default NewsCard;
