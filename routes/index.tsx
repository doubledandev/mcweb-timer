import Timer from "../islands/Timer.tsx";

export default function Home() {
  const to = new Date(Deno.env.get("START_DATETIME") as string);

  return (
    <div class="mx-auto h-screen bg-[url('/bg.jpg')] bg-cover">
      <div class="backdrop-blur-3xl h-full w-full p-8 flex items-center justify-center">
        <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center bg-none relative">
          <div class="absolute top-[-18rem] left-[-5rem] right-[-5rem]">
            <img src="/sga_mc_cropped.png" class="mx-auto drop-shadow-[0_3px_3px_black]"></img>
          </div>
          <img
            src="/sga_mc_background.png"
            class="absolute top-[100%] translate-y-[-50%] -z-10 min-w-[35rem] drop-shadow-[0_3px_3px_black]"
          >
          </img>

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
