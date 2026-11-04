import { useLang } from '../../i18n/useLang';
import { useOpenStatus } from './useOpenStatus';
import './OpenBadge.css';

/** Live "Open now / Closed" pill, computed from the café's hours in Tunis time. */
export function OpenBadge({ className = '' }: { className?: string }) {
  const { t } = useLang();
  const open = useOpenStatus();
  return (
    <p className={`open-badge ${open ? 'is-open' : 'is-closed'} ${className}`}>
      <span className="open-badge__dot" aria-hidden="true" />
      <strong>{open ? t.status.open : t.status.closed}</strong>
      <span>· {open ? t.status.until : t.status.opensAt}</span>
    </p>
  );
}
