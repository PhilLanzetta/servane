import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Marquee from "react-fast-marquee"
import { GatsbyImage } from "gatsby-plugin-image"

const query = graphql`
  query {
    allContentfulAsset(
      filter: { file: { contentType: { eq: "image/jpeg" } } }
    ) {
      nodes {
        id
        gatsbyImageData(placeholder: BLURRED)
        description
      }
    }
  }
`

const SlideShow = () => {
  const data = useStaticQuery(query)
  function shuffleArray(array) {
    let curId = array.length
    // There remain elements to shuffle
    while (0 !== curId) {
      // Pick a remaining element
      let randId = Math.floor(Math.random() * curId)
      curId -= 1
      // Swap it with the current element.
      let tmp = array[curId]
      array[curId] = array[randId]
      array[randId] = tmp
    }
    return array
  }

  const imageArray = shuffleArray(data.allContentfulAsset.nodes)

  return (
    <Marquee gradient={false} className="image-marquee">
      {imageArray.map(image => {
        const imgWidth =
          (image.gatsbyImageData.width * 80) / image.gatsbyImageData.height
        return (
          <div key={image.id} className="marquee-img-container">
            <GatsbyImage
              image={image.gatsbyImageData}
              alt={image.description}
              style={{ height: "80vh", width: `${imgWidth}vh` }}
            ></GatsbyImage>
          </div>
        )
      })}
    </Marquee>
  )
}

export default SlideShow
