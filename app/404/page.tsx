export default function NotFound() {
  return (
    <div className="h-4/5 flex flex-col items-center justify-center text-center">
      <div>
        <h1 className="border-r border-r-black/[.3] dark:border-r-white/[.3] inline-block mr-5 pr-6 text-2xl/[49px] font-medium align-top">
          404
        </h1>
        <div className="inline-block">
          <h2 className="text-sm/[49px] m-0 font-normal">
            This page could not be found.
          </h2>
        </div>
      </div>
    </div>
  );
}
