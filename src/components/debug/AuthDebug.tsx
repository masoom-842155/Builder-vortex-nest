import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

const AuthDebug = () => {
  const [supabaseStatus, setSupabaseStatus] = useState<string>("checking...");
  const [dbStatus, setDbStatus] = useState<string>("checking...");
  const [authStatus, setAuthStatus] = useState<string>("checking...");
  const [sessionInfo, setSessionInfo] = useState<any>(null);
  const { user, session, isAuthenticated, loading } = useAuth();

  useEffect(() => {
    checkSupabaseConnection();
    checkDatabaseTables();
    checkAuthSession();
  }, []);

  const checkSupabaseConnection = async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        setSupabaseStatus(`❌ Error: ${error.message}`);
      } else {
        setSupabaseStatus("✅ Connected");
      }
    } catch (err) {
      setSupabaseStatus(`❌ Failed: ${err}`);
    }
  };

  const checkDatabaseTables = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("count", { count: "exact", head: true });

      if (error) {
        setDbStatus(`❌ Table Error: ${error.message}`);
      } else {
        setDbStatus(`✅ Profiles table exists (${data?.length || 0} records)`);
      }
    } catch (err) {
      setDbStatus(`❌ Database Error: ${err}`);
    }
  };

  const checkAuthSession = async () => {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      setSessionInfo(session);

      if (error) {
        setAuthStatus(`❌ Session Error: ${error.message}`);
      } else if (session) {
        setAuthStatus(`✅ Active session: ${session.user.email}`);
      } else {
        setAuthStatus("⚠️ No active session");
      }
    } catch (err) {
      setAuthStatus(`❌ Auth Error: ${err}`);
    }
  };

  const testSignup = async () => {
    try {
      const testEmail = `test${Date.now()}@example.com`;
      const { data, error } = await supabase.auth.signUp({
        email: testEmail,
        password: "testpass123",
        options: {
          data: {
            name: "Test User",
          },
        },
      });

      if (error) {
        alert(`Signup Error: ${error.message}`);
      } else {
        alert(`Signup Success: ${data.user?.email}`);
      }
    } catch (err) {
      alert(`Signup Failed: ${err}`);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="bg-slate-800 border-slate-700 w-80">
        <CardHeader>
          <CardTitle className="text-white text-sm">🔧 Auth Debug</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <Badge variant="outline" className="text-xs mb-1">
              Supabase
            </Badge>
            <p className="text-xs text-slate-300">{supabaseStatus}</p>
          </div>

          <div>
            <Badge variant="outline" className="text-xs mb-1">
              Database
            </Badge>
            <p className="text-xs text-slate-300">{dbStatus}</p>
          </div>

          <div>
            <Badge variant="outline" className="text-xs mb-1">
              Auth Session
            </Badge>
            <p className="text-xs text-slate-300">{authStatus}</p>
          </div>

          <div>
            <Badge variant="outline" className="text-xs mb-1">
              Context State
            </Badge>
            <p className="text-xs text-slate-300">
              User: {user ? `✅ ${user.email}` : "❌ None"}
              <br />
              Authenticated: {isAuthenticated ? "✅ Yes" : "❌ No"}
              <br />
              Loading: {loading ? "⏳ Yes" : "✅ No"}
            </p>
          </div>

          {sessionInfo && (
            <div>
              <Badge variant="outline" className="text-xs mb-1">
                Session Info
              </Badge>
              <p className="text-xs text-slate-300">
                Email: {sessionInfo.user?.email}
                <br />
                ID: {sessionInfo.user?.id?.slice(0, 8)}...
                <br />
                Verified: {sessionInfo.user?.email_confirmed_at ? "✅" : "❌"}
              </p>
            </div>
          )}

          <div className="flex gap-2">
            <Button size="sm" onClick={checkAuthSession} className="text-xs">
              Refresh
            </Button>
            <Button size="sm" onClick={testSignup} className="text-xs">
              Test Signup
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthDebug;
