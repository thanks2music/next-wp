import useSWR from "swr";
// const
import { WpGraphQlPostConst } from "../../constants/WpGraphQlConst";
// type
import PostOnListType from "../../types/PostOnListType";
// service
import PostService from "../../services/PostService";

const usePostListSwr = (staticPostList: PostOnListType[]) => {
    const { data: postList } = useSWR(
        WpGraphQlPostConst.list,
        PostService.getList,
        { fallbackData: staticPostList }
    )
    return postList;
}

export default usePostListSwr;