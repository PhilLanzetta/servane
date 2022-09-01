import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import { renderRichText } from "gatsby-source-contentful/rich-text"

const Biography = ({ data }) => {
  const bioRichText = data.contentfulBiographyPage.cv

  const renderOptions = {
    renderText: text => {
      return text.split("\n").reduce((children, textSegment, index) => {
        return [...children, index > 0 && <br key={index} />, textSegment]
      }, [])
    },
  }

  return (
    <Layout>
      <section className="bio-page">{renderRichText(bioRichText, renderOptions)}</section>
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
