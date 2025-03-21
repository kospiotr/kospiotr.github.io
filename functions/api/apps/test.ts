interface Env {
    KV: KVNamespace;
}

export const onRequest: PagesFunction<Env> = async (context) => {
    const value = await context.env;
    const params = context.params;
    return new Response(JSON.stringify({value, params}));
};