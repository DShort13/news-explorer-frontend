import "./NewsCard.css";

function NewsCard({ item }) {
  // Convert published date into Date format
  const dateFormat = new Date(item.publishedAt);
  // Create an 'options' object to store custom date format
  const options = { month: "long", day: "numeric", year: "numeric" };

  return (
    <li className="articles">
      <div>
        <img className="articles__image" src={item.urlToImage} alt="" />
        <p>{dateFormat.toLocaleDateString("en-us", options)}</p>
        <p>{item.source.name}</p>
        <p>{item.title}</p>
        <p>{item.description}</p>
        <p>{item.source.name}</p>
      </div>
    </li>
  );
}

export default NewsCard;
