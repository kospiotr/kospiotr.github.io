interface Env {
    KV: KVNamespace;
}

export const onRequest: PagesFunction<Env> = async (context) => {
    const value = await context.env;
    const params = context.params;
    const data = context.data;
    const headers = context.request.headers;
    const text = await context.request.text();
    return new Response(JSON.stringify({value, params, data, headers, text}));
};