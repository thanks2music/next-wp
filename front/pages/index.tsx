import type { NextPage } from 'next'
// Post
import PostType from '../types/PostType'
// Service
import PostService from '../services/PostService'
// hooks
import usePostListSwr from '../hooks/swr/usePostListSwr'

const Home: NextPage<{
  staticPostList: PostType[] // 型の指定をする場所に注意！
}> = ({ staticPostList }) => {
  const postList = usePostListSwr(staticPostList);

  return (
    <div>
      {postList!.map((post) => {
        return <p key={post.id}>{post.title}</p> // 一個ずつ表示させる
      })}
    </div>
  )
}

export async function getStaticProps() {
  const staticPostList = await PostService.getList(); // postListをとってくる
  return {
    props: {
      staticPostList
    },
    revalidate: 10
  }
}

export default Home
