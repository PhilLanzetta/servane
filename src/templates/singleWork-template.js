import React from "react"
import Layout from "../components/layout"
import Slider from "react-slick"
import slugify from "slugify"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

function NextArrow(props) {
  const { onClick } = props
  return (
    <div
      className="image-next"
      onClick={onClick}
      onKeyDown={onClick}
      role="button"
      tabIndex={0}
      aria-label="go to next"
    >
      <svg viewBox="0 0 170 150" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M157 75L3 5" stroke="black" strokeWidth="10" />
        <path d="M157 75L3 145" stroke="black" strokeWidth="10" />
        <path
          d="M159 70.5L169.5 75L159 79.5L157 75L159 70.5Z"
          fill="black"
          stroke="black"
          strokeWidth="0.15"
        />
      </svg>
    </div>
  )
}

function PrevArrow(props) {
  const { onClick } = props
  return (
    <div
      className="image-prev"
      onClick={onClick}
      onKeyDown={onClick}
      role="button"
      tabIndex={0}
      aria-label="go to previous"
    >
      <svg viewBox="0 0 170 150" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 75L167 5" stroke="black" strokeWidth="10" />
        <path d="M13 75L167 145" stroke="black" strokeWidth="10" />
        <path
          d="M11 70.5L0.5 75L11 79.5L13 75L11 70.5Z"
          fill="black"
          stroke="black"
          strokeWidth="0.15"
        />
      </svg>
    </div>
  )
}

const SingleWork = ({ data, pageContext }) => {
  const { next, prev } = pageContext
  const nextSlug = next ? slugify(next.artworkTitle, { lower: true }) : null
  const prevSlug = prev ? slugify(prev.artworkTitle, { lower: true }) : null
  const {
    artworkTitle,
    artworkDescription,
    artworkImages,
    artworkDate,
    exhibitionHistory,
  } = data.contentfulWork

  const artworkYear = new Date(artworkDate).getFullYear()

  const settings = {
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  }

  return (
    <Layout>
      <aside className="browse-link-container">
        <Link to={`/works#year${artworkYear}`}>&lt; back to works</Link>
        <article className="next-prev-link-container">
          {prevSlug && (
            <Link className="next-prev-link" to={`/works/${prevSlug}`}>
              &lt; previous work
            </Link>
          )}
          {nextSlug && (
            <Link to={`/works/${nextSlug}`} className="next-prev-link">
              next work &gt;
            </Link>
          )}
        </article>
      </aside>
      <section>
        <article className="work-slideshow">
          <article className="artwork-info">
            <p>
              <span>&#8810;&nbsp;</span>
              {artworkTitle}
              <span>&nbsp;&#8811;</span>, {artworkYear}.
            </p>
            <p>{artworkDescription}</p>
          </article>
          <Slider {...settings} className="work-slides">
            {artworkImages.map(image => (
              <div className="work-slides-container" key={image.id}>
                <GatsbyImage
                  image={image.gatsbyImageData}
                  alt={image.description}
                  className="work-slide-img"
                ></GatsbyImage>
              </div>
            ))}
          </Slider>
        </article>
        {exhibitionHistory && (
          <article className="exhibition-history">
            <h3>Exhibition History</h3>
            {exhibitionHistory.map((exhibit, index) => {
              const exhibitSlug = slugify(exhibit.exhibitionTitle, {
                lower: true,
              })
              return (
                <Link
                  key={index}
                  to={`/exhibitions/${exhibitSlug}`}
                  className="exhibit-info"
                >
                  <span className="exhibit-title">
                    {exhibit.exhibitionTitle}
                  </span>
                  ,{" "}
                  {exhibit.exhibitionOrganizer && (
                    <span>organized by {exhibit.exhibitionOrganizer}, </span>
                  )}
                  <span className="exhibit-location">
                    {exhibit.exhibitionLocation}
                  </span>
                  ,{" "}
                  <span className="exhibit-dates">
                    {new Date(exhibit.exhibitionStartDate).toLocaleString(
                      "default",
                      {
                        month: "long",
                        day: "numeric",
                      }
                    )}{" "}
                    -{" "}
                    {new Date(exhibit.exhibitionEndDate).toLocaleString(
                      "default",
                      {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </span>
                </Link>
              )
            })}
          </article>
        )}
      </section>
    </Layout>
  )
}

export const query = graphql`
  query getSingleArtwork($title: String) {
    contentfulWork(artworkTitle: { eq: $title }) {
      artworkDescription
      artworkTitle
      artworkDate
      artworkImages {
        id
        gatsbyImageData
        description
      }
      exhibitionHistory {
        exhibitionLocation
        exhibitionTitle
        exhibitionOrganizer
        exhibitionStartDate
        exhibitionEndDate
      }
    }
  }
`

export default SingleWork
