require("./src/css/main.css")
require("slick-carousel/slick/slick.css")
require("slick-carousel/slick/slick-theme.css")

const scrollToElement = require("scroll-to-element")

exports.onRouteUpdate = ({ location }) => {
  checkHash(location)
}

const checkHash = location => {
  let { hash } = location
  if (hash) {
    scrollToElement(hash, {
      offset: -100,
      duration: 1000,
    })
  }
}
