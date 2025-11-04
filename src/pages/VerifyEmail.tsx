import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { BASE_URL } from "@/api";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");
      
      if (!token) {
        setError("Invalid or missing verification token");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${BASE_URL}/users/verify-email?token=${token}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setSuccess(true);
        } else {
          setError(data.error || "Failed to verify email");
        }
      } catch (err) {
        setError("Network error. Please try again.");
        console.error("Email verification error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    verifyEmail();
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-primary">GeoRankers</h1>
      </div>
      
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Email Verification
            </CardTitle>
            <CardDescription className="text-center">
              {isLoading
                ? "Verifying your email address..."
                : success
                ? "Your email has been verified!"
                : "Verification failed"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-8 space-y-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-sm text-gray-500">Please wait...</p>
              </div>
            )}

            {success && (
              <div className="space-y-4">
                <div className="flex flex-col items-center justify-center py-4 space-y-4">
                  <CheckCircle2 className="h-16 w-16 text-green-500" />
                </div>
                <Alert className="border-green-500 bg-green-50 dark:bg-green-900/20">
                  <AlertDescription className="text-green-800 dark:text-green-200">
                    Your email has been successfully verified! You can now log in to your account.
                  </AlertDescription>
                </Alert>
                <Button
                  onClick={() => navigate("/login")}
                  className="w-full"
                >
                  Go to Login
                </Button>
              </div>
            )}

            {error && !isLoading && (
              <div className="space-y-4">
                <div className="flex flex-col items-center justify-center py-4 space-y-4">
                  <XCircle className="h-16 w-16 text-red-500" />
                </div>
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
                <div className="space-y-2">
                  <Button
                    onClick={() => navigate("/login")}
                    className="w-full"
                    variant="outline"
                  >
                    Go to Login
                  </Button>
                  <Button
                    onClick={() => navigate("/register")}
                    className="w-full"
                    variant="outline"
                  >
                    Register New Account
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VerifyEmail;

