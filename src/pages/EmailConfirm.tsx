import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Heart, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import HeaderSection from "@/components/sections/HeaderSection";

const EmailConfirm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const confirmEmail = async () => {
      const token = searchParams.get("token");
      const type = searchParams.get("type");

      if (!token || type !== "signup") {
        setStatus("error");
        setMessage("Invalid confirmation link. Please try signing up again.");
        return;
      }

      try {
        const { data, error } = await supabase.auth.verifyOtp({
          token_hash: token,
          type: "signup",
        });

        if (error) {
          console.error("Email confirmation error:", error);
          setStatus("error");
          setMessage(
            error.message || "Failed to confirm email. Please try again.",
          );
          return;
        }

        if (data.user) {
          setStatus("success");
          setMessage("Your email has been confirmed successfully!");

          // Show success toast
          setTimeout(() => {
            toast({
              title: "Email Confirmed!",
              description: "Welcome to RepeatHarmony. You're now signed in.",
            });
          }, 0);

          // Redirect to dashboard after a short delay
          setTimeout(() => {
            navigate("/dashboard");
          }, 2000);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
        setStatus("error");
        setMessage("An unexpected error occurred. Please try again.");
      }
    };

    confirmEmail();
  }, [searchParams, navigate, toast]);

  return (
    <div className="min-h-screen bg-slate-950">
      <HeaderSection />

      <div className="pt-20 px-6 py-12">
        <div className="max-w-md mx-auto">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Heart className="w-8 h-8 text-blue-400 mr-2" />
                <span className="text-2xl font-bold text-white">
                  RepeatHarmony
                </span>
              </div>
              <CardTitle className="text-2xl text-white">
                Email Confirmation
              </CardTitle>
              <CardDescription className="text-slate-400">
                {status === "loading" && "Confirming your email address..."}
                {status === "success" && "Your account is now verified!"}
                {status === "error" && "There was an issue with confirmation"}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Status Icon */}
              <div className="flex justify-center">
                {status === "loading" && (
                  <Loader2 className="w-16 h-16 text-blue-400 animate-spin" />
                )}
                {status === "success" && (
                  <div className="relative">
                    <CheckCircle className="w-16 h-16 text-green-400" />
                    <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20"></div>
                  </div>
                )}
                {status === "error" && (
                  <XCircle className="w-16 h-16 text-red-400" />
                )}
              </div>

              {/* Status Message */}
              <div className="text-center space-y-4">
                <p className="text-white font-medium">{message}</p>

                {status === "success" && (
                  <div className="space-y-3">
                    <div className="bg-green-900/30 border border-green-700 rounded-lg p-4">
                      <p className="text-green-300 text-sm">
                        🎉 Welcome to RepeatHarmony! You now have access to:
                      </p>
                      <ul className="text-green-200 text-sm mt-2 space-y-1">
                        <li>• Mood tracking and analysis</li>
                        <li>• Personalized music therapy</li>
                        <li>• Community support forum</li>
                        <li>• Guided therapy sessions</li>
                      </ul>
                    </div>
                    <p className="text-slate-400 text-sm">
                      Redirecting to your dashboard in a few seconds...
                    </p>
                  </div>
                )}

                {status === "error" && (
                  <div className="bg-red-900/30 border border-red-700 rounded-lg p-4">
                    <p className="text-red-300 text-sm">
                      Don't worry! You can try these options:
                    </p>
                    <ul className="text-red-200 text-sm mt-2 space-y-1">
                      <li>• Request a new confirmation email</li>
                      <li>• Contact our support team</li>
                      <li>• Try signing up again</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {status === "success" && (
                  <Button
                    onClick={() => navigate("/dashboard")}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    Go to Dashboard
                  </Button>
                )}

                {status === "error" && (
                  <>
                    <Button
                      onClick={() => navigate("/", { replace: true })}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Back to Home
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        // This could trigger a resend verification flow
                        toast({
                          title: "Support",
                          description:
                            "Please contact support if you continue having issues.",
                        });
                      }}
                      className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
                    >
                      Contact Support
                    </Button>
                  </>
                )}

                {status === "loading" && (
                  <div className="text-center">
                    <p className="text-slate-400 text-sm">
                      This may take a few moments...
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EmailConfirm;
