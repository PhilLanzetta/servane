import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import { renderRichText } from "gatsby-source-contentful/rich-text"

const Biography = ({ data }) => {
  const bioRichText = data.contentfulBiographyPage.cv
  const cvPdf = data.contentfulBiographyPage.cvPdf.url

  const renderOptions = {
    renderText: text => {
      return text.split("\n").reduce((children, textSegment, index) => {
        return [...children, index > 0 && <br key={index} />, textSegment]
      }, [])
    },
  }

  return (
    <Layout>
      <section className="bio-page">
        <a href={cvPdf} target="_blank" rel="noreferrer" className="cv-button">
          View as PDF
        </a>
        {renderRichText(bioRichText, renderOptions)}
      </section>
    </Layout>
  )
}

export const query = graphql`
  query {
    contentfulBiographyPage {
      cv {
        raw
      }
      cvPdf {
        url
      }
    }
  }
`

export default Biography
