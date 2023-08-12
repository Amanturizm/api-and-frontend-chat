export interface IMessage {
  id: string;
  author: string;
  message: string;
  datetime: string;
}

export type TMessageWithoutIdAndDatetime = Omit<IMessage, 'id' | 'datetime'>;