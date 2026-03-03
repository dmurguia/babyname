export type Sex = 'all' | 'M' | 'F';

export interface HealthResponse {
  status: string;
  dataset_info?: {
    min_year: number;
    max_year: number;
    total_records: number;
  };
}

export interface ChatQueryRequest {
  query: string;
}

export interface ChatQueryResponse {
  answer: string;
  structured_result?: {
    chart_data?: Array<{
      decade?: string;
      year?: number;
      name?: string;
      count?: number;
      rank?: number;
      [key: string]: string | number | undefined;
    }>;
    summary?: string;
  };
}

export interface TopNamesByDecadeRequest {
  top_n: number;
  sex: Sex;
}

export interface TopNamesByDecadeResponse {
  data: Array<{
    decade: string;
    name: string;
    count: number;
    rank: number;
  }>;
  summary: string;
}

export interface NameTimelineRequest {
  name: string;
  sex: Sex;
}

export interface NameTimelineResponse {
  data: Array<{
    year: number;
    count: number;
    rank?: number;
  }>;
  summary: string;
  name: string;
  sex: Sex;
}

export interface SavedQuery {
  id: number;
  prompt: string;
  title?: string;
  created_at: string;
}

export interface CreateSavedQueryRequest {
  prompt: string;
  title?: string;
}

export interface AnalysisResult {
  type: 'chat' | 'top-names' | 'timeline';
  data: ChatQueryResponse | TopNamesByDecadeResponse | NameTimelineResponse;
  timestamp: number;
}
