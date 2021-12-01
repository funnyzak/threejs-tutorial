// 内容返回数据
export declare interface IContentResponse {
  city: string;
  summary: string;
  author: string;
  source: string;
  top: boolean;
  recommend: boolean;
  hot: boolean;
  color: boolean;
  linkUrl?: string;
  addDate: string;
  id: number;
}

// 内容列表返回数据
export declare interface IContentsResponse {
  totalCount: number;
  contents: Array<IContentResponse>;
}
