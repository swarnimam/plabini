import { invitation } from "../data/invitation";
import { calendar } from "../lib/calendar";
export function GET() {
  return new Response(calendar(invitation.events), {
    headers: { "Content-Type": "text/calendar; charset=utf-8" },
  });
}
