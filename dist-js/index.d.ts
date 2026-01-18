import { Flush } from "./orms";
/**
 * Configuration options for the AnalyticsTracker
 */
export interface Config {
    /** Number of events to batch before automatically flushing. Default: 10 */
    batchSize?: number;
    /** Time interval in milliseconds between automatic flushes. Default: 5000 (5 seconds) */
    flushInterval?: number;
}
/**
 * Base properties interface for tracked events
 */
export interface Properties {
    /** Match identifier for the event */
    match: string;
}
/**
 * Represents a single analytics event with metadata
 */
export interface TrackerEvent {
    /** Name of the event being tracked */
    event: string;
    /** Custom properties associated with the event */
    properties: any;
    /** Unix timestamp (in milliseconds) when the event occurred */
    timestamp: number;
    /** URL where the event was triggered */
    url: string;
    /** User agent string of the browser */
    userAgent: string;
}
/**
 * Analytics tracking class that batches and sends events to a backend endpoint.
 * Implements automatic flushing based on batch size and time intervals.
 *
 * @example
 * ```typescript
 * // Initialize the tracker
 * const tracker = new AnalyticsTracker({
 *   endpoint: 'https://api.example.com/analytics',
 *   batchSize: 20,
 *   flushInterval: 10000
 * });
 *
 * // Track an event
 * AnalyticsTracker.track('button_click', {
 *   match: 'signup',
 *   buttonId: 'cta-button'
 * });
 * ```
 */
export declare class AnalyticsTracker {
    static version: string;
    orm: Flush;
    /** Queue storing events waiting to be sent */
    queue: any[];
    /** Maximum number of events to batch before auto-flushing */
    private batchSize;
    /** Time interval (ms) between automatic flush operations */
    private flushInterval;
    /**
     * Initializes the analytics tracker with the provided configuration.
     * Sets up automatic flushing on intervals and before page unload.
     *
     * @param config - Configuration object for the tracker
     */
    constructor(config: Config, orm: Flush);
    /**
     * Tracks an analytics event by adding it to the queue.
     * Automatically flushes if the batch size is reached.
     *
     * @param eventName - Name of the event to track
     * @param properties - Custom properties for the event (must include 'match' field)
     *
     * @example
     * ```typescript
     * AnalyticsTracker.track('page_view', {
     *   match: 'homepage',
     *   referrer: document.referrer
     * });
     * ```
     */
    track(eventName: string, properties: Properties & any): void;
    /**
     * Sends all queued events to the backend endpoint.
     * Clears the queue after sending. On failure, events are re-added to the queue.
     * Does nothing if the queue is empty or endpoint is not configured.
     *
     * @remarks
     * This method is called automatically on:
     * - Regular intervals (based on flushInterval)
     * - When batch size is reached
     * - Before page unload
     *
     * Can also be called manually to force immediate sending.
     */
    flush(): void;
}
