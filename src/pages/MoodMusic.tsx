import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Play,
  Pause,
  SkipForward,
  Heart,
  Music,
  Brain,
  Headphones,
} from "lucide-react";
import HeaderSection from "@/components/sections/HeaderSection";

// Mock mood analysis and music data
const moodOptions = [
  { id: "happy", label: "Happy", color: "bg-yellow-500", icon: "😊" },
  { id: "sad", label: "Sad", color: "bg-blue-500", icon: "😢" },
  { id: "anxious", label: "Anxious", color: "bg-red-500", icon: "😰" },
  { id: "calm", label: "Calm", color: "bg-green-500", icon: "😌" },
  { id: "energetic", label: "Energetic", color: "bg-orange-500", icon: "⚡" },
  { id: "focused", label: "Focused", color: "bg-purple-500", icon: "🎯" },
  { id: "nostalgic", label: "Nostalgic", color: "bg-pink-500", icon: "🌅" },
  { id: "stressed", label: "Stressed", color: "bg-gray-500", icon: "😣" },
];

const musicRecommendations = {
  happy: [
    {
      title: "Sunny Disposition",
      artist: "Harmony Springs",
      duration: "3:24",
      genre: "Uplifting Pop",
    },
    {
      title: "Joy Waves",
      artist: "Positive Vibes Collective",
      duration: "4:12",
      genre: "Feel-Good Electronic",
    },
    {
      title: "Bright Morning",
      artist: "Sunshine Orchestra",
      duration: "2:58",
      genre: "Upbeat Instrumental",
    },
  ],
  sad: [
    {
      title: "Gentle Rain",
      artist: "Melancholy Sounds",
      duration: "5:43",
      genre: "Ambient Sad",
    },
    {
      title: "Quiet Reflection",
      artist: "Somber Piano",
      duration: "4:28",
      genre: "Emotional Piano",
    },
    {
      title: "Healing Tears",
      artist: "Therapeutic Strings",
      duration: "6:15",
      genre: "Cathartic Classical",
    },
  ],
  anxious: [
    {
      title: "Breathing Space",
      artist: "Anxiety Relief",
      duration: "8:30",
      genre: "Calming Meditation",
    },
    {
      title: "Safe Harbor",
      artist: "Peaceful Mind",
      duration: "5:45",
      genre: "Grounding Ambient",
    },
    {
      title: "Steady Heartbeat",
      artist: "Rhythmic Therapy",
      duration: "7:20",
      genre: "Stabilizing Sounds",
    },
  ],
  calm: [
    {
      title: "Ocean Whispers",
      artist: "Tranquil Waves",
      duration: "10:15",
      genre: "Nature Sounds",
    },
    {
      title: "Moonlight Meditation",
      artist: "Zen Garden",
      duration: "12:30",
      genre: "Meditation Music",
    },
    {
      title: "Peaceful Valley",
      artist: "Serenity Composers",
      duration: "8:45",
      genre: "Ambient Peace",
    },
  ],
  energetic: [
    {
      title: "Power Surge",
      artist: "High Energy Collective",
      duration: "3:28",
      genre: "Motivational EDM",
    },
    {
      title: "Mountain Climb",
      artist: "Achievement Sounds",
      duration: "4:15",
      genre: "Epic Orchestral",
    },
    {
      title: "Lightning Strike",
      artist: "Dynamic Beats",
      duration: "3:52",
      genre: "High-Tempo Electronic",
    },
  ],
  focused: [
    {
      title: "Deep Concentration",
      artist: "Focus Flow",
      duration: "45:00",
      genre: "Study Music",
    },
    {
      title: "Mental Clarity",
      artist: "Cognitive Enhancers",
      duration: "30:22",
      genre: "Binaural Beats",
    },
    {
      title: "Productivity Zone",
      artist: "Work Flow Sounds",
      duration: "25:15",
      genre: "Lo-Fi Focus",
    },
  ],
  nostalgic: [
    {
      title: "Memory Lane",
      artist: "Vintage Hearts",
      duration: "4:33",
      genre: "Nostalgic Pop",
    },
    {
      title: "Golden Hour",
      artist: "Yesterday's Dreams",
      duration: "5:20",
      genre: "Retro Ambient",
    },
    {
      title: "Old Photograph",
      artist: "Sentimental Journey",
      duration: "3:47",
      genre: "Vintage Instrumental",
    },
  ],
  stressed: [
    {
      title: "Tension Release",
      artist: "Stress Relief Therapy",
      duration: "15:30",
      genre: "Stress Relief",
    },
    {
      title: "Pressure Valve",
      artist: "Decompression Suite",
      duration: "12:45",
      genre: "Therapeutic Ambient",
    },
    {
      title: "Unwinding Hour",
      artist: "Relaxation Masters",
      duration: "20:00",
      genre: "Deep Relaxation",
    },
  ],
};

