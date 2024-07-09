import { WpGraphQlPostConst } from "../constants/WpGraphQlConst";
import Repository from "./Repository";

class PostRepository {
    static getList() {
        return Repository(WpGraphQlPostConst.list).getWp()
    }

    // slugから記事単体を取得
    static getOne({ id }: {
        id: string
    }) {
        return Repository(
            WpGraphQlPostConst.one,
            { variables: { id } }
        ).getWp()
    }

    // 全記事のslugを取得
    static getAllSlugList() {
        return Repository(WpGraphQlPostConst.allSlugList).getWp()
    }
}

export default PostRepository