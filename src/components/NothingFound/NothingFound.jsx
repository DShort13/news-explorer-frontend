import nothingFound from "../../assets/no-results-found.svg";
import "./NothingFound.css";

function NothingFound() {
  return (
    <div className="nothingFound__container">
      <img
        className="nothingFound__image"
        src={nothingFound}
        alt="Nothing found"
      />
      <h4 className="nothingFound__title">Nothing found</h4>
      <p className="nothingFound__text">
        Sorry, but nothing matched your search terms.
      </p>
    </div>
  );
}

export default NothingFound;
