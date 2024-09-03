import useSWR from "swr";
// const
import { WpGraphQlPostConst } from "../../constants/WpGraphQlConst";
// type
import PostOnListType from "../../types/PostOnListType";
// service
import PostService from "../../services/PostService";

const usePostListSwr = ({
  categoryId,
  staticPostList,
}: {
  categoryId?: number;
  staticPostList: PostOnListType[];
}) => {
  // TODO: トップページでpostListがundefiendになってしまう
  let key, fetcher;
  if (categoryId) {
    // key = [WpGraphQlPostConst.listByCategory, categoryId]
    key = [WpGraphQlPostConst.listByCategory, categoryId];
    fetcher = ([_, categoryId]: [string, number]) =>
      PostService.getList({ categoryId });
  } else {
    key = WpGraphQlPostConst.list;
    fetcher = PostService.getList;
  }

  // const key = categoryId ? [WpGraphQlPostConst.listByCategory, categoryId] : [WpGraphQlPostConst.list];
  // const fetcher = categoryId ? ([_, categoryId]: [string, number]) => PostService.getList({ categoryId }) : () => PostService.getList({});

  console.log("usePostListSwr key:", key); // デバッグ用のログ
  console.log("usePostListSwr fetcher:", fetcher); // デバッグ用のログ

  const { data: postList } = useSWR(key, fetcher, {
    fallbackData: staticPostList,
  });

  console.log("usePostListSwr postList:", postList); // デバッグ用のログ

  return postList;
};

export default usePostListSwr;
