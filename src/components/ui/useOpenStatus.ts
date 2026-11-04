import { useEffect, useState } from 'react';

/** The café is open every day 07:00 – 01:00, Tunis time. */
function isOpenNow() {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Africa/Tunis',
    hour: '2-digit',
    hour12: false,
  }).formatToParts(new Date());
  const hour = Number(parts.find((p) => p.type === 'hour')?.value ?? 12) % 24;
  return hour >= 7 || hour < 1;
}

export function useOpenStatus() {
  const [open, setOpen] = useState(isOpenNow);
  useEffect(() => {
    const id = window.setInterval(() => setOpen(isOpenNow()), 60_000);
    return () => clearInterval(id);
  }, []);
  return open;
}
