export type TOrder = {
  id: number;
  order_id: string;
  user_id: number;
  status: string;
  auto_refresh: boolean;
  date_end: string;
  title: string;
  price: string;
  type: string;
  country: string;
}

export type TOrders = TOrder[];