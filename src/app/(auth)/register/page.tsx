import { AuthLayout } from '@/components/auth/AuthLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <AuthLayout>
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight">
            Register as an Agent
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Your account will be reviewed by an administrator.
          </p>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <Label htmlFor="full-name">Full Name</Label>
              <Input id="full-name" name="name" type="text" autoComplete="name" required />
            </div>
            <div>
              <Label htmlFor="email-address">Email address</Label>
              <Input id="email-address" name="email" type="email" autoComplete="email" required />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" autoComplete="new-password" required />
            </div>
            <div>
              <Label htmlFor="district">District</Label>
              <Input id="district" name="district" type="text" required />
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full">
              Register
            </Button>
          </div>
        </form>
        <div className="text-center">
          <Link href="/login" className="text-sm text-primary hover:text-primary-dark">
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}