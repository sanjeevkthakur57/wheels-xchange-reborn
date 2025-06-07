import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, UserPlus, Mail, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const signupSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupSchema>;

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async () => {
    setIsLoading(true);
    setShowDialog(true);
    setTimeout(() => {
      setShowDialog(false);
      setIsLoading(false);
      localStorage.setItem('fakeLoggedIn', 'true');
      if (window.fakeLogin) window.fakeLogin();
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      {/* Signup Success Dialog */}
      {showDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg px-8 py-6 text-center">
            <h3 className="text-xl font-semibold mb-2">Signed in</h3>
            <p className="text-gray-600">Your account has been created and you are signed in!</p>
          </div>
        </div>
      )}
      
      <div className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-md">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900">Create an account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Join WheelsXchange to find your perfect car
            </p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="name">Full name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <FormControl>
                          <Input
                            id="name"
                            placeholder="John Doe"
                            className="pl-10"
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="email">Email address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <FormControl>
                          <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            className="pl-10"
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <FormControl>
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a password"
                            {...field}
                          />
                        </FormControl>
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-400" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-400" />
                          )}
                        </button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <div className="relative">
                        <FormControl>
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            {...field}
                          />
                        </FormControl>
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-400" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-400" />
                          )}
                        </button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="mr-2">Please wait...</span>
                ) : (
                  <UserPlus className="mr-2 h-5 w-5" />
                )}
                {isLoading ? 'Creating account...' : 'Create account'}
              </Button>

              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </Form>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Signup;
