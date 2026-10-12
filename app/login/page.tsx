import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { login } from "./actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; error?: string }>;
}) {
  const params = await searchParams;
  const from = params.from ?? "/";
  const hasError = params.error === "1";

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <picture>
            <source
              srcSet="/brand/logo-main-light.svg"
              media="(prefers-color-scheme: light)"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/logo-main-dark.svg"
              alt="Yukti"
              width={72}
              height={72}
              className="h-[72px] w-[72px]"
            />
          </picture>
          <p className="text-sm text-muted-foreground">
            Warranty &amp; Service Intelligence
          </p>
        </div>

        <Card>
          <CardHeader>
            <h1 className="text-xl font-semibold text-foreground">Sign in</h1>
            <p className="text-sm text-muted-foreground">
              Enter any email and password to continue.
            </p>
          </CardHeader>
          <CardContent>
            <form action={login} className="space-y-4">
              <input type="hidden" name="from" value={from} />

              {hasError && (
                <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  Enter an email and password to sign in.
                </p>
              )}

              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" placeholder="••••••••" autoComplete="current-password" />
              </div>

              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Demo access — any credentials will work.
        </p>
      </div>
    </div>
  );
}
