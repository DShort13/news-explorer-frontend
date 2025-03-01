import Header from "../../Header/Header";
import NewsCardList from "../../NewsCardList/NewsCardList";
import About from "../../About/About";

function Main({ defaultNewsArticles }) {
  return (
    <main>
      <Header />
      <h2>Search results</h2>
      <NewsCardList defaultNewsArticles={defaultNewsArticles} />
      <About />
    </main>
  );
}

export default Main;
