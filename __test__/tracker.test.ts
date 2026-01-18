import { it, describe, expect } from "vitest";
import { FetchFlush } from "../src/orms.ts";
import { AnalyticsTracker } from "../src/index.ts";

describe('AnalyticsTracker', () => {
  const orm = new FetchFlush('https://api.example.com/analytics');

  it("load single event", () => {
    const tracker = new AnalyticsTracker({
      batchSize: 10,
      flushInterval: 5000
    }, orm);

    tracker.track("page_load", {
      "page": "home",
      "timestamp": Date.now()
    });

    let t = tracker.queue[0];

    expect(t.event).toBe("page_load");
    expect(t.properties).hasOwnProperty("timestamp");
    expect(t.properties.page).toEqual("home");
  })

  it("load batchSize - 1 events", async () => {
    const tracker = new AnalyticsTracker({
      batchSize: 10,
      flushInterval: 5000
    }, orm);

    for (let i = 0; i < 9; i++) {
      tracker.track("page_load", {
        "page": "home",
        "timestamp": Date.now()
      });
    }
    expect(tracker.queue.length).toBe(9);
  })

  it("load batchSize event and check for flush", async () => {
    const tracker = new AnalyticsTracker({
      batchSize: 10,
      flushInterval: 5000
    }, orm);

    for (let i = 0; i < 10; i++) {
      tracker.track("page_load", {
        "page": "home",
        "timestamp": Date.now()
      });
    }
    expect(tracker.queue.length).toBe(0);
  })
});
