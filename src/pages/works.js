import React from "react"
import Layout from "../components/layout"
import Year from "../components/year"
import { graphql } from "gatsby"
import { useState } from "react"
import Seo from "../components/seo"

const Works = ({ data, location }) => {
  const { years } = data.contentfulHomePage
  const [isExhibit, setIsExhibit] = useState(location.state?.exhibit)
  const descYears = years
    .map(year => parseInt(year, 10))
    .sort(function (a, b) {
      return b - a
    })

  return (
    <Layout>
      {descYears.map((year, index) => (
        <section key={index} id={`year${year}`}>
          <h2>{year}</h2>
          <Year year={year} isExhibit={isExhibit}></Year>
        </section>
      ))}
    </Layout>
  )
}

export const query = graphql`
  query {
    contentfulHomePage {
      years
    }
  }
`

export const Head = () => <Seo title="Works" />

export default Works
