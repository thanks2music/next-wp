import { NextPage } from "next"
// type
import PostType from "../../types/PostType"
// service
import PostService from "../../services/PostService"
// hooks
import usePostSwr from "../../hooks/swr/usePostSwr"
// component
import CommImage from "../../components/atoms/image/CommImage"
import Layout from "../../components/templates/Layout"
import CategoryLabel from "../../components/atoms/label/CategoryLabel"
import DateText from "../../components/atoms/text/DateText"
import PostHeading from "../../components/atoms/text/PostHeading"
import Link from "next/link"

const Post: NextPage<{
    slug: string,
    staticPost: PostType
}> = ({ staticPost, slug }) => {
    const post = usePostSwr({ id: slug, staticPost })
    return (
        <Layout>
            <div className="w-main mx-auto">
                <article>
                    <div className="mb-4">
                        <CommImage
                            src={post!.featuredImage.url}
                            alt=""
                            className="w-full h-96" />
                    </div>
                    <div className="flex mb-4">
                        <div className="mr-3">
                            <Link href={post!.category.slug}>
                                <CategoryLabel>{post!.category.name}</CategoryLabel>
                            </Link>
                        </div>
                        <DateText>{post!.date}</DateText>
                    </div>
                    <div className="mb-6">
                        <PostHeading>{post!.title}</PostHeading>
                    </div>
                    <div dangerouslySetInnerHTML={{__html: post!.content}}></div>
                </article>
            </div>
        </Layout>
    )
}

export async function getStaticPaths() {
    const paths = await PostService.getAllSlugList()
    return {
        paths,
        fallback: false, // pathsにないものは404
    }
}

export async function getStaticProps({ params }: {
    params: {
        slug: string
    }
}) {
    const slug = params.slug
    const staticPost = await PostService.getOne({ id: slug })
    if (!staticPost) {
        return { notFound: true } // errorの場合404
    }
    return {
        props: {
            slug,
            staticPost
        },
        revalidate: 10
    }
}

export default Post