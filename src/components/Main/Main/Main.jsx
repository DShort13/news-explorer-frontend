import NewsCardList from "../../NewsCardList/NewsCardList";
import Preloader from "../../Preloader/Preloader";
import About from "../../About/About";

function Main({
  searchResults,
  isLoading,
  isSearching,
  handleSaveArticle,
  handleUnsaveArticle,
  handleRemoveArticle,
  query,
}) {
  return (
    <main>
      {query && (
        <section>
          {isLoading === false ? (
            <NewsCardList
              isLoading={isLoading}
              isSearching={isSearching}
              searchResults={searchResults}
              handleSaveArticle={handleSaveArticle}
              handleUnsaveArticle={handleUnsaveArticle}
              handleRemoveArticle={handleRemoveArticle}
            />
          ) : (
            <Preloader />
          )}
        </section>
      )}
      <About />
    </main>
  );
}

export default Main;
