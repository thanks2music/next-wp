export class WpGraphQlPostConst { // 今後増える可能性を考えてこの命名に
    static list = `query PostListQuery {
        posts {
          edges {
            node {
              title
              id
              date
              content
            }
          }
        }
    }`
}