import UserSkeleton from "../Global/UserSkeleton";

export default function Popular() {
  return (
    <div className="h-fit hidden lg:flex flex-col px-6 py-4 gap-5 bg-white rounded-xl">
      <h2>Popular pets</h2>
      <UserSkeleton />
      <UserSkeleton />
      <UserSkeleton />
    </div>
  );
}
