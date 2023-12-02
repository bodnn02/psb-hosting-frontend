export type TCurrentOrder = {
  order: [
    {
      id: number;
      order_id: string;
      user_id: number;
      product: number;
      status: string;
      os: string;
      auto_refresh: boolean;
      date_create: string;
      date_end: string;
      bill_id: string;
      profit: string;
      control_panel: string;
      period: string;
      id_1: number;
      title: string;
      price: number;
      bill_id_1: string;
      type: string;
      country: string;
      profit_1: number;
    }
  ];
  order_data: [
    {
      id: number;
      ip: string;
      port: string;
      superuser: string;
      password: string;
      order_id: number;
    }
  ];
  system: TSystem[];
};

type TSystem = {
  id: number;
  name: string;
  content: string;
};
