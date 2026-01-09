import "./About.css";

function About() {
  return (
    <>
      <div className="about">
        <div className="about__container">
          <div className="about__image-container">
            <img
              src="https://images.unsplash.com/photo-1739407107085-5061af7d59da?q=80&w=3164&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Author picture"
              className="about__image"
            />
          </div>
          <div className="about__bio">
            <h2 className="about__title">About the author</h2>
            <p className="about__text">
              This is where text about the author will go
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
