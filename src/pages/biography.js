import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import { renderRichText } from "gatsby-source-contentful/rich-text"

const Biography = ({ data }) => {
  const bioRichText = data.contentfulBiographyPage.cv
  return (
    <Layout>
      <section>{renderRichText(bioRichText)}</section>
    </Layout>
  )
}

export const query = graphql`
  query {
    contentfulBiographyPage {
      cv {
        raw
      }
    }
  }
`

export default Biography
