import {
  HealthResponse,
  ChatQueryResponse,
  TopNamesByDecadeResponse,
  NameTimelineResponse,
  SavedQuery,
} from './types';

export const mockHealth: HealthResponse = {
  status: 'healthy',
  dataset_info: {
    min_year: 1880,
    max_year: 2024,
    total_records: 2100000,
  },
};

export const mockChatResponse: ChatQueryResponse = {
  answer: 'Based on the data, the name "Emma" has been consistently popular in recent decades.',
  structured_result: {
    chart_data: [
      { decade: '2000s', name: 'Emma', count: 234567, rank: 1 },
      { decade: '2010s', name: 'Emma', count: 312890, rank: 1 },
      { decade: '2020s', name: 'Emma', count: 189234, rank: 2 },
    ],
    summary: 'Emma has maintained top rankings across recent decades.',
  },
};

export const mockTopNamesByDecade: TopNamesByDecadeResponse = {
  data: [
    { decade: '1880s', name: 'Mary', count: 91668, rank: 1 },
    { decade: '1880s', name: 'Anna', count: 38159, rank: 2 },
    { decade: '1890s', name: 'Mary', count: 110693, rank: 1 },
    { decade: '1890s', name: 'Anna', count: 52144, rank: 2 },
    { decade: '1900s', name: 'Mary', count: 269748, rank: 1 },
    { decade: '1900s', name: 'Helen', count: 109594, rank: 2 },
  ],
  summary: 'Mary dominated as the top name across multiple decades in the late 19th century.',
};

export const mockNameTimeline: NameTimelineResponse = {
  data: [
    { year: 2000, count: 18754, rank: 3 },
    { year: 2005, count: 21456, rank: 2 },
    { year: 2010, count: 24890, rank: 1 },
    { year: 2015, count: 26123, rank: 1 },
    { year: 2020, count: 19234, rank: 2 },
  ],
  summary: 'The name showed peak popularity in the 2010s.',
  name: 'Emma',
  sex: 'F',
};

export const mockSavedQueries: SavedQuery[] = [
  {
    id: 1,
    prompt: 'What are the top 10 baby names in the 1990s?',
    title: 'Top Names 1990s',
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    prompt: 'Show me the popularity trend of the name Sophia',
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 3,
    prompt: 'Compare male vs female name diversity over time',
    title: 'Gender Name Diversity',
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
];
