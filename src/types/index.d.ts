/* 계정 모델 인터페이스 */
export interface IAccount {
  _id: string;
  username: string;
  password: string;
  name: string;
  birth: string;
  gender: 'M' | 'F';
}

/* 전시회 모델 인터페이스 */
export interface IExhibition {
  _id: string;
  title: string;
  description: string;
  hashtag: Array<string>;
  pieces: Array<IPiece>;
}

/* 작품 모델 인터페이스 */
export interface IPiece {
  _id: stirng;
  title: string;
  description: string;
  background: {
    type: 'default' | 'custom';
    path: string;
  };
  frame: string;
}
