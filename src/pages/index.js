import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'

import Layout from '../components/layout'
import Hero from '../components/hero'
import ArticlePreview from '../components/article-preview'

class RootIndex extends React.Component {
  render() {
    const usPosts = get(this, 'props.data.us.nodes')
    const chPosts = get(this, 'props.data.ch.nodes')
    const [author] = get(this, 'props.data.allContentfulPerson.nodes')

    if (!this.props.location.state) {
        this.props.location.state = {
            "lang": "en"
        }
    }

    const articlePreview = (posts) => {
      if (posts === "ch"){
          return chPosts;
      } else {
          return usPosts;
      }
    };

    return (
      <Layout location={this.props.location}>
        <Hero
          image={author.heroImage.gatsbyImageData}
          title={author.name}
          content={author.shortBio.shortBio}
        />
        {/*<ArticlePreview posts={posts} />*/}

        <ArticlePreview posts={articlePreview(this.props.location.state.lang)} />
      </Layout>
    )
  }
}

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery {
    us: allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }, filter: { node_locale: { eq: "en-US" } }) {
      nodes {
        title
        slug
        publishDate(formatString: "MMMM Do, YYYY")
        tags
        heroImage {
          gatsbyImageData(
            layout: FULL_WIDTH
            placeholder: BLURRED
            width: 424
            height: 212
          )
        }
        description {
          childMarkdownRemark {
            html
          }
        }
      }
    }
    ch: allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }, filter: { node_locale: { eq: "zh" } }) {
      nodes {
        title
        slug
        publishDate(formatString: "MMMM Do, YYYY")
        tags
        heroImage {
          gatsbyImageData(
            layout: FULL_WIDTH
            placeholder: BLURRED
            width: 424
            height: 212
          )
        }
        description {
          childMarkdownRemark {
            html
          }
        }
      }
    }
    allContentfulPerson(
      filter: { contentful_id: { eq: "15jwOBqpxqSAOy2eOO4S0m" } }
    ) {
      nodes {
        name
        shortBio {
          shortBio
        }
        title
        heroImage: image {
          gatsbyImageData(
            layout: CONSTRAINED
            placeholder: BLURRED
            width: 1180
          )
        }
      }
    }
  }
`
