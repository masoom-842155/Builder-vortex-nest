import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Mail, Heart, Clock, CheckCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface EmailVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
}

const EmailVerificationModal = ({
  isOpen,
  onClose,
  email,
}: EmailVerificationModalProps) => {
  const [isResending, setIsResending] = useState(false);
  const [resendCount, setResendCount] = useState(0);
  const { resendVerification } = useAuth();
  const { toast } = useToast();

  const handleResendEmail = async () => {
    if (resendCount >= 3) {
      setTimeout(() => {
        toast({
          title: "Rate Limited",
          description:
            "Please wait a few minutes before requesting another email.",
          variant: "destructive",
        });
      }, 0);
      return;
    }

    setIsResending(true);

    try {
      await resendVerification(email);
      setResendCount((prev) => prev + 1);

      setTimeout(() => {
        toast({
          title: "Email Resent",
          description: "We've sent another verification email to your inbox.",
        });
      }, 0);
    } catch (error) {
      setTimeout(() => {
        toast({
          title: "Error",
          description: "Failed to resend verification email. Please try again.",
          variant: "destructive",
        });
      }, 0);
    } finally {
      setIsResending(false);
    }
  };

  const content = (
    <Card className="bg-slate-800 border-slate-700 w-full max-w-md">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="relative">
            <Mail className="w-12 h-12 text-blue-400" />
            <CheckCircle className="w-5 h-5 text-green-400 absolute -top-1 -right-1 bg-slate-800 rounded-full" />
          </div>
        </div>
        <CardTitle className="text-2xl text-white">Check Your Email</CardTitle>
        <CardDescription className="text-slate-400">
          We've sent a verification link to your email address
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Email Address Display */}
        <div className="bg-slate-900 border border-slate-600 rounded-lg p-4 text-center">
          <p className="text-slate-300 text-sm mb-2">
            Verification email sent to:
          </p>
          <p className="text-white font-medium">{email}</p>
        </div>

        {/* Instructions */}
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
              1
            </div>
            <div>
              <p className="text-white font-medium">Check your inbox</p>
              <p className="text-slate-400 text-sm">
                Look for an email from RepeatHarmony with the subject "Welcome
                to RepeatHarmony! Please confirm your email"
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
              2
            </div>
            <div>
              <p className="text-white font-medium">
                Click the verification link
              </p>
              <p className="text-slate-400 text-sm">
                Click "Confirm Email Address" in the email to verify your
                account
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
              3
            </div>
            <div>
              <p className="text-white font-medium">
                Start your wellness journey
              </p>
              <p className="text-slate-400 text-sm">
                You'll be automatically signed in and can access all features
              </p>
            </div>
          </div>
        </div>

        {/* Troubleshooting */}
        <div className="bg-slate-900 border border-slate-600 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="w-4 h-4 text-yellow-400" />
            <p className="text-yellow-400 font-medium text-sm">
              Don't see the email?
            </p>
          </div>
          <ul className="text-slate-400 text-sm space-y-1">
            <li>• Check your spam/junk folder</li>
            <li>• Make sure {email} is correct</li>
            <li>• Wait a few minutes for delivery</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={handleResendEmail}
            disabled={isResending || resendCount >= 3}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isResending ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Resending...
              </>
            ) : (
              `Resend Email ${resendCount > 0 ? `(${resendCount}/3)` : ""}`
            )}
          </Button>

          <Button
            variant="outline"
            onClick={onClose}
            className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            I'll Check Later
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center pt-4 border-t border-slate-700">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Heart className="w-4 h-4 text-blue-400" />
            <span className="text-slate-400 text-sm">
              Welcome to RepeatHarmony
            </span>
          </div>
          <p className="text-slate-500 text-xs">
            We're excited to help you on your mental wellness journey
          </p>
        </div>
      </CardContent>
    </Card>
  );

  return isOpen ? (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-md">{content}</div>
    </div>
  ) : null;
};

export default EmailVerificationModal;
