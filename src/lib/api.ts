import {
  HealthResponse,
  ChatQueryRequest,
  ChatQueryResponse,
  TopNamesByDecadeRequest,
  TopNamesByDecadeResponse,
  NameTimelineRequest,
  NameTimelineResponse,
  SavedQuery,
  CreateSavedQueryRequest,
} from './types';
import {
  healthResponseSchema,
  chatQueryResponseSchema,
  topNamesByDecadeResponseSchema,
  nameTimelineResponseSchema,
  savedQueriesResponseSchema,
  savedQuerySchema,
} from './validators';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

class ApiError extends Error {
  constructor(
    message: string,
    public status?: number
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchWithValidation<T>(
  url: string,
  options: RequestInit,
  validator: (data: unknown) => T
): Promise<T> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new ApiError(
        `API request failed: ${response.status} ${response.statusText}. ${errorText}`,
        response.status
      );
    }

    const data = await response.json();
    return validator(data);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      error instanceof Error ? error.message : 'Network request failed'
    );
  }
}

export const api = {
  async getHealth(): Promise<HealthResponse> {
    return fetchWithValidation(
      `${API_BASE_URL}/health`,
      { method: 'GET' },
      (data) => healthResponseSchema.parse(data)
    );
  },

  async chatQuery(request: ChatQueryRequest): Promise<ChatQueryResponse> {
    return fetchWithValidation(
      `${API_BASE_URL}/chat/query`,
      {
        method: 'POST',
        body: JSON.stringify(request),
      },
      (data) => chatQueryResponseSchema.parse(data)
    );
  },

  async getTopNamesByDecade(
    request: TopNamesByDecadeRequest
  ): Promise<TopNamesByDecadeResponse> {
    return fetchWithValidation(
      `${API_BASE_URL}/analysis/top-names-by-decade`,
      {
        method: 'POST',
        body: JSON.stringify(request),
      },
      (data) => topNamesByDecadeResponseSchema.parse(data)
    );
  },

  async getNameTimeline(request: NameTimelineRequest): Promise<NameTimelineResponse> {
    return fetchWithValidation(
      `${API_BASE_URL}/analysis/name-timeline`,
      {
        method: 'POST',
        body: JSON.stringify(request),
      },
      (data) => nameTimelineResponseSchema.parse(data)
    );
  },

  async getSavedQueries(): Promise<SavedQuery[]> {
    return fetchWithValidation(
      `${API_BASE_URL}/saved-queries`,
      { method: 'GET' },
      (data) => savedQueriesResponseSchema.parse(data)
    );
  },

  async createSavedQuery(request: CreateSavedQueryRequest): Promise<SavedQuery> {
    return fetchWithValidation(
      `${API_BASE_URL}/saved-queries`,
      {
        method: 'POST',
        body: JSON.stringify(request),
      },
      (data) => savedQuerySchema.parse(data)
    );
  },

  async deleteSavedQuery(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/saved-queries/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new ApiError(
        `Failed to delete saved query: ${response.status} ${response.statusText}. ${errorText}`,
        response.status
      );
    }
  },
};

export { ApiError };
