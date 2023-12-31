import { apiClient } from "~/utils/request";
import { defineQuery } from "./helper";

export const aggregation = {
  root: () =>
    defineQuery({
      queryKey: ["aggregation"],
      queryFn: async () =>
        apiClient.aggregate.getAggregateData().then((res) => res.$serialized),
      cacheTime: 1000 * 60 * 10,
    }),
};
