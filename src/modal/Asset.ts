export interface AssetModal {
  data: {
    nasa_id: string;
    title: string;
    links: Link[];
  }[];
}

export interface SearchCollectionModal {
  collection: {
    items: AssetModal[];
    links: Link;
    metadata: { total_hits: number };
  };
}

interface Link {
  href: string;
  rel: string;
  render?: string;
  prompt?: string;
}
