import useSWR from "swr";
// const
import { WpGraphQlPostConst } from "../../constants/WpGraphQlConst";
// type
import PostType from "../../types/PostType";
// service
import PostService from "../../services/PostService";

const usePostListSwr = (staticPostList: PostType[]) => {
    const { data: postList } = useSWR(
        WpGraphQlPostConst.list,
        PostService.getList,
        { fallbackData: staticPostList }
    )
    return postList;
}

export default usePostListSwr;