"use client";

import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { useState } from "react";
import { del, get, set } from "idb-keyval";

import type {
  PersistedClient,
  Persister,
} from "@tanstack/react-query-persist-client";
import type { PropsWithChildren } from "react";

const idbValidKey = "ReactQuery";

const persister = {
  async persistClient(client: PersistedClient) {
    await set(idbValidKey, client);
  },
  async restoreClient() {
    return (await get(idbValidKey)) as PersistedClient;
  },
  async removeClient() {
    await del(idbValidKey);
  },
} as Persister;

export const ReactQueryProvider = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            cacheTime: 1000 * 60 * 5, // 5 minutes
            refetchInterval: 1000 * 60 * 5, // 5 minutes
            refetchOnWindowFocus: false,
            refetchIntervalInBackground: false,
          },
        },
      })
  );

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister,
        dehydrateOptions: {
          shouldDehydrateQuery: (query) => {
            const queryIsReadyForPersistance = query.state.status === "success";
            if (queryIsReadyForPersistance)
              return !(
                (query.state?.data as any)?.pages?.length > 1
              ); // TODO: What the fuck???没看懂
            else {
              return false;
            }
          },
        },
      }}
    >
      {children}
    </PersistQueryClientProvider>
  );
};
