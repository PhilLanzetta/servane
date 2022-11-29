import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Layout from "../components/layout"
import Slider from "react-slick"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

function NextArrow(props) {
  const { onClick } = props
  return (
    <div
      className={props.addClassName}
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
      className={props.addClassName}
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
  const nextSlug = next ? next.slug : null
  const prevSlug = prev ? prev.slug : null
  const {
    artworkTitle,
    artworkDescription,
    artworkImages,
    artworkDate,
    exhibitionHistory,
  } = data.contentfulWork

  const [isOpen, setIsOpen] = useState(false)
  const [imageId, setImageId] = useState(0)

  useEffect(() => {
    isOpen && (document.body.style.overflow = "hidden")
    !isOpen && (document.body.style.overflow = "unset")
  }, [isOpen])

  const handleOpen = id => {
    setImageId(id)
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
    setImageId(null)
  }

  const artworkYear = new Date(artworkDate).getFullYear()

  const settings = {
    nextArrow: <NextArrow addClassName="image-next" />,
    prevArrow: <PrevArrow addClassName="image-prev" />,
    adaptiveHeight: true,
  }

  const fullSettings = {
    nextArrow: <NextArrow addClassName="modal-next" />,
    prevArrow: <PrevArrow addClassName="modal-prev" />,
    initialSlide: imageId,
    adaptiveHeight: true,
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
          <Slider {...settings} className="work-slides">
            {artworkImages?.map((image, index) => {
              return (
                <div
                  className="work-slides-container"
                  key={image.id}
                  role="presentation"
                  aria-label="click to enlarge image"
                  onClick={() => handleOpen(index)}
                >
                  <div className="work-slide-img-container">
                    <GatsbyImage
                      image={image.gatsbyImageData}
                      alt={image.description}
                      className="work-slide-img"
                    ></GatsbyImage>
                  </div>
                </div>
              )
            })}
          </Slider>
          <article className="artwork-info">
            <p>
              <span>&#8810;&nbsp;</span>
              {artworkTitle}
              <span>&nbsp;&#8811;</span>, {artworkYear}.
            </p>
            <p>{artworkDescription}</p>
            {exhibitionHistory && (
              <article className="exhibition-history">
                <h3>Exhibition History</h3>
                {exhibitionHistory.map((exhibit, index) => {
                  const exhibitSlug = exhibit.slug
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
                        <span>
                          organized by {exhibit.exhibitionOrganizer},{" "}
                        </span>
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
          </article>
        </article>
      </section>
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal"
          >
            <button className="close-btn white" onClick={handleClose}>
              X
            </button>
            <Slider {...fullSettings} className="modal-slider">
              {artworkImages.map((image, index) => {
                return (
                  <div className="modal-slides-container" key={image.id}>
                    <div className="modal-img-container">
                      <GatsbyImage
                        image={image.gatsbyImageData}
                        imgStyle={{ objectFit: "contain" }}
                        alt={image.description}
                        className="modal-slide-img"
                      ></GatsbyImage>
                    </div>
                  </div>
                )
              })}
            </Slider>
          </motion.aside>
        )}
      </AnimatePresence>
    </Layout>
  )
}

export const query = graphql`
  query getSingleArtwork($slug: String) {
    contentfulWork(slug: { eq: $slug }) {
      slug
      artworkDescription
      artworkTitle
      artworkDate
      artworkImages {
        id
        gatsbyImageData(placeholder: BLURRED)
        description
      }
      exhibitionHistory {
        slug
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
