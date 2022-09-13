import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Layout from "../components/layout"
import Slider from "react-slick"
import slugify from "slugify"
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

const SingleExhibit = ({ data, pageContext }) => {
  const { next, prev } = pageContext
  const nextSlug = next ? slugify(next.exhibitionTitle, { lower: true }) : null
  const prevSlug = prev ? slugify(prev.exhibitionTitle, { lower: true }) : null
  const {
    exhibitionTitle,
    exhibitionStartDate,
    exhibitionEndDate,
    exhibitionLocation,
    exhibitionImages,
    exhibitionOrganizer,
    pressRelease,
    worksInExhibition,
  } = data.contentfulExhibition

  const exhibitionYear = new Date(exhibitionStartDate).getFullYear()
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

  const settings = {
    nextArrow: <NextArrow addClassName="image-next" />,
    prevArrow: <PrevArrow addClassName="image-prev" />,
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
        <Link to={`/works#year${exhibitionYear}`} state={{ exhibit: true }}>
          &lt; back to exhibits
        </Link>
        <article className="next-prev-link-container">
          {prevSlug && (
            <Link className="next-prev-link" to={`/exhibitions/${prevSlug}`}>
              &lt; previous exhibition
            </Link>
          )}
          {nextSlug && (
            <Link to={`/exhibitions/${nextSlug}`} className="next-prev-link">
              next exhibition &gt;
            </Link>
          )}
        </article>
      </aside>
      <section>
        <article className="work-slideshow exhibit">
          <Slider {...settings} className="work-slides">
            {exhibitionImages.map((image, index) => {
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
          <article className="exhibit-info">
            <p>
              <span className="exhibit-title">{exhibitionTitle}</span>,{" "}
              {exhibitionLocation}{" "}
              {exhibitionOrganizer && (
                <span>organized by {exhibitionOrganizer}, </span>
              )}
              {new Date(exhibitionStartDate).toLocaleString("default", {
                month: "long",
                day: "numeric",
              })}{" "}
              -{" "}
              {new Date(exhibitionEndDate).toLocaleString("default", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            {pressRelease && (
              <a
                href={pressRelease.url}
                className="exhibit-press-release"
                target="_blank"
                rel="noreferrer"
              >
                View the Press Release
              </a>
            )}
            {worksInExhibition && (
              <article className="works-in-exhibit">
                <h3>Works in Exhibition</h3>
                <article className="exhibit-works-container">
                  {worksInExhibition.map((work, index) => {
                    const slug = slugify(work.artworkTitle, { lower: true })
                    return (
                      <>
                        {work.artworkImages.map((image, index) => {
                          const imgWidth =
                            (image.gatsbyImageData.width * 15) /
                            image.gatsbyImageData.height
                          return (
                            <Link
                              key={index}
                              to={`/works/${slug}`}
                              className="exhibit-work-thumbnail-container"
                            >
                              <figure>
                                <GatsbyImage
                                  image={image.gatsbyImageData}
                                  style={{ width: `${imgWidth}vw` }}
                                ></GatsbyImage>
                                <figcaption>{work.artworkTitle}</figcaption>
                              </figure>
                            </Link>
                          )
                        })}
                      </>
                    )
                  })}
                </article>
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
              {exhibitionImages.map((image, index) => {
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
  query getSingleExhibit($title: String) {
    contentfulExhibition(exhibitionTitle: { eq: $title }) {
      exhibitionTitle
      exhibitionStartDate
      exhibitionEndDate
      exhibitionOrganizer
      pressRelease {
        url
      }
      exhibitionLocation
      exhibitionImages {
        id
        gatsbyImageData(placeholder: BLURRED)
        description
      }
      worksInExhibition {
        artworkTitle
        artworkImages {
          id
          gatsbyImageData(placeholder: BLURRED)
          description
        }
      }
    }
  }
`

export default SingleExhibit
