import type { NextPage } from 'next'
// PostType
import PostType from '../types/PostType'
// Service
import PostService from '../services/PostService'
// Hooks
import usePostListSwr from '../hooks/swr/usePostListSwr'
// Component
import Image from 'next/image'

const Home: NextPage<{
  staticPostList: PostType[]
}> = ({ staticPostList }) => {
  const postList = usePostListSwr(staticPostList)
  return (
    <div className='flex flex-wrap'>
      {postList!.map((post) => {
        return (
          <div key={post.id} className='w-1/3 p-4'>
            <article className='shadow-sm shadow-gray-200'>
              <div>
                <img
                  className='w-full h-56 object-cover'
                  src={post.featuredImage.url} /> {/* あとで<Image />に変える */}
              </div>
              <div className='py-4 px-5'>
                <span>{post.category.name}</span>
                <h1 className='font-bold'>{post.title}</h1>
                <p>{post.excerpt}</p>
                <span>{post.date}</span>
              </div>
            </article>
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
