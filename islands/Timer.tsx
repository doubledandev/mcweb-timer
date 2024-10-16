import { useComputed, useSignal } from "@preact/signals";
import { useEffect, useRef } from "preact/hooks";
import { difference } from "$std/datetime/mod.ts";

interface Props {
  from: number; // Date.getTime()
  to: number; // Date.getTime()

  class?: string;
}

function NumbersColumn(props: { value: number | string }) {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const elNumbers = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elNumbers.current || !container.current) return;
    const el = elNumbers.current.querySelector(`.num_${props.value}`);
    if (!el) return;
    container.current?.scrollTo({
      top: el.getBoundingClientRect().top - elNumbers.current.getBoundingClientRect().top,
      behavior: "smooth",
    });
  }, [props.value]);

  return (
    <div class="relative h-fit overflow-hidden" ref={container}>
      <p class="invisible">{props.value}</p>
      <div class="absolute top-0" ref={elNumbers}>
        {numbers.map((number) => <p class={`num_${number}`}>{number}</p>)}
      </div>
    </div>
  );
}

function TimeCell(props: { value: string }) {
  const value = props.value.padStart(2, "0");

  return (
    <div class="flex tracking-wide">
      {/* <p>{value[0]}</p> */}
      {/* <p>{value[1]}</p> */}
      <NumbersColumn value={value[0]}></NumbersColumn>
      <NumbersColumn value={value[1]}></NumbersColumn>
    </div>
  );
}

export default function Timer(props: Props) {
  const from = useSignal(props.from);
  const to = useSignal(props.to);

  useEffect(() => {
    const intervalId = setInterval(() => {
      from.value = new Date().getTime();
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const offsetInHours = new Date().getTimezoneOffset() / 60;
  const delta = useComputed(() => {
    const dif = difference(
      new Date(from.value),
      new Date(to.value),
    );

    return {
      days: dif.days ?? 0,
      hours: ((dif.hours ?? 0) + offsetInHours) % 24,
      minutes: (dif.minutes ?? 0) % 60,
      seconds: (dif.seconds ?? 0) % 60,
    };
  });

  return (
    <div
      class={"flex items-center justify-center gap-x-2 py-6 select-none " +
        (props.class ?? "")}
    >
      {
        /* <NumbersColumn
        value={delta.value.seconds.toString().padStart(2, "0")[1]}
      /> */
      }

      <TimeCell value={delta.value.days.toString()} />
      <p>:</p>
      <TimeCell value={delta.value.hours.toString()} />
      <p>:</p>
      <TimeCell value={delta.value.minutes.toString()} />
      <p>:</p>
      <TimeCell value={delta.value.seconds.toString()} />
    </div>
  );
}
