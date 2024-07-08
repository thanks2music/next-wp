import type { NextPage } from 'next'
// PostType
import PostType from '../types/PostType'
// Service
import PostService from '../services/PostService'
// Hooks
import usePostListSwr from '../hooks/swr/usePostListSwr'
// component
import PostBox from '../components/molecules/PostBox'

const Home: NextPage<{
  staticPostList: PostType[]
}> = ({ staticPostList }) => {
  const postList = usePostListSwr(staticPostList)
  return (
    <div className='flex flex-wrap w-main mx-auto'>
      {postList!.map((post) => {
        return (
          <div key={post.id} className='w-1/3 pr-4 pb-4 [&:nth-of-type(3n)]:pr-0'>
            <PostBox post={post} />
          </div>
        )
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
