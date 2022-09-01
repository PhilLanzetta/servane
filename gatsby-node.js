const path = require("path")
const slugify = require("slugify")
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    query GetData {
      allContentfulWork(sort: { fields: artworkDate, order: DESC }) {
        edges {
          node {
            artworkTitle
          }
        }
      }
      allContentfulExhibition(
        sort: { fields: exhibitionStartDate, order: DESC }
      ) {
        edges {
          node {
            exhibitionTitle
          }
        }
      }
    }
  `)

  const works = result.data.allContentfulWork.edges

  works.forEach(({ node }, index) => {
    const workSlug = slugify(node.artworkTitle, { lower: true })
    createPage({
      path: `/works/${workSlug}`,
      component: path.resolve(`src/templates/singleWork-template.js`),
      context: {
        title: node.artworkTitle,
        prev: index === 0 ? null : works[index - 1].node,
        next: index === works.length - 1 ? null : works[index + 1].node,
      },
    })
  })

  const exhibits = result.data.allContentfulExhibition.edges

  exhibits.forEach(({ node }, index) => {
    const exhibitSlug = slugify(node.exhibitionTitle, { lower: true })
    createPage({
      path: `/exhibitions/${exhibitSlug}`,
      component: path.resolve(`src/templates/singleExhibit-template.js`),
      context: {
        title: node.exhibitionTitle,
        prev: index === 0 ? null : exhibits[index - 1].node,
        next: index === exhibits.length - 1 ? null : exhibits[index + 1].node,
      },
    })
  })
}
