export class WpGraphQlPostConst {
    static list = `query PostListQuery {
      posts {
        edges {
          node {
            categories {
              edges {
                node {
                  name
                  slug
                }
              }
            }
            date
            excerpt
            featuredImage {
              node {
                sourceUrl
              }
            }
            id
            slug
            title
          }
        }
      }
    }`
}