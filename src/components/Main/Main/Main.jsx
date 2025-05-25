import Header from "../../Header/Header";
import NewsCardList from "../../NewsCardList/NewsCardList";
import About from "../../About/About";

function Main({
  // defaultNewsArticles,
  searchResults,
  handleArticleSearch,
  handleLoginModal,
  handleSaveArticle,
  handleUnsaveArticle,
  handleRemoveArticle,
}) {
  return (
    <main>
      <Header
        handleLoginModal={handleLoginModal}
        handleArticleSearch={handleArticleSearch}
      />
      <NewsCardList
        // defaultNewsArticles={defaultNewsArticles}
        searchResults={searchResults}
        handleSaveArticle={handleSaveArticle}
        handleUnsaveArticle={handleUnsaveArticle}
        handleRemoveArticle={handleRemoveArticle}
      />
      <About />
    </main>
  );
}

export default Main;
