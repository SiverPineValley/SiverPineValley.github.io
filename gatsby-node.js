/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

const path = require("path")
const _ = require("lodash")

const { createFilePath } = require(`gatsby-source-filesystem`)

// Define the template for blog post
const blogPostTemplate = path.resolve(`./src/templates/blog-post.js`)
const blotListTemplate = path.resolve(`./src/templates/blog-list-template.js`);
const tagTemplate = path.resolve("./src/templates/tags.js")

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Get all markdown blog posts sorted by date
  const result = await graphql(`
    {
      postsRemark: allMarkdownRemark(
        sort: { frontmatter: { date: DESC }}
        limit: 2000
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              tags
            }
          }
        }
      }
      tagsGroup: allMarkdownRemark(limit: 2000) {
        group(field: { frontmatter: { tags: SELECT }}) {
          fieldValue
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const posts = result.data.postsRemark.edges
  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    // Create blog-list pages
    const postsPerPage = 10
    const numPages = Math.ceil(posts.length / postsPerPage)
    Array.from({ length: numPages }).forEach((_, i) => {
      let path = `/blog/${i + 1}`
      if (i === 0) {
        createPage({
          path: `/blog`,
          component: blotListTemplate,
          context: {
            limit: postsPerPage,
            skip: i * postsPerPage,
            numPages,
            currentPage: i + 1,
          },
        });
      }
      createPage({
        path: path,
        component: blotListTemplate,
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
        },
      });
    });

    posts.forEach((edge, index) => {
      let post = edge.node;
      const previousPostId = index === 0 ? null : posts[index - 1].id
      const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

      createPage({
        path: post.fields.slug,
        component: blogPostTemplate,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      })
    })
  }

  const tags = result.data.tagsGroup.group;

  // Make tag pages
  if (tags.length > 0) {
    tags.forEach(tag => {
      createPage({
        path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
        component: tagTemplate,
        context: {
          tag: tag.fieldValue,
        },
      })
    });
  }
}

/**
 * @type {import('gatsby').GatsbyNode['onCreateNode']}
 */
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

/**
 * @type {import('gatsby').GatsbyNode['createSchemaCustomization']}
 */
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      github: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `)
}
