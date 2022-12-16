import { Link } from "gatsby"
import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <section class="error-page">
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist...</p>
      <Link to="/">RETURN HOME</Link>
    </section>
  </Layout>
)

export const Head = () => <Seo title="404: Not Found" />

export default NotFoundPage
