import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Home,
  MessageSquare,
  BarChart3,
  Brain,
  Users,
  User,
  Mic,
  Camera,
  Edit3,
  CheckCircle,
  AlertCircle,
  Meh,
  Smile,
  Frown,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const sidebarItems = [
  { icon: Home, label: "Home", href: "/", id: "home" },
  {
    icon: MessageSquare,
    label: "Mood Input",
    href: "/mood-input",
    id: "mood-input",
  },
  { icon: BarChart3, label: "Dashboard", href: "/dashboard", id: "dashboard" },
  { icon: Brain, label: "Therapy", href: "/therapy", id: "therapy" },
  { icon: Users, label: "Forum", href: "/forum", id: "forum" },
];

const recentMoods = [
  {
    mood: "Calm",
    time: "2 hours ago",
    color: "bg-green-500",
    icon: CheckCircle,
  },
  { mood: "Neutral", time: "Yesterday", color: "bg-yellow-500", icon: Meh },
  {
    mood: "Anxious",
    time: "2 days ago",
    color: "bg-red-500",
    icon: AlertCircle,
  },
  { mood: "Relaxed", time: "3 days ago", color: "bg-blue-500", icon: Smile },
  { mood: "Stressed", time: "4 days ago", color: "bg-purple-500", icon: Frown },
  {
    mood: "Optimistic",
    time: "5 days ago",
    color: "bg-green-400",
    icon: Smile,
  },
];

const MoodInput = () => {
  const [selectedInputMethod, setSelectedInputMethod] = useState("text");
  const [moodText, setMoodText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate mood analysis
    setTimeout(() => {
      setIsSubmitting(false);
      // You would typically navigate to results or update the mood history
    }, 2000);
  };

  const inputMethods = [
    {
      id: "text",
      label: "Text Input",
      icon: Edit3,
      description: "Write about your feelings",
    },
    {
      id: "voice",
      label: "Voice Recognition",
      icon: Mic,
      description: "Speak your thoughts aloud",
    },
    {
      id: "facial",
      label: "Facial Analysis",
      icon: Camera,
      description: "Use camera to detect emotions",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">MoodHarmony</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = location.pathname === item.href;

              return (
                <li key={item.id}>
                  <Link
                    to={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-slate-800">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">User Profile</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex">
        {/* Center Content */}
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">
                How are you feeling today?
              </h1>
              <p className="text-slate-400 text-lg">
                Let MoodHarmony understand your current emotional state to
                provide personalized support.
              </p>
            </div>

            {/* Input Method Selection */}
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {inputMethods.map((method) => {
                    const IconComponent = method.icon;
                    return (
                      <Button
                        key={method.id}
                        variant={
                          selectedInputMethod === method.id
                            ? "default"
                            : "outline"
                        }
                        onClick={() => setSelectedInputMethod(method.id)}
                        className={`h-auto p-6 flex flex-col items-center space-y-3 transition-all duration-200 ${
                          selectedInputMethod === method.id
                            ? "bg-blue-600 border-blue-500 text-white"
                            : "border-slate-600 text-slate-300 hover:border-slate-500 hover:bg-slate-700"
                        }`}
                      >
                        <IconComponent className="w-8 h-8" />
                        <div className="text-center">
                          <div className="font-semibold">{method.label}</div>
                          <div className="text-sm opacity-80 mt-1">
                            {method.description}
                          </div>
                        </div>
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Input Interface */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">
                  Express Yourself in Words
                </CardTitle>
                <CardDescription className="text-slate-400">
                  {selectedInputMethod === "text" &&
                    "Write down your thoughts and feelings..."}
                  {selectedInputMethod === "voice" &&
                    "Click the microphone to start voice recording..."}
                  {selectedInputMethod === "facial" &&
                    "Position your face in the camera frame for emotion detection..."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedInputMethod === "text" && (
                  <Textarea
                    placeholder="Write down your thoughts and feelings..."
                    className="min-h-[200px] bg-slate-900 border-slate-600 text-white placeholder-slate-500 resize-none"
                    value={moodText}
                    onChange={(e) => setMoodText(e.target.value)}
                  />
                )}

                {selectedInputMethod === "voice" && (
                  <div className="min-h-[200px] bg-slate-900 border border-slate-600 rounded-lg flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                        <Mic className="w-10 h-10 text-white" />
                      </div>
                      <p className="text-slate-400">
                        Click to start recording your voice
                      </p>
                      <Button className="bg-red-600 hover:bg-red-700">
                        Start Recording
                      </Button>
                    </div>
                  </div>
                )}

                {selectedInputMethod === "facial" && (
                  <div className="min-h-[200px] bg-slate-900 border border-slate-600 rounded-lg flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto">
                        <Camera className="w-10 h-10 text-white" />
                      </div>
                      <p className="text-slate-400">
                        Enable camera for facial emotion analysis
                      </p>
                      <Button className="bg-purple-600 hover:bg-purple-700">
                        Enable Camera
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Mood Visualization */}
            <Card className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-slate-700">
              <CardContent className="p-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Your mood visualized here
                  </h3>
                  <div className="w-full h-32 bg-slate-800/50 rounded-lg flex items-center justify-center">
                    <p className="text-slate-400">
                      Mood visualization will appear after analysis
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="text-center">
              <Button
                onClick={handleSubmit}
                disabled={
                  isSubmitting ||
                  (selectedInputMethod === "text" && !moodText.trim())
                }
                className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 text-lg font-semibold rounded-lg disabled:opacity-50"
              >
                {isSubmitting ? "Analyzing..." : "Submit Mood for Analysis"}
              </Button>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Recent Moods */}
        <aside className="w-80 bg-slate-900 border-l border-slate-800 p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Your Recent Moods
              </h2>
              <p className="text-slate-400">
                A quick glance at your emotional journey.
              </p>
            </div>

            <div className="space-y-4">
              {recentMoods.map((mood, index) => {
                const IconComponent = mood.icon;
                return (
                  <Card
                    key={index}
                    className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-colors"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-10 h-10 ${mood.color} rounded-full flex items-center justify-center`}
                          >
                            <IconComponent className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-white">
                              {mood.mood}
                            </p>
                            <p className="text-sm text-slate-400">
                              {mood.time}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-400 hover:text-blue-300 hover:bg-slate-700"
                        >
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Separator className="bg-slate-700" />

            <div className="text-center">
              <Button
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-800"
              >
                View Full History
              </Button>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default MoodInput;
