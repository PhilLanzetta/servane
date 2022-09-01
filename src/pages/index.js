import React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import slugify from "slugify"
import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = ({ data }) => {
  const { homeImage, homeImageTitle, years } = data.contentfulHomePage
  const homeWorkLink = slugify(homeImageTitle, { lower: true })
  const descYears = years
    .map(year => parseInt(year, 10))
    .sort(function (a, b) {
      return b - a
    })

  return (
    <Layout>
      <Seo title="Home" />
      <section className="home-container">
        <article className="year-container">
          {descYears.map((year, index) => (
            <Link key={index} to={`/works#year${year}`} className="year-link">
              {year}
            </Link>
          ))}{" "}
        </article>
        <Link to={`/works/${homeWorkLink}`} className="home-image">
          <GatsbyImage
            image={homeImage.gatsbyImageData}
            alt={homeImage.description}
          />
        </Link>
      </section>
    </Layout>
  )
}

export const Head = () => <Seo title="Home" />

export const query = graphql`
  query {
    contentfulHomePage {
      homeImageTitle
      years
      homeImage {
        gatsbyImageData
        id
        description
        title
      }
    }
  }
`

export default IndexPage
