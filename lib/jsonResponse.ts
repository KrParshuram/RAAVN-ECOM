export const ok = (data: unknown, init: ResponseInit = {}) =>
  new Response(JSON.stringify({ ok: true, data }), { status: 200, ...init });

export const fail = (msg: string, status = 400) =>
  new Response(JSON.stringify({ ok: false, error: msg }), { status });
