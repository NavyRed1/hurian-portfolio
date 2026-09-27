import { signIn } from "@/lib/actions/auth";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-6">
      <h1 className="mb-6 font-display text-2xl font-bold text-ink">Admin sign in</h1>
      {error && <p className="mb-4 text-sm text-sunset-1">{error}</p>}
      <form action={signIn} className="flex flex-col gap-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="rounded-btn border border-line bg-panel px-4 py-3 text-sm text-ink outline-none focus:border-sunset-3"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="rounded-btn border border-line bg-panel px-4 py-3 text-sm text-ink outline-none focus:border-sunset-3"
        />
        <button type="submit" className="btn btn-fill justify-center">
          Sign in
        </button>
      </form>
    </main>
  );
}
