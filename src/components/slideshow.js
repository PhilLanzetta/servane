import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Marquee from "react-fast-marquee"

const query = graphql`
  query {
    allContentfulAsset(
      filter: { file: { contentType: { eq: "image/jpeg" } } }
    ) {
      nodes {
        id
        url
        width
        height
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
        const imgWidth = (image.width * 80) / image.height
        return (
          <div key={image.id} className="marquee-img-container">
            <img
              src={image.url}
              alt={image.description}
              style={{ height: "80vh", width: `${imgWidth}vh` }}
            ></img>
          </div>
        )
      })}
    </Marquee>
  )
}

export default SlideShow
