import { SupabaseClient, SupabaseClientOptions } from "@supabase/supabase-js";
export declare abstract class Flush {
    abstract flush(data: any): Promise<void>;
}
export declare class FetchFlush extends Flush {
    endpoint: string;
    constructor(endpoint: string);
    flush(data: any): Promise<void>;
}
export type superBaseFunction<T> = (client: SupabaseClient, data: T) => Promise<void>;
export declare class SupabaseFlush<T> extends Flush {
    private client;
    superBaseFunction: superBaseFunction<T>;
    constructor(url: string, key: string, supabaseFunction: superBaseFunction<T>, options: SupabaseClientOptions<any>);
    flush(data: any): Promise<void>;
}
