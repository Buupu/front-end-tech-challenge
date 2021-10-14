export interface AssetSearchResultModal {
  data: {
    nasa_id: string;
    title: string;
    media_type: string;
  }[];
  links: Link[];
}

export interface AssetModal {
  title: string;
  description: string;
  mediaType: string;
  mediaUrl: string;
}

export interface AssetResponseModal {
  collection: { items: { href: string }[] };
}

export interface SearchCollectionModal {
  collection: {
    items: AssetSearchResultModal[];
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
