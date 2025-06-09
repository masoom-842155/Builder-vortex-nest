import { Button } from "@/components/ui/button";
import { Heart, Menu, X, Bell, Settings, LogOut, User } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LoginModal from "@/components/auth/LoginModal";
import SignupModal from "@/components/auth/SignupModal";

interface UserData {
  name: string;
  email: string;
  initials: string;
}

const HeaderSection = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [notifications, setNotifications] = useState(3);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check for stored user data on component mount
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const user = JSON.parse(storedUserData);
      setUserData(user);
      setIsLoggedIn(true);
    }
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Mood Input", href: "/mood-input" },
    { label: "Mood Music", href: "/mood-music" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Therapy", href: "/therapy" },
    { label: "Forum", href: "/forum" },
  ];

  const handleLogin = (email: string, password: string) => {
    // Extract name from email for demo purposes
    const name = email
      .split("@")[0]
      .split(".")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");

    const initials = name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .substring(0, 2);

    const user: UserData = {
      name,
      email,
      initials,
    };

    setUserData(user);
    setIsLoggedIn(true);

    // Store user data
    localStorage.setItem("userData", JSON.stringify(user));

    setTimeout(() => {
      toast({
        title: `Welcome back, ${name}!`,
        description: "You've been successfully logged in.",
      });
    }, 0);
  };

  const handleSignup = (email: string, password: string, name: string) => {
    const initials = name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .substring(0, 2);

    const user: UserData = {
      name,
      email,
      initials,
    };

    setUserData(user);
    setIsLoggedIn(true);

    // Store user data
    localStorage.setItem("userData", JSON.stringify(user));

    setTimeout(() => {
      toast({
        title: `Welcome to RepeatHarmony, ${name}!`,
        description: "Your account has been created successfully.",
      });
    }, 0);
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setUserData(null);
    localStorage.removeItem("userData");

    setTimeout(() => {
      toast({
        title: "Signed out",
        description: "You've been signed out successfully.",
      });
    }, 0);

    navigate("/");
  };

  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate("/mood-input");
    } else {
      setShowSignupModal(true);
    }
  };

  const handleNotificationClick = () => {
    setNotifications(0);
    setTimeout(() => {
      toast({
        title: "Notifications",
        description: "You have new therapy suggestions and forum messages!",
      });
    }, 0);
  };

  const switchToSignup = () => {
    setShowLoginModal(false);
    setShowSignupModal(true);
  };

  const switchToLogin = () => {
    setShowSignupModal(false);
    setShowLoginModal(true);
  };

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  return (
    <>
      <header className="fixed top-0 w-full bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <Heart className="w-8 h-8 text-blue-400" />
              <span className="text-xl font-bold text-white">
                RepeatHarmony
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  className={`transition-colors duration-200 font-medium relative ${
                    isActive(link.href)
                      ? "text-blue-400"
                      : "text-slate-300 hover:text-blue-400"
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <div className="absolute -bottom-4 left-0 right-0 h-0.5 bg-blue-400 rounded-full"></div>
                  )}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {isLoggedIn && userData ? (
                <>
                  {/* Notifications */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-300 hover:text-white relative"
                    onClick={handleNotificationClick}
                  >
                    <Bell className="w-5 h-5" />
                    {notifications > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {notifications}
                      </span>
                    )}
                  </Button>

                  {/* User Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="relative h-8 w-8 rounded-full"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-blue-600 text-white">
                            {userData.initials}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-56 bg-slate-800 border-slate-700 text-white"
                      align="end"
                    >
                      <div className="flex items-center justify-start gap-2 p-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-blue-600 text-white">
                            {userData.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col space-y-1 leading-none">
                          <p className="font-medium">{userData.name}</p>
                          <p className="w-[200px] truncate text-sm text-slate-400">
                            {userData.email}
                          </p>
                        </div>
                      </div>
                      <DropdownMenuSeparator className="bg-slate-700" />
                      <DropdownMenuItem
                        className="hover:bg-slate-700 cursor-pointer"
                        onClick={() => navigate("/dashboard")}
                      >
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="hover:bg-slate-700 cursor-pointer"
                        onClick={() => navigate("/dashboard")}
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-slate-700" />
                      <DropdownMenuItem
                        className="hover:bg-slate-700 cursor-pointer text-red-400"
                        onClick={handleSignOut}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    className="text-slate-300 hover:text-white"
                    onClick={() => setShowLoginModal(true)}
                  >
                    Sign In
                  </Button>
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={handleGetStarted}
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-slate-300 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-slate-800 py-4 animate-in slide-in-from-top duration-200">
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link, index) => (
                  <Link
                    key={index}
                    to={link.href}
                    className={`transition-colors duration-200 font-medium px-2 py-1 rounded ${
                      isActive(link.href)
                        ? "text-blue-400 bg-blue-600/10"
                        : "text-slate-300 hover:text-blue-400 hover:bg-slate-800"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="flex flex-col space-y-2 pt-4 border-t border-slate-800">
                  {isLoggedIn && userData ? (
                    <>
                      <div className="flex items-center space-x-3 px-2 py-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-blue-600 text-white">
                            {userData.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-white font-medium">
                            {userData.name}
                          </p>
                          <p className="text-slate-400 text-sm">
                            {userData.email}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        className="text-slate-300 hover:text-white justify-start"
                        onClick={() => {
                          handleNotificationClick();
                          setIsMenuOpen(false);
                        }}
                      >
                        <Bell className="w-4 h-4 mr-2" />
                        Notifications
                        {notifications > 0 && (
                          <span className="ml-auto w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                            {notifications}
                          </span>
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        className="text-slate-300 hover:text-white justify-start"
                        onClick={() => {
                          navigate("/dashboard");
                          setIsMenuOpen(false);
                        }}
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                      </Button>
                      <Button
                        variant="ghost"
                        className="text-red-400 hover:text-red-300 justify-start"
                        onClick={() => {
                          handleSignOut();
                          setIsMenuOpen(false);
                        }}
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="ghost"
                        className="text-slate-300 hover:text-white justify-start"
                        onClick={() => {
                          setShowLoginModal(true);
                          setIsMenuOpen(false);
                        }}
                      >
                        Sign In
                      </Button>
                      <Button
                        className="bg-blue-600 hover:bg-blue-700 text-white justify-start"
                        onClick={() => {
                          handleGetStarted();
                          setIsMenuOpen(false);
                        }}
                      >
                        Get Started
                      </Button>
                    </>
                  )}
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Auth Modals */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
        onSwitchToSignup={switchToSignup}
      />

      <SignupModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        onSignup={handleSignup}
        onSwitchToLogin={switchToLogin}
      />
    </>
  );
};

export default HeaderSection;
