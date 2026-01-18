# Analytics Tracker

A lightweight, browser-based analytics library that batches and sends events to your backend. Perfect for tracking user interactions without overwhelming your server with individual requests.

## Features

- 📦 **Automatic Batching** - Groups events together to reduce network requests
- ⏱️ **Time-based Flushing** - Sends events at regular intervals
- 🔄 **Smart Queue Management** - Automatically flushes when batch size is reached
- 🚪 **Page Unload Handling** - Ensures events are sent before user leaves
- 🎯 **TypeScript Support** - Full type definitions included
- 🔌 **ORM Integration** - Compatible with any ORM implementing the `Flush` interface

## Installation

```bash
npm install analytics-tracker
# or
yarn add analytics-tracker
```

## Quick Start

```typescript
import { AnalyticsTracker } from 'analytics-tracker';
import { YourORM } from './your-orm-implementation'; // Your ORM that implements Flush interface

// Initialize the tracker with your ORM
const orm = new YourORM('https://api.example.com/analytics');
const tracker = new AnalyticsTracker({
  batchSize: 20,        // Optional: default is 10
  flushInterval: 10000  // Optional: default is 5000ms (5 seconds)
}, orm);

// Track events
tracker.track('button_click', {
  match: 'signup',      // Required: match identifier
  buttonId: 'cta-button'
});

tracker.track('page_view', {
  match: 'homepage',
  referrer: document.referrer
});
```

## Configuration

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `batchSize` | `number` | `10` | Number of events to collect before auto-flushing |
| `flushInterval` | `number` | `5000` | Milliseconds between automatic flushes |

## Required ORM Implementation

The AnalyticsTracker requires an ORM that implements the `Flush` interface:

```typescript
interface Flush {
  flush(events: TrackerEvent[]): Promise<void> | void;
}
```

Your ORM should handle the actual HTTP communication with your backend endpoint.

## API Reference

### `AnalyticsTracker(config, orm)`

Creates a new analytics tracker instance.

**Parameters:**
- `config` (Config) - Configuration object
- `orm` (Flush) - ORM instance that handles sending events

### `track(eventName, properties)`

Records an analytics event.

**Parameters:**
- `eventName` (string) - Name of the event
- `properties` (Properties & any) - Event properties (must include `match` field plus any custom fields)

**Example:**
```typescript
tracker.track('video_play', {
  match: 'tutorial-video',
  videoId: 'intro-v2',
  duration: 120,
  quality: 'HD'
});
```

### `flush()`

Manually sends all queued events immediately.

**Example:**
```typescript
tracker.flush();
```

## Event Structure

Each tracked event is automatically enriched with metadata:

```typescript
{
  event: "button_click",           // Your event name
  properties: {                    // Your custom properties (must include "match")
    match: "signup",
    buttonId: "cta-button"
  },
  timestamp: 1704067200000,        // Unix timestamp (ms)
  url: "https://example.com/page", // Current page URL
  userAgent: "Mozilla/5.0..."      // Browser user agent
}
```

## Browser Compatibility

The library automatically handles browser environments. In non-browser environments (like SSR), it will gracefully handle missing `window` and `navigator` objects with warnings.

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
```
