import { SupabaseClient, SupabaseClientOptions } from "@supabase/supabase-js"
import { TrackerEvent } from "../index";

export abstract class Flush {
  abstract flush(data: any): Promise<void>
}

export class FetchFlush extends Flush {
  public endpoint: string;

  constructor(endpoint: string) {
    super();
    this.endpoint = endpoint;
  }

  async flush(data: any): Promise<void> {
    await fetch(this.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ events: data })
    });
  }
}

export type superBaseFunction<T> = (client: SupabaseClient, data: TrackerEvent<T>[]) => Promise<void>

export class SupabaseFlush<T> extends Flush {
  private client: SupabaseClient;
  public superBaseFunction: superBaseFunction<T>

  constructor(url: string, key: string, supabaseFunction: superBaseFunction<T>, options: SupabaseClientOptions<any>) {
    super();
    this.client = new SupabaseClient(url, key, options);
    this.superBaseFunction = supabaseFunction;
  }

  async flush(data: any): Promise<void> {
    await this.superBaseFunction(this.client, data);
  }
}
