"use client";
import { useAggregation } from "~/queries/hooks/useAggregation";
export default function () {
  const { data } = useAggregation();
  return (
    <main className="w-30 text-red-light-30 h-20 bg-white text-uk-red-light">
      {data!.user.avatar}
    </main>
  );
}
