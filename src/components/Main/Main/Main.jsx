import Header from "../../Header/Header";
import NewsCardList from "../../NewsCardList/NewsCardList";
import About from "../../About/About";

function Main({ defaultNewsArticles, handleLoginModal }) {
  return (
    <main>
      <Header handleLoginModal={handleLoginModal} />
      <NewsCardList defaultNewsArticles={defaultNewsArticles} />
      <About />
    </main>
  );
}

export default Main;
