import { SupabaseClient, SupabaseClientOptions } from "@supabase/supabase-js"

export abstract class Flush {
  abstract flush(data: any): Promise<void>
}

export type superBaseFunction<T> = (client: SupabaseClient, data: T) => Promise<void>

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
