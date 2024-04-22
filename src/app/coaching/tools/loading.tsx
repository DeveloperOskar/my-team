import { Skeleton } from "@/app/_components/ui/skeleton";
import React from "react";

const loading = () => {
  return (
    <div className="flex h-full w-full justify-between">
      <Skeleton className="h-full basis-[330px] " />

      <div className="flex h-full basis-[700px] flex-col gap-2">
        <Skeleton className="h-full  shrink basis-[40px]" />
        <Skeleton className="h-full  grow " />
      </div>
      <Skeleton className="h-full basis-[275px] " />
    </div>
  );
};

export default loading;
