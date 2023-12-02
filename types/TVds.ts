export type TVds = {
  "id": number;
  "title": string;
  "price": number;
  "bill_id": number;
  "type": string;
  "country": string;
  "profit": number;
  "characters": Array<TCharacter>;
}

type TCharacter = {
  "id": number;
  "name": string;
  "content": string;
}