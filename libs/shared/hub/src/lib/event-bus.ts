export type EventHandler<T = any> = (payload: T) => void;

/**
 * EventBus implements a simple PubSub mechanism.
 * It is a singleton so the same instance can be shared
 * across the entire application.
 */
export class EventBus {
    private static _instance: EventBus;
    private subscribers = new Map<string, Set<EventHandler>>();

    private constructor() {}

    /**
     * Returns the single instance of EventBus.
     */
    public static get instance(): EventBus {
        if (!this._instance) {
            this._instance = new EventBus();
        }
        return this._instance;
    }

    /**
     * Subscribe to an event by name.
     */
    public subscribe<T>(event: string, handler: EventHandler<T>): void {
        if (!this.subscribers.has(event)) {
            this.subscribers.set(event, new Set());
        }
        this.subscribers.get(event)!.add(handler as EventHandler);
    }

    /**
     * Unsubscribe from an event.
     */
    public unsubscribe<T>(event: string, handler: EventHandler<T>): void {
        const handlers = this.subscribers.get(event);
        if (handlers) {
            handlers.delete(handler as EventHandler);
            if (handlers.size === 0) {
                this.subscribers.delete(event);
            }
        }
    }

    /**
     * Publish an event to all subscribers.
     */
    public publish<T>(event: string, payload: T): void {
        const handlers = this.subscribers.get(event);
        if (handlers) {
            handlers.forEach((h) => h(payload));
        }
    }

    /**
     * Clear all subscriptions. Useful for tests.
     */
    public clear(): void {
        this.subscribers.clear();
    }
}

export const eventBus = EventBus.instance;
