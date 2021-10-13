export interface AssetModal {
  data: {
    nasa_id: string;
    title: string;
    links: Link[];
  };
}

interface Link {
  href: string;
  rel: string;
  render: string;
}
