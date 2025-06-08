import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Home,
  MessageSquare,
  BarChart3,
  Brain,
  Users,
  User,
  Lightbulb,
  Clock,
  Heart,
  Headphones,
  BookOpen,
  Moon,
  Waves,
  Play,
  CheckCircle,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const sidebarItems = [
  { icon: Home, label: "Home", href: "/", id: "home" },
  {
    icon: MessageSquare,
    label: "Repeat Input",
    href: "/mood-input",
    id: "repeat-input",
  },
  { icon: BarChart3, label: "Dashboard", href: "/dashboard", id: "dashboard" },
  { icon: Brain, label: "Therapy", href: "/therapy", id: "therapy" },
  { icon: Users, label: "Forum", href: "/forum", id: "forum" },
];

const personalizedSuggestions = [
  {
    title: "Cognitive Restructuring",
    description:
      "Challenge negative thought patterns and reshape your perception of challenging situations.",
    icon: Brain,
    color: "text-blue-400",
  },
  {
    title: "Mindfulness Meditation",
    description:
      "Practice present-moment awareness to reduce stress and enhance emotional regulation.",
    icon: Heart,
    color: "text-green-400",
  },
  {
    title: "Journaling for Clarity",
    description:
      "Express your thoughts and feelings in writing to gain insights and emotional release.",
    icon: BookOpen,
    color: "text-purple-400",
  },
];

const resources = [
  {
    title: "Guided Meditations",
    description: "Access a library of audio meditations for various purposes.",
    icon: Headphones,
    color: "text-blue-500",
  },
  {
    title: "Journal Prompts",
    description:
      "Inspirational prompts to guide your reflective writing sessions.",
    icon: BookOpen,
    color: "text-purple-500",
  },
  {
    title: "Sleep Stories",
    description:
      "Calming narratives to help you unwind and fall asleep easily.",
    icon: Moon,
    color: "text-indigo-500",
  },
  {
    title: "Sound Therapy",
    description: "Listen to therapeutic sounds and frequencies for relaxation.",
    icon: Waves,
    color: "text-cyan-500",
  },
];

const Therapy = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">RepeatHarmony</span>
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
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-gradient-to-r from-green-500 to-blue-500 text-white text-sm">
                UP
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">User Profile</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* AI Insight Card */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-1 bg-gradient-to-br from-orange-500 to-pink-600 border-none text-white">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  AI Insight: Mild Anxiety & Stress
                </h3>
                <p className="text-orange-100 text-sm mb-4">
                  Your recent mood patterns suggest...
                </p>
                <p className="text-sm leading-relaxed">
                  Based on your recent entries, you've shown signs of mild
                  anxiety and increased stress levels. Focusing on techniques
                  that promote calm and emotional resilience could be
                  beneficial.
                </p>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2 bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">
                  Your Therapy Progress
                </CardTitle>
                <CardDescription className="text-slate-400">
                  A quick look at your journey.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-300">Sessions Completed:</span>
                    <span className="text-white font-semibold">7</span>
                  </div>
                  <Progress value={70} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-300">Techniques Tried:</span>
                    <span className="text-white font-semibold">3</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-300">
                      Current Wellness Streak:
                    </span>
                    <span className="text-green-400 font-semibold">
                      14 days
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Personalized Suggestions */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">
              Personalized Suggestions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {personalizedSuggestions.map((suggestion, index) => {
                const IconComponent = suggestion.icon;
                return (
                  <Card
                    key={index}
                    className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-colors"
                  >
                    <CardHeader className="text-center">
                      <div className="mx-auto mb-4 p-4 bg-slate-700 rounded-full w-16 h-16 flex items-center justify-center">
                        <IconComponent
                          className={`w-8 h-8 ${suggestion.color}`}
                        />
                      </div>
                      <CardTitle className="text-white text-lg">
                        {suggestion.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <CardDescription className="text-slate-400 mb-6">
                        {suggestion.description}
                      </CardDescription>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        Learn More
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Explore More Resources */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">
              Explore More Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resources.map((resource, index) => {
                const IconComponent = resource.icon;
                return (
                  <Card
                    key={index}
                    className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-colors cursor-pointer"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center">
                          <IconComponent
                            className={`w-6 h-6 ${resource.color}`}
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-semibold text-lg">
                            {resource.title}
                          </h3>
                          <p className="text-slate-400 text-sm mt-1">
                            {resource.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Deep Dive Section */}
          <Card className="bg-slate-800 border-slate-700">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="p-8">
                <Badge className="bg-blue-600 text-white mb-4">
                  Deep Dive: Understanding
                </Badge>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Deep Dive: Understanding
                </h3>
                <p className="text-blue-400 text-lg mb-6">
                  A powerful approach to managing mental health.
                </p>
                <p className="text-slate-300 mb-6">
                  Learn the core principles of CBT, how our thoughts influence
                  our emotions, and use this comprehensive guide to walk you
                  through practical techniques.
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Start Session
                </Button>
              </div>
              <div className="p-8">
                <img
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop&crop=center"
                  alt="Person meditating"
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            </div>
          </Card>

          {/* Footer Section */}
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              RepeatHarmony
            </h2>
            <p className="text-slate-400 mb-8 text-lg">
              Stay updated with RepeatHarmony
            </p>
            <div className="flex justify-center space-x-4 max-w-md mx-auto">
              <Input
                placeholder="Enter your email"
                className="bg-slate-800 border-slate-700 text-white placeholder-slate-400"
              />
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Subscribe
              </Button>
            </div>
            <p className="text-slate-500 text-sm mt-8">
              © 2025 RepeatHarmony.
            </p>
            <div className="flex justify-center space-x-2 mt-4">
              <div className="w-6 h-6 bg-slate-700 rounded"></div>
              <div className="w-6 h-6 bg-slate-700 rounded"></div>
            </div>
            <div className="mt-4">
              <select className="bg-slate-800 border border-slate-700 text-slate-400 px-3 py-1 rounded text-sm">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Therapy;
