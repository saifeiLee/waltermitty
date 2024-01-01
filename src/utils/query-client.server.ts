import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

// TODO: 这个cache是否有必要
export const getQueryClient = cache(() => queryClient);
