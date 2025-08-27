import * as React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { setCredentials } from "@/redux/features/auth/auth.slice";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import type { User } from "@/redux/features/auth/auth.types";

const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters").max(72),
  confirmPassword: z.string().min(6),
  role: z.enum(["Rider", "Driver"]),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type RegisterValues = z.infer<typeof registerSchema>;

export function RegisterForm({ className, ...props }: React.ComponentProps<"div">) {
  const [serverError, setServerError] = React.useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterMutation();

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "", role: "Rider" },
  });

  async function onSubmit(values: RegisterValues) {
    setServerError(null);
    try {
      const { confirmPassword, role, ...payload } = values;

      // Backend-compatible lowercase role
      const res = await registerUser({
        ...payload,
        role: role.toLowerCase(), // "rider" | "driver"
      }).unwrap();

      const user: User = {
        id: res.user.id,
        name: res.user.name,
        email: res.user.email,
        role: res.user.role as User["role"], // ensure type
        status: res.user.status as User["status"], // ensure type
      };

      dispatch(setCredentials({ user, token: res.token }));

      if (user.role === "driver") navigate("/driver/dashboard");
      else navigate("/rider/dashboard");
    } catch (err: any) {
      setServerError(err?.data?.message ?? "Registration failed. Please try again.");
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create an account</CardTitle>
          <CardDescription>Sign up with email, password & role</CardDescription>
        </CardHeader>
        <CardContent>
          {serverError && <div className="text-sm text-destructive mb-2">{serverError}</div>}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl><Input placeholder="Your name" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl><Input type="email" placeholder="m@example.com" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="password" render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl><Input type="password" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="confirmPassword" render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl><Input type="password" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="role" render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <select {...field} className="w-full border rounded p-2">
                      <option value="Rider">Rider</option>
                      <option value="Driver">Driver</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing up..." : "Sign up"}
              </Button>

              <div className="text-center text-sm">
                Already have an account? <Link to="/login" className="underline underline-offset-4">Login</Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
