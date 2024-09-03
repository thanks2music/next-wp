import type { NextPage } from "next";
// type
import PostOnListType from "../../types/PostOnListType";
// service
import PostService from "../../services/PostService";
// hooks
import usePostListSwr from "../../hooks/swr/usePostListSwr";
// component
import PostBox from "../../components/molecules/PostBox";
import Link from "next/link";
import Layout from "../../components/templates/Layout";

const PostListByCategory: NextPage<{
  categoryId: number;
  staticPostList: PostOnListType[];
}> = ({ categoryId, staticPostList }) => {
  const postList = usePostListSwr({ categoryId, staticPostList });
  return (
    <Layout>
      <div className="flex flex-wrap w-main mx-auto">
        {postList!.map((post) => {
          return (
            <div
              key={post.id}
              className="w-1/3 pr-4 pb-4 [&:nth-of-type(3n)]:pr-0"
            >
              <PostBox post={post} />
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  const paths = await PostService.getAllCategorySlugList();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const slug = params.slug;
  const categoryId = await PostService.getCategoryIdBySlug({ slug }); // あえてPostService.getListの中に書かない（categoryIdをpropsに渡したいから）
  const staticPostList = await PostService.getList({ categoryId });
  return {
    props: {
      categoryId,
      staticPostList,
    },
    revalidate: 10,
  };
}

export default PostListByCategory;
