export type VisitorRow = {
  city: string;
  country: string;
  country_code: string;
  created_at: string;
};

export type VisitorFeedResponse = {
  visitors: VisitorRow[];
  available: boolean;
};
