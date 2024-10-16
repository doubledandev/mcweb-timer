import Timer from "../islands/Timer.tsx";

export default function Home() {
  const to = new Date();
  to.setUTCDate(19);
  to.setUTCHours(18, 0, 0, 0);

  return (
    // <div class="px-4 py-8 mx-auto bg-gradient-to-b from-[#60ab2c] from-20% to-[#9c643f] to-40% h-screen">
    <div class="mx-auto h-screen bg-[url('/bg.jpg')] bg-cover">
      <div class="backdrop-blur-3xl h-full w-full p-8">
        <div class="max-w-screen-md mx-auto h-full flex flex-col items-center justify-center bg-none">
          <Timer
            from={new Date().getTime()}
            to={to.getTime()}
            class="text-[3rem]"
          >
          </Timer>
        </div>
      </div>
    </div>
  );
}
