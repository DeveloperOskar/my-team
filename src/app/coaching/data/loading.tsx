import { Skeleton } from "@/app/_components/ui/skeleton";
import React from "react";

const loading = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="mb-4 flex shrink items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="h-[35px] w-[250px] rounded" />

          <Skeleton className="h-[35px] w-[200px] rounded" />
        </div>

        <Skeleton className="h-[35px] w-[90px] rounded" />
      </div>

      <Skeleton className="w-full grow overflow-auto  shadow-none" />
    </div>
  );
};

export default loading;
