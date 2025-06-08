import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Home,
  MessageSquare,
  BarChart3,
  Brain,
  Users,
  User,
  Search,
  Bell,
  Send,
  ChevronDown,
  X,
  Paperclip,
  Smile,
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

const forumMessages = [
  {
    id: 1,
    author: "Dr. Emily White",
    role: "Therapist",
    time: "10:14 AM",
    avatar: "EW",
    message:
      "Welcome everyone to our 'Mindful Moments' community forum! This space is dedicated to sharing positive coping strategies and mindfulness tips. Feel free to ask questions and support each other.",
    isTherapist: true,
  },
  {
    id: 2,
    author: "Sarah J.",
    role: "Member",
    time: "10:19 AM",
    avatar: "SJ",
    message:
      "Hi Dr. White! 👋 I'm new here and excited to learn. Does anyone have quick tips for daily gratitude journaling?",
    isTherapist: false,
  },
  {
    id: 3,
    author: "You",
    role: "Member",
    time: "10:21 AM",
    avatar: "ME",
    message:
      "Hey Sarah! For gratitude, I find using a small notebook by my bedside helpful. I just jot down 3 things every night. Simple, but effective! 😊",
    isTherapist: false,
    isCurrentUser: true,
  },
  {
    id: 4,
    author: "Dr. Emily White",
    role: "Therapist",
    time: "10:25 AM",
    avatar: "EW",
    message:
      "That's a great tip, @You ! Consistency is key. Also, try to focus on specific details rather than general statements for deeper impact.",
    isTherapist: true,
  },
  {
    id: 5,
    author: "Michael C.",
    role: "Member",
    time: "10:30 AM",
    avatar: "MC",
    message:
      "I've been trying guided meditation from the Therapy Suggestions section. It's really calming after a long day. Has anyone else tried it?",
    isTherapist: false,
  },
  {
    id: 6,
    author: "You",
    role: "Member",
    time: "10:35 AM",
    avatar: "ME",
    message:
      "Yes, @Michael C ! The 'Deep Breath' exercise is my favorite. It helps clear my mind. Highly recommend checking out the Therapy section!",
    isTherapist: false,
    isCurrentUser: true,
  },
];

const activeThreads = [
  {
    author: "Sarah J.",
    topic: "Daily gratitude journaling tips?",
    time: "10:19 AM",
    avatar: "SJ",
  },
  {
    author: "Michael C.",
    topic: "Guided meditation experiences?",
    time: "10:30 AM",
    avatar: "MC",
  },
  {
    author: "Dr. Emily White",
    topic: "Weekly Mindfulness Challenge: Observe your thoughts!",
    time: "9:00 AM",
    avatar: "EW",
  },
];

const Forum = () => {
  const [newMessage, setNewMessage] = useState("");
  const [showActiveThreads, setShowActiveThreads] = useState(true);
  const location = useLocation();

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Handle sending message logic here
      setNewMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
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
                JD
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">John Doe</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex">
        {/* Forum Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Navigation */}
          <div className="bg-slate-900 border-b border-slate-800 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl font-bold text-white">
                    Mindful Moments
                  </h1>
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                </div>
                <div className="flex items-center space-x-2">
                  <Search className="w-4 h-4 text-slate-400" />
                  <Bell className="w-4 h-4 text-slate-400" />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Input
                  placeholder="Search forum topics..."
                  className="w-80 bg-slate-800 border-slate-700 text-white placeholder-slate-400"
                />
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-blue-600 text-white text-sm">
                    JD
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {forumMessages.map((message) => (
              <div key={message.id} className="flex items-start space-x-4">
                <Avatar className="w-10 h-10">
                  <AvatarFallback
                    className={`text-white text-sm ${
                      message.isTherapist
                        ? "bg-purple-600"
                        : message.isCurrentUser
                          ? "bg-blue-600"
                          : "bg-slate-600"
                    }`}
                  >
                    {message.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-semibold text-white">
                      {message.author}
                    </span>
                    {message.isTherapist && (
                      <Badge className="bg-purple-600 text-white text-xs">
                        Therapist
                      </Badge>
                    )}
                    <span className="text-sm text-slate-400">
                      {message.time}
                    </span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {message.message}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="border-t border-slate-800 p-6">
            <div className="flex items-end space-x-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 bg-slate-800 rounded-lg p-4">
                  <Paperclip className="w-5 h-5 text-slate-400" />
                  <Smile className="w-5 h-5 text-slate-400" />
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1 bg-transparent border-none text-white placeholder-slate-400 focus:ring-0"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Active Threads */}
        {showActiveThreads && (
          <aside className="w-80 bg-slate-900 border-l border-slate-800 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Active Threads</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowActiveThreads(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4">
              {activeThreads.map((thread, index) => (
                <Card
                  key={index}
                  className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-colors cursor-pointer"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-slate-600 text-white text-xs">
                          {thread.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-white text-sm">
                          {thread.author}
                        </p>
                        <p className="text-slate-400 text-sm mt-1 line-clamp-2">
                          {thread.topic}
                        </p>
                        <p className="text-slate-500 text-xs mt-2">
                          {thread.time}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Separator className="bg-slate-700 my-6" />

            <div className="text-center">
              <Button
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-800 w-full"
              >
                View All Threads
              </Button>
            </div>
          </aside>
        )}
      </main>
    </div>
  );
};

export default Forum;
