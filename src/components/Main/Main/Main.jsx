import { defaultNewsArticles } from "../../../utils/defaultNewsArticles";

function Main() {
  return (
    <main>
      <section className="articles">
        <ul className="articles__list">
          {defaultNewsArticles.map((item) => {
            return (
              <div key={item._id}>
                <p>{item.source.name}</p>
                <img className="articles__item" src={item.urlToImage} alt="" />
              </div>
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
