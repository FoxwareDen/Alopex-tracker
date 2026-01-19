import { SupabaseClient } from '@supabase/supabase-js';

class Flush {
}
class FetchFlush extends Flush {
    constructor(endpoint) {
        super();
        this.endpoint = endpoint;
    }
    async flush(data) {
        await fetch(this.endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ events: data })
        });
    }
}
class SupabaseFlush extends Flush {
    constructor(url, key, supabaseFunction, options) {
        super();
        this.client = new SupabaseClient(url, key, options);
        this.superBaseFunction = supabaseFunction;
    }
    async flush(data) {
        await this.superBaseFunction(this.client, data);
    }
}

export { FetchFlush, Flush, SupabaseFlush };
