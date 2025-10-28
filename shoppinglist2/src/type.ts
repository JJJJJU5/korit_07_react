export type ItemResponse = {
  product: string;
  amount: string
  _links: {
    self: {
      href: string
    }
  };
  item: {
    href: string
  };
  appUser: {
    href: string
  };
}

export type Item = {
  product: string;
  amount: string
}
