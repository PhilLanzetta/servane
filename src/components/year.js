import React from "react"
import { useState } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

const query = graphql`
  {
    allContentfulWork(sort: { fields: artworkDate, order: DESC }) {
      nodes {
        id
        slug
        artworkDate
        artworkTitle
        artworkImages {
          description
          gatsbyImageData(placeholder: BLURRED)
          id
        }
      }
    }
    allContentfulExhibition(
      sort: { fields: exhibitionStartDate, order: DESC }
    ) {
      nodes {
        id
        slug
        exhibitionTitle
        exhibitionLocation
        exhibitionOrganizer
        exhibitionStartDate
        exhibitionEndDate
      }
    }
  }
`

const Year = ({ year, isExhibit }) => {
  const data = useStaticQuery(query)
  const works = data.allContentfulWork.nodes
  const exhibits = data.allContentfulExhibition.nodes
  const [tab, setTab] = useState(isExhibit ? "exhibit" : "work")
  return (
    <>
      <div className="year-container-heading">
        <button onClick={() => setTab("work")}>
          <h3 className={`underline ${tab === "work" ? "active" : ""}`}>
            Work
          </h3>
        </button>
        <button onClick={() => setTab("exhibit")}>
          <h3 className={`underline ${tab === "exhibit" ? "active" : ""}`}>
            Exhibitions
          </h3>
        </button>
      </div>
      {tab === "work" && (
        <article className="works-container fade-in">
          {works.map(work => {
            const artworkYear = new Date(work.artworkDate).getFullYear()
            const imgWidth =
              (work.artworkImages[0]?.gatsbyImageData.width * 23) /
              work.artworkImages[0]?.gatsbyImageData.height
            if (artworkYear === year) {
              return (
                <Link
                  key={work.id}
                  to={work.slug}
                  className="work-thumbnail-container"
                >
                  <GatsbyImage
                    image={work.artworkImages[0]?.gatsbyImageData}
                    alt={work.artworkImages[0]?.description}
                    style={{ width: `${imgWidth}vw` }}
                    className="work-thumbnail"
                  ></GatsbyImage>
                </Link>
              )
            } else {
              return null
            }
          })}
        </article>
      )}
      {tab === "exhibit" && (
        <article className="exhibit-container fade-in">
          {exhibits.map(exhibit => {
            const exhibitYear = new Date(
              exhibit.exhibitionStartDate
            ).getFullYear()
            if (exhibitYear === year) {
              const slug = exhibit.slug
              return (
                <Link
                  key={exhibit.id}
                  to={`/exhibitions/${slug}`}
                  className="exhibit-link"
                >
                  <span className="exhibit-title">
                    {exhibit.exhibitionTitle}
                  </span>
                  , {exhibit.exhibitionLocation},{" "}
                  {exhibit.exhibitionOrganizer && (
                    <span>organized by {exhibit.exhibitionOrganizer}, </span>
                  )}
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
                </Link>
              )
            } else {
              return null
            }
          })}
        </article>
      )}
    </>
  )
}

export default Year
