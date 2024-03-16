
import { EVENTS } from './const';

export function navigate(href: string): void {
    window.history.pushState({}, '', href);
    const navigationEvent = new Event(EVENTS.PUSHSTATE);
    window.dispatchEvent(navigationEvent)
}
