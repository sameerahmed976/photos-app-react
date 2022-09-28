import React from "react";

const Photo = ({
  urls: { regular },
  alt_description,
  likes,
  user: {
    name,
    portfolio_url,
    profile_image: { medium },
  },
}) => {
  return (
    <>
      <article className="photo__card">
        <img src={regular} alt={alt_description} className="image" />
        <div className="card__content">
          <div className="heading">
            <h2>{name}</h2>
            <p>{likes}</p>
          </div>
          <a href={portfolio_url}>
            <img
              src={medium}
              alt="portfolio image"
              className="portfolio__image"
            />
          </a>
        </div>
      </article>
    </>
  );
};

export default Photo;
