import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import {
  ChatQueryRequest,
  TopNamesByDecadeRequest,
  NameTimelineRequest,
  CreateSavedQueryRequest,
} from '@/lib/types';
import {
  mockHealth,
  mockChatResponse,
  mockTopNamesByDecade,
  mockNameTimeline,
  mockSavedQueries,
} from '@/lib/mock-data';

const USE_MOCK_DATA = !import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_BASE_URL === 'https://your-backend-url';

export function useHealth() {
  return useQuery({
    queryKey: ['health'],
    queryFn: async () => {
      if (USE_MOCK_DATA) return mockHealth;
      try {
        return await api.getHealth();
      } catch (error) {
        console.warn('API unavailable, using mock data:', error);
        return mockHealth;
      }
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}

export function useChatQuery() {
  return useMutation({
    mutationFn: async (request: ChatQueryRequest) => {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 500));
        return mockChatResponse;
      }
      try {
        return await api.chatQuery(request);
      } catch (error) {
        console.warn('API unavailable, using mock data:', error);
        return mockChatResponse;
      }
    },
  });
}

export function useTopNamesByDecade() {
  return useMutation({
    mutationFn: async (request: TopNamesByDecadeRequest) => {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 500));
        return mockTopNamesByDecade;
      }
      try {
        return await api.getTopNamesByDecade(request);
      } catch (error) {
        console.warn('API unavailable, using mock data:', error);
        return mockTopNamesByDecade;
      }
    },
  });
}

export function useNameTimeline() {
  return useMutation({
    mutationFn: async (request: NameTimelineRequest) => {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 500));
        return mockNameTimeline;
      }
      try {
        return await api.getNameTimeline(request);
      } catch (error) {
        console.warn('API unavailable, using mock data:', error);
        return mockNameTimeline;
      }
    },
  });
}

export function useSavedQueries() {
  return useQuery({
    queryKey: ['savedQueries'],
    queryFn: async () => {
      if (USE_MOCK_DATA) return mockSavedQueries;
      try {
        return await api.getSavedQueries();
      } catch (error) {
        console.warn('API unavailable, using mock data:', error);
        return mockSavedQueries;
      }
    },
    staleTime: 30 * 1000,
    retry: false,
  });
}

export function useCreateSavedQuery() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: CreateSavedQueryRequest) => {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 300));
        const newQuery = {
          id: Date.now(),
          prompt: request.prompt,
          title: request.title,
          created_at: new Date().toISOString(),
        };
        return newQuery;
      }
      try {
        return await api.createSavedQuery(request);
      } catch (error) {
        console.warn('API unavailable, simulating save:', error);
        const newQuery = {
          id: Date.now(),
          prompt: request.prompt,
          title: request.title,
          created_at: new Date().toISOString(),
        };
        return newQuery;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedQueries'] });
    },
  });
}

export function useDeleteSavedQuery() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 300));
        return;
      }
      try {
        return await api.deleteSavedQuery(id);
      } catch (error) {
        console.warn('API unavailable, simulating delete:', error);
        return;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedQueries'] });
    },
  });
}
