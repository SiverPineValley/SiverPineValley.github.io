import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"

export default class BlogList extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges;
    const location = this.props.location;
    const currentPage = this.props.pageContext.currentPage;
    const numPages = this.props.pageContext.numPages;
    const renderingPagenation = () => {
      let renderPage = currentPage <= 3 ? 1 : currentPage - 2;
      let endPage = (currentPage <= 3 ? 5 : currentPage + 2);
      endPage = endPage > numPages ? numPages : endPage;
      const result = [];
      for (; renderPage <= endPage; renderPage++) {
        result.push(<div key={renderPage}><Link to={renderPage === 1 ? `/blog` : `/blog/${renderPage}`}>{renderPage}</Link></div>);
      }
      return result;
    };

    return (
      <Layout location={location}>
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <li key={node.fields.slug}>
              <Link to={node.fields.slug}>{title}</Link>
            </li>
          )
        })}
        <div>{renderingPagenation()}</div>
      </Layout>
    )
  }
}

export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC }}
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`