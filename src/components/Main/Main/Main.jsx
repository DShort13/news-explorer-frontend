import Header from "../../Header/Header";
import NewsCardList from "../../NewsCardList/NewsCardList";
import About from "../../About/About";

function Main({ defaultNewsArticles }) {
  return (
    <main>
      <Header />
      <NewsCardList defaultNewsArticles={defaultNewsArticles} />
      <About />
    </main>
  );
}

export default Main;
