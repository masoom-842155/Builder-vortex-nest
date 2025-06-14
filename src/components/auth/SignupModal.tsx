import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Heart,
  Github,
  Chrome,
  Check,
  X,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
  trigger?: React.ReactNode;
}

const SignupModal = ({
  isOpen,
  onClose,
  onSwitchToLogin,
  trigger,
}: SignupModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [error, setError] = useState("");

  const { signup } = useAuth();
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(""); // Clear error when user types
  };

  // Password strength calculation
  const calculatePasswordStrength = (password: string) => {
    let score = 0;
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    Object.values(requirements).forEach((met) => {
      if (met) score += 20;
    });

    return { score, requirements };
  };

  const passwordStrength = calculatePasswordStrength(formData.password);

  const getPasswordStrengthColor = (score: number) => {
    if (score < 40) return "bg-red-500";
    if (score < 80) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getPasswordStrengthText = (score: number) => {
    if (score < 40) return "Weak";
    if (score < 80) return "Medium";
    return "Strong";
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (passwordStrength.score < 60) {
      setError("Please create a stronger password.");
      return;
    }

    if (!agreeToTerms) {
      setError("Please agree to the terms and conditions.");
      return;
    }

    setIsLoading(true);

    try {
      await signup(formData.name, formData.email, formData.password);

      // Reset form
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      onClose();

      setTimeout(() => {
        toast({
          title: "Welcome to RepeatHarmony!",
          description: "Your account has been created successfully.",
        });
      }, 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignup = (provider: string) => {
    setTimeout(() => {
      toast({
        title: `${provider} Signup`,
        description: `${provider} signup coming soon! Please use email/password for now.`,
      });
    }, 0);
  };

  const content = (
    <Card className="bg-slate-800 border-slate-700 w-full max-w-md">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Heart className="w-8 h-8 text-blue-400 mr-2" />
          <span className="text-2xl font-bold text-white">RepeatHarmony</span>
        </div>
        <CardTitle className="text-2xl text-white">Create Account</CardTitle>
        <CardDescription className="text-slate-400">
          Start your mental wellness journey today
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Error Message */}
        {error && (
          <div className="p-3 bg-red-900/50 border border-red-700 rounded-md">
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        {/* Social Signup Buttons */}
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
            onClick={() => handleSocialSignup("Google")}
            disabled={isLoading}
          >
            <Chrome className="w-4 h-4 mr-2" />
            Continue with Google
          </Button>
          <Button
            variant="outline"
            className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
            onClick={() => handleSocialSignup("GitHub")}
            disabled={isLoading}
          >
            <Github className="w-4 h-4 mr-2" />
            Continue with GitHub
          </Button>
        </div>

        <div className="relative">
          <Separator className="bg-slate-600" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-slate-800 px-2 text-slate-400 text-sm">or</span>
          </div>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSignup} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-300">
              Full Name
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="pl-10 bg-slate-900 border-slate-600 text-white placeholder-slate-400"
                disabled={isLoading}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-300">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="pl-10 bg-slate-900 border-slate-600 text-white placeholder-slate-400"
                disabled={isLoading}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-300">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="pl-10 pr-10 bg-slate-900 border-slate-600 text-white placeholder-slate-400"
                disabled={isLoading}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Password Strength Indicator */}
            {formData.password && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    Password strength:
                  </span>
                  <span
                    className={`text-xs font-medium ${
                      passwordStrength.score < 40
                        ? "text-red-400"
                        : passwordStrength.score < 80
                          ? "text-yellow-400"
                          : "text-green-400"
                    }`}
                  >
                    {getPasswordStrengthText(passwordStrength.score)}
                  </span>
                </div>
                <Progress
                  value={passwordStrength.score}
                  className="h-2"
                  indicatorClassName={getPasswordStrengthColor(
                    passwordStrength.score,
                  )}
                />
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {Object.entries(passwordStrength.requirements).map(
                    ([key, met]) => (
                      <div
                        key={key}
                        className={`flex items-center space-x-1 ${
                          met ? "text-green-400" : "text-slate-400"
                        }`}
                      >
                        {met ? (
                          <Check className="w-3 h-3" />
                        ) : (
                          <X className="w-3 h-3" />
                        )}
                        <span className="capitalize">
                          {key === "length"
                            ? "8+ chars"
                            : key === "special"
                              ? "Symbol"
                              : key}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-slate-300">
              Confirm Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleInputChange("confirmPassword", e.target.value)
                }
                className="pl-10 pr-10 bg-slate-900 border-slate-600 text-white placeholder-slate-400"
                disabled={isLoading}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                disabled={isLoading}
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {formData.confirmPassword &&
              formData.password !== formData.confirmPassword && (
                <p className="text-red-400 text-xs">Passwords do not match</p>
              )}
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="terms"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              className="rounded border-slate-600 bg-slate-900"
              disabled={isLoading}
            />
            <Label htmlFor="terms" className="text-sm text-slate-400">
              I agree to the{" "}
              <span className="text-blue-400 hover:text-blue-300 cursor-pointer">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-blue-400 hover:text-blue-300 cursor-pointer">
                Privacy Policy
              </span>
            </Label>
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            disabled={isLoading || passwordStrength.score < 60 || !agreeToTerms}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Creating account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>
        </form>

        <div className="text-center">
          <span className="text-slate-400">Already have an account? </span>
          <Button
            variant="link"
            className="text-blue-400 hover:text-blue-300 p-0 h-auto"
            onClick={onSwitchToLogin}
            disabled={isLoading}
          >
            Sign in
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  if (trigger) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="bg-transparent border-none shadow-none p-0 max-w-md">
          {content}
        </DialogContent>
      </Dialog>
    );
  }

  return isOpen ? (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-md">{content}</div>
    </div>
  ) : null;
};

export default SignupModal;
