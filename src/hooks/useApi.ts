import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import {
  ChatQueryRequest,
  TopNamesByDecadeRequest,
  NameTimelineRequest,
  CreateSavedQueryRequest,
} from '@/lib/types';

export function useHealth() {
  return useQuery({
    queryKey: ['health'],
    queryFn: () => api.getHealth(),
    staleTime: 5 * 60 * 1000,
    retry: 3,
  });
}

export function useChatQuery() {
  return useMutation({
    mutationFn: (request: ChatQueryRequest) => api.chatQuery(request),
  });
}

export function useTopNamesByDecade() {
  return useMutation({
    mutationFn: (request: TopNamesByDecadeRequest) => api.getTopNamesByDecade(request),
  });
}

export function useNameTimeline() {
  return useMutation({
    mutationFn: (request: NameTimelineRequest) => api.getNameTimeline(request),
  });
}

export function useSavedQueries() {
  return useQuery({
    queryKey: ['savedQueries'],
    queryFn: () => api.getSavedQueries(),
    staleTime: 30 * 1000,
  });
}

export function useCreateSavedQuery() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: CreateSavedQueryRequest) => api.createSavedQuery(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedQueries'] });
    },
  });
}

export function useDeleteSavedQuery() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => api.deleteSavedQuery(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedQueries'] });
    },
  });
}
