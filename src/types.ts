export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: "News" | "Campaign" | "Event" | "Media";
  description: string;
  imageUrl?: string;
  isFakeNewsCampaign?: boolean;
}

export interface IssueItem {
  id: string;
  title: string;
  icon: string;
  description: string;
  detailedPoints: string[];
}

export interface HighlightCard {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface TruthResponse {
  verdict: "TRUE" | "PARTIALLY_TRUE" | "MISLEADING" | "FALSE";
  explanation: string;
  ratingPercentage: number;
  keyFacts: string[];
  propagandaSpotted: string[];
  sourcesSuggested: string[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: Date;
}

export interface VolunteerTask {
  id: string;
  title: string;
  points: number;
  status: "available" | "claimed" | "completed";
}
