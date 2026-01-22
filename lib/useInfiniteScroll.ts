import { useState, useEffect, useCallback, useRef } from 'react';

interface InfiniteScrollOptions<T> {
  fetchFunction: (page: number) => Promise<{
    data: T[];
    hasMore: boolean;
    totalItems?: number;
  }>;
  initialPage?: number;
  threshold?: number; // Distance from bottom to trigger load (in pixels)
}

interface InfiniteScrollReturn<T> {
  items: T[];
  loading: boolean;
  loadingMore: boolean;
  hasMore: boolean;
  error: string | null;
  loadMore: () => void;
  reset: () => void;
  observerRef: (node: HTMLDivElement | null) => void;
}

/**
 * Custom hook for infinite scroll pagination
 * Implements Intersection Observer API for performance
 */
export function useInfiniteScroll<T>({
  fetchFunction,
  initialPage = 1,
  threshold = 200,
}: InfiniteScrollOptions<T>): InfiniteScrollReturn<T> {
  const [items, setItems] = useState<T[]>([]);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Refs to prevent multiple simultaneous requests
  const isFetchingRef = useRef(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  /**
   * Fetch initial data
   */
  useEffect(() => {
    const fetchInitialData = async () => {
      if (isFetchingRef.current) return;
      
      isFetchingRef.current = true;
      setLoading(true);
      setError(null);

      try {
        const result = await fetchFunction(initialPage);
        setItems(result.data);
        setHasMore(result.hasMore);
        setPage(initialPage + 1);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch data');
        console.error('Error fetching initial data:', err);
      } finally {
        setLoading(false);
        isFetchingRef.current = false;
      }
    };

    fetchInitialData();
  }, [fetchFunction, initialPage]);

  /**
   * Load more items
   */
  const loadMore = useCallback(async () => {
    if (!hasMore || isFetchingRef.current || loadingMore) return;

    isFetchingRef.current = true;
    setLoadingMore(true);
    setError(null);

    try {
      const result = await fetchFunction(page);
      
      setItems((prev) => [...prev, ...result.data]);
      setHasMore(result.hasMore);
      setPage((prev) => prev + 1);
    } catch (err: any) {
      setError(err.message || 'Failed to load more data');
      console.error('Error loading more data:', err);
    } finally {
      setLoadingMore(false);
      isFetchingRef.current = false;
    }
  }, [page, hasMore, loadingMore, fetchFunction]);

  /**
   * Reset to initial state
   */
  const reset = useCallback(() => {
    setItems([]);
    setPage(initialPage);
    setLoading(true);
    setLoadingMore(false);
    setHasMore(true);
    setError(null);
    isFetchingRef.current = false;
  }, [initialPage]);

  /**
   * Intersection Observer callback for bottom sentinel
   */
  const observerCallback = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading || loadingMore) return;

      // Disconnect previous observer
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      // Create new observer
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore && !isFetchingRef.current) {
            loadMore();
          }
        },
        {
          rootMargin: `${threshold}px`,
        }
      );

      // Observe the sentinel node
      if (node) {
        observerRef.current.observe(node);
      }
    },
    [loading, loadingMore, hasMore, threshold, loadMore]
  );

  // Cleanup observer on unmount
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return {
    items,
    loading,
    loadingMore,
    hasMore,
    error,
    loadMore,
    reset,
    observerRef: observerCallback,
  };
}