const MoodMusic = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [moodConfidence, setMoodConfidence] = useState(0);

  const handleMoodSelect = (moodId: string) => {
    setSelectedMood(moodId);
    setIsAnalyzing(true);
    setMoodConfidence(0);

    // Simulate AI analysis
    const interval = setInterval(() => {
      setMoodConfidence((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          setIsAnalyzing(false);
          return 95;
        }
        return prev + 5;
      });
    }, 100);
  };

  const togglePlay = (songTitle: string) => {
    setCurrentlyPlaying(currentlyPlaying === songTitle ? null : songTitle);
  };

  const selectedMoodData = selectedMood
    ? moodOptions.find((m) => m.id === selectedMood)
    : null;
  const recommendations = selectedMood
    ? musicRecommendations[selectedMood as keyof typeof musicRecommendations]
    : [];

  return (
    <div className="min-h-screen bg-slate-950">
      <HeaderSection />

      <div className="pt-20 px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full">
                <Music className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Mood-Based Music Therapy
              </h1>
            </div>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Our AI analyzes your current emotional state and curates
              personalized music recommendations to support your mental
              well-being journey.
            </p>
          </div>

          {/* Mood Selection */}
          <Card className="bg-slate-800 border-slate-700 mb-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Brain className="w-6 h-6 text-blue-400" />
                <span>How are you feeling right now?</span>
              </CardTitle>
              <CardDescription className="text-slate-400">
                Select your current mood so we can recommend the perfect music
                therapy for you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {moodOptions.map((mood) => (
                  <Button
                    key={mood.id}
                    variant={selectedMood === mood.id ? "default" : "outline"}
                    onClick={() => handleMoodSelect(mood.id)}
                    className={`h-auto p-4 flex flex-col items-center space-y-2 transition-all duration-200 ${
                      selectedMood === mood.id
                        ? "bg-blue-600 border-blue-500 text-white"
                        : "border-slate-600 text-slate-300 hover:border-slate-500"
                    }`}
                  >
                    <span className="text-2xl">{mood.icon}</span>
                    <span className="font-medium">{mood.label}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Analysis */}
          {isAnalyzing && selectedMoodData && (
            <Card className="bg-slate-800 border-slate-700 mb-8">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center space-x-3 text-blue-400">
                    <Brain className="w-6 h-6 animate-pulse" />
                    <span className="text-lg font-medium">
                      AI is analyzing your mood...
                    </span>
                  </div>
                  <Progress
                    value={moodConfidence}
                    className="w-full max-w-md mx-auto"
                  />
                  <p className="text-slate-400">
                    Confidence: {moodConfidence}%
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Music Recommendations */}
          {selectedMoodData && !isAnalyzing && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4 mb-6">
                <div
                  className={`w-4 h-4 rounded-full ${selectedMoodData.color}`}
                ></div>
                <h2 className="text-3xl font-bold text-white">
                  Music for {selectedMoodData.label} Mood
                </h2>
                <Badge
                  variant="secondary"
                  className="bg-slate-700 text-slate-300"
                >
                  {recommendations.length} songs
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations.map((song, index) => (
                  <Card
                    key={index}
                    className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-all duration-200"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white mb-1">
                            {song.title}
                          </h3>
                          <p className="text-slate-400 text-sm mb-2">
                            {song.artist}
                          </p>
                          <Badge
                            variant="outline"
                            className="border-slate-600 text-slate-400 text-xs"
                          >
                            {song.genre}
                          </Badge>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-slate-400 hover:text-white"
                        >
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 text-sm">
                          {song.duration}
                        </span>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            onClick={() => togglePlay(song.title)}
                            className={`${
                              currentlyPlaying === song.title
                                ? "bg-blue-600 hover:bg-blue-700"
                                : "bg-slate-700 hover:bg-slate-600"
                            } text-white`}
                          >
                            {currentlyPlaying === song.title ? (
                              <Pause className="w-4 h-4" />
                            ) : (
                              <Play className="w-4 h-4" />
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-slate-400 hover:text-white"
                          >
                            <SkipForward className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {currentlyPlaying === song.title && (
                        <div className="mt-4 pt-4 border-t border-slate-700">
                          <div className="flex items-center space-x-3">
                            <Headphones className="w-4 h-4 text-blue-400" />
                            <div className="flex-1">
                              <div className="w-full bg-slate-700 rounded-full h-1">
                                <div className="bg-blue-500 h-1 rounded-full w-1/3 animate-pulse"></div>
                              </div>
                            </div>
                            <span className="text-xs text-slate-400">
                              1:23 / {song.duration}
                            </span>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Mood Insights */}
              <Card className="bg-slate-800 border-slate-700 mt-8">
                <CardHeader>
                  <CardTitle className="text-white">
                    Why This Music Helps
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-slate-300 space-y-3">
                    {selectedMood === "happy" && (
                      <p>
                        Uplifting music with positive melodies can amplify your
                        good mood and help maintain emotional balance throughout
                        the day.
                      </p>
                    )}
                    {selectedMood === "sad" && (
                      <p>
                        Gentle, melodic music can provide emotional validation
                        and gradually help lift your spirits while honoring your
                        current feelings.
                      </p>
                    )}
                    {selectedMood === "anxious" && (
                      <p>
                        Slow, rhythmic music with deep tones can help regulate
                        your breathing and heart rate, promoting a sense of calm
                        and safety.
                      </p>
                    )}
                    {selectedMood === "calm" && (
                      <p>
                        Peaceful ambient sounds help maintain your tranquil
                        state and can deepen your sense of inner peace and
                        mindfulness.
                      </p>
                    )}
                    {selectedMood === "energetic" && (
                      <p>
                        High-tempo music with strong beats can channel your
                        energy positively and help you accomplish your goals
                        with motivation.
                      </p>
                    )}
                    {selectedMood === "focused" && (
                      <p>
                        Instrumental music with consistent patterns can enhance
                        concentration and cognitive performance without causing
                        distraction.
                      </p>
                    )}
                    {selectedMood === "nostalgic" && (
                      <p>
                        Familiar melodies and vintage sounds can help you
                        process memories and emotions in a healthy, reflective
                        way.
                      </p>
                    )}
                    {selectedMood === "stressed" && (
                      <p>
                        Therapeutic soundscapes and slow rhythms can help reduce
                        cortisol levels and activate your body's relaxation
                        response.
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Getting Started */}
          {!selectedMood && (
            <Card className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-slate-700">
              <CardContent className="p-8 text-center">
                <Music className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">
                  Ready to Begin Your Musical Journey?
                </h3>
                <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                  Select how you're feeling above, and our AI will analyze your
                  emotional state to recommend the perfect therapeutic music for
                  your current needs.
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-400">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Personalized Recommendations</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Evidence-Based Music Therapy</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Real-time Mood Analysis</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoodMusic;
