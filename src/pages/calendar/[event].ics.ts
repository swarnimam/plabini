import { invitation } from '../../data/invitation';
import { calendar } from '../../lib/calendar';
export function getStaticPaths() {
  return invitation.events.map(event => ({ params: { event: event.id }, props: { event } }));
}
export function GET({ props }: { props: { event: (typeof invitation.events)[number] } }) {
  return new Response(calendar([props.event]), { headers: { 'Content-Type': 'text/calendar; charset=utf-8' } });
}
