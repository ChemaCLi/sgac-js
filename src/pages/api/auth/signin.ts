import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ params }) => {
  const { username, password, rememberMe } = await params;

  // wait 5 seconds before continue
  await new Promise((resolve) => setTimeout(resolve, 5000));

  // Aquí debes hacer la validación del usuario y contraseña
  if (username === 'admin' && password === 'password') {
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ success: false, message: 'Credenciales incorrectas' }), {
    status: 401,
    headers: { 'Content-Type': 'application/json' },
  });
}
