import Navigation from "../Navigation/Navigation";
import SavedText from "../SavedText/SavedText";
import "./SavedNews.css";

function SavedNews({ defaultNewsArticles }) {
  return (
    <div>
      <Navigation />
      <section className="saved__info">
        <p>Saved articles</p>
        <p>Dion, you have 5 saved articles</p>
        <p>By keywords</p>
      </section>
      <SavedText defaultNewsArticles={defaultNewsArticles} />
    </div>
  );
}

export default SavedNews;
