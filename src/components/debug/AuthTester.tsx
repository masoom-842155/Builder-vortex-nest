import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const AuthTester = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { signup, login, logout, user, isAuthenticated } = useAuth();
  const { toast } = useToast();

  const handleTestSignup = async () => {
    if (!email || !password || !name) {
      toast({
        title: "Missing Info",
        description: "Please fill all fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await signup(name, email, password);
      toast({
        title: "Signup Test",
        description: result.needsVerification
          ? "Check email for verification"
          : "Signup successful!",
      });
    } catch (error) {
      toast({
        title: "Signup Failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestLogin = async () => {
    if (!email || !password) {
      toast({
        title: "Missing Info",
        description: "Please enter email and password",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      toast({
        title: "Login Test",
        description: "Login successful!",
      });
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logout Test",
        description: "Logged out successfully",
      });
    } catch (error) {
      toast({
        title: "Logout Failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <Card className="bg-slate-800 border-slate-700 w-80">
        <CardHeader>
          <CardTitle className="text-white text-sm">🧪 Auth Tester</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {isAuthenticated ? (
            <div className="space-y-3">
              <div className="p-3 bg-green-900/30 border border-green-700 rounded">
                <p className="text-green-300 text-sm">
                  ✅ Logged in as: {user?.name}
                </p>
                <p className="text-green-200 text-xs">Email: {user?.email}</p>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="w-full border-slate-600"
              >
                Test Logout
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <Label className="text-slate-300 text-xs">Name</Label>
                <Input
                  type="text"
                  placeholder="Test User"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-slate-900 border-slate-600 text-white text-xs h-8"
                />
              </div>

              <div>
                <Label className="text-slate-300 text-xs">Email</Label>
                <Input
                  type="email"
                  placeholder="test@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-900 border-slate-600 text-white text-xs h-8"
                />
              </div>

              <div>
                <Label className="text-slate-300 text-xs">Password</Label>
                <Input
                  type="password"
                  placeholder="password123"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-slate-900 border-slate-600 text-white text-xs h-8"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleTestSignup}
                  disabled={isLoading}
                  size="sm"
                  className="flex-1 text-xs"
                >
                  {isLoading ? "..." : "Test Signup"}
                </Button>
                <Button
                  onClick={handleTestLogin}
                  disabled={isLoading}
                  size="sm"
                  className="flex-1 text-xs"
                  variant="outline"
                >
                  {isLoading ? "..." : "Test Login"}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthTester;
