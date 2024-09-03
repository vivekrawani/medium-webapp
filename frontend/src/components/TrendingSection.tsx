import { Skeleton } from "@/components/ui/skeleton"

export default function Trending() {
    return <div className="w-full mt-5 flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-full rounded-xl" />

        <Skeleton className="h-4 w-full " />
        <Skeleton className="h-4 w-full " />
        <Skeleton className="h-4 w-full " />
        <Skeleton className="h-4 w-full " />
        <Skeleton className="h-4 w-full " />

    </div>
}