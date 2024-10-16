import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";
import Timer from "../islands/Timer.tsx";

export default function Home() {
  const count = useSignal(3);

  const to = new Date();
  to.setUTCDate(19);
  to.setUTCHours(18, 0, 0, 0);

  return (
    <div class="px-4 py-8 mx-auto bg-gradient-to-b from-[#60ab2c] from-20% to-[#9c643f] to-40% h-screen">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center bg-none">
        <img
          class="my-6"
          src="/logo.svg"
          width="128"
          height="128"
          alt="the Fresh logo: a sliced lemon dripping with juice"
        />
        <h1 class="text-4xl font-bold">Welcome to Fresh</h1>
        <p class="my-4">
          Try updating this message in the
          <code class="mx-2">./routes/index.tsx</code> file, and refresh.
        </p>
        <Counter count={count} />
        <Timer from={new Date().getTime()} to={to.getTime()}></Timer>
      </div>
    </div>
  );
}
