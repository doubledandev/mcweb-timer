import { useComputed, useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { difference } from "$std/datetime/mod.ts";

interface Props {
  from: number; // Date.getTime()
  to: number; // Date.getTime()
}

function TimeCell(props: { value: string }) {
  const value = props.value.padStart(2, "0");

  return (
    <div class="tracking-wide">
      <p>{value}</p>
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
    <div class="flex items-center justify-center gap-x-2 py-6 select-none">
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
