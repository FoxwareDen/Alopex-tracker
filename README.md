# Analytics Tracker

A lightweight, browser-based analytics library that batches and sends events to your backend. Perfect for tracking user interactions without overwhelming your server with individual requests.

## Features

- 📦 **Automatic Batching** - Groups events together to reduce network requests
- ⏱️ **Time-based Flushing** - Sends events at regular intervals
- 🔄 **Smart Queue Management** - Automatically flushes when batch size is reached
- 💾 **Retry on Failure** - Re-queues events if sending fails
- 🚪 **Page Unload Handling** - Ensures events are sent before user leaves
- 🎯 **TypeScript Support** - Full type definitions included

## Installation

```bash
npm install analytics-tracker
# or
yarn add analytics-tracker
```

## Quick Start

```typescript
import { AnalyticsTracker } from 'analytics-tracker';

// Initialize the tracker
const tracker = new AnalyticsTracker({
  endpoint: 'https://api.example.com/analytics',
  batchSize: 20,        // Optional: default is 10
  flushInterval: 10000  // Optional: default is 5000ms (5 seconds)
});

// Track events
AnalyticsTracker.track('button_click', {
  buttonId: 'cta-button',
  page: 'landing'
});

AnalyticsTracker.track('page_view', {
  referrer: document.referrer
});
```

## Configuration

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `endpoint` | `string` | *required* | Your backend URL for receiving analytics events |
| `batchSize` | `number` | `10` | Number of events to collect before auto-flushing |
| `flushInterval` | `number` | `5000` | Milliseconds between automatic flushes |

## API Reference

### `track(eventName, properties)`

Records an analytics event.

**Parameters:**
- `eventName` (string) - Name of the event
- `properties` (object) - Event properties with any custom fields you want to track

**Example:**
```typescript
AnalyticsTracker.track('video_play', {
  videoId: 'intro-v2',
  duration: 120,
  quality: 'HD'
});
```

### `flush()`

Manually sends all queued events immediately.

**Example:**
```typescript
AnalyticsTracker.flush();
```

## Event Structure

Each tracked event is automatically enriched with metadata:

```typescript
{
  event: "button_click",           // Your event name
  properties: {                    // Your custom properties
    buttonId: "cta-button",
    page: "landing"
  },
  timestamp: 1704067200000,        // Unix timestamp (ms)
  url: "https://example.com/page", // Current page URL
  userAgent: "Mozilla/5.0..."      // Browser user agent
}
```

## Backend Integration

Your backend endpoint will receive a POST request with this structure:

```json
{
  "events": [
    {
      "event": "button_click",
      "properties": { "buttonId": "cta", "page": "landing" },
      "timestamp": 1704067200000,
      "url": "https://example.com",
      "userAgent": "Mozilla/5.0..."
    }
  ]
}
```

## Roadmap

- 🔥 Firebase support
- 🗄️ Supabase integration
- 🛠️ Custom ORM support

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
