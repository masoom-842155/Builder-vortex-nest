import { useState, useEffect, useRef } from "react";
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
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Heart,
  Music,
  Brain,
  Headphones,
  Volume2,
  VolumeX,
  Shuffle,
  Repeat,
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
      audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    },
    {
      title: "Joy Waves",
      artist: "Positive Vibes Collective",
      duration: "4:12",
      genre: "Feel-Good Electronic",
      audioUrl:
        "https://actions.google.com/sounds/v1/alarms/medium_bell_ringing_near.ogg",
    },
    {
      title: "Bright Morning",
      artist: "Sunshine Orchestra",
      duration: "2:58",
      genre: "Upbeat Instrumental",
      audioUrl: "https://actions.google.com/sounds/v1/alarms/bugle_tune.ogg",
    },
  ],
  sad: [
    {
      title: "Gentle Rain",
      artist: "Melancholy Sounds",
      duration: "5:43",
      genre: "Ambient Sad",
      audioUrl:
        "https://actions.google.com/sounds/v1/weather/rain_on_concrete.ogg",
    },
    {
      title: "Quiet Reflection",
      artist: "Somber Piano",
      duration: "4:28",
      genre: "Emotional Piano",
      audioUrl:
        "https://actions.google.com/sounds/v1/instruments/piano_chords_1.ogg",
    },
    {
      title: "Healing Tears",
      artist: "Therapeutic Strings",
      duration: "6:15",
      genre: "Cathartic Classical",
      audioUrl:
        "https://actions.google.com/sounds/v1/instruments/violin_c5_scale_trill.ogg",
    },
  ],
  anxious: [
    {
      title: "Breathing Space",
      artist: "Anxiety Relief",
      duration: "8:30",
      genre: "Calming Meditation",
      audioUrl:
        "https://actions.google.com/sounds/v1/water/water_bubbling_and_dripping_into_pool.ogg",
    },
    {
      title: "Safe Harbor",
      artist: "Peaceful Mind",
      duration: "5:45",
      genre: "Grounding Ambient",
      audioUrl:
        "https://actions.google.com/sounds/v1/ambiences/forest_birds_chirping.ogg",
    },
    {
      title: "Steady Heartbeat",
      artist: "Rhythmic Therapy",
      duration: "7:20",
      genre: "Stabilizing Sounds",
      audioUrl:
        "https://actions.google.com/sounds/v1/clock/grandfather_clock_ticking.ogg",
    },
  ],
  calm: [
    {
      title: "Ocean Whispers",
      artist: "Tranquil Waves",
      duration: "10:15",
      genre: "Nature Sounds",
      audioUrl:
        "https://actions.google.com/sounds/v1/water/ocean_waves_crashing.ogg",
    },
    {
      title: "Moonlight Meditation",
      artist: "Zen Garden",
      duration: "12:30",
      genre: "Meditation Music",
      audioUrl: "https://actions.google.com/sounds/v1/zen/meditation_bell.ogg",
    },
    {
      title: "Peaceful Valley",
      artist: "Serenity Composers",
      duration: "8:45",
      genre: "Ambient Peace",
      audioUrl:
        "https://actions.google.com/sounds/v1/ambiences/wind_through_trees.ogg",
    },
  ],
  energetic: [
    {
      title: "Power Surge",
      artist: "High Energy Collective",
      duration: "3:28",
      genre: "Motivational EDM",
      audioUrl:
        "https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg",
    },
    {
      title: "Mountain Climb",
      artist: "Achievement Sounds",
      duration: "4:15",
      genre: "Epic Orchestral",
      audioUrl:
        "https://actions.google.com/sounds/v1/instruments/trumpet_fanfare.ogg",
    },
    {
      title: "Lightning Strike",
      artist: "Dynamic Beats",
      duration: "3:52",
      genre: "High-Tempo Electronic",
      audioUrl:
        "https://actions.google.com/sounds/v1/weather/thunder_crack.ogg",
    },
  ],
  focused: [
    {
      title: "Deep Concentration",
      artist: "Focus Flow",
      duration: "45:00",
      genre: "Study Music",
      audioUrl:
        "https://actions.google.com/sounds/v1/water/water_drops_onto_hard_surface.ogg",
    },
    {
      title: "Mental Clarity",
      artist: "Cognitive Enhancers",
      duration: "30:22",
      genre: "Binaural Beats",
      audioUrl: "https://actions.google.com/sounds/v1/zen/soft_bells.ogg",
    },
    {
      title: "Productivity Zone",
      artist: "Work Flow Sounds",
      duration: "25:15",
      genre: "Lo-Fi Focus",
      audioUrl:
        "https://actions.google.com/sounds/v1/clock/wall_clock_ticking.ogg",
    },
  ],
  nostalgic: [
    {
      title: "Memory Lane",
      artist: "Vintage Hearts",
      duration: "4:33",
      genre: "Nostalgic Pop",
      audioUrl:
        "https://actions.google.com/sounds/v1/instruments/music_box_arpeggio_01.ogg",
    },
    {
      title: "Golden Hour",
      artist: "Yesterday's Dreams",
      duration: "5:20",
      genre: "Retro Ambient",
      audioUrl:
        "https://actions.google.com/sounds/v1/instruments/piano_lonesome_melody.ogg",
    },
    {
      title: "Old Photograph",
      artist: "Sentimental Journey",
      duration: "3:47",
      genre: "Vintage Instrumental",
      audioUrl:
        "https://actions.google.com/sounds/v1/instruments/acoustic_guitar_picking_melody.ogg",
    },
  ],
  stressed: [
    {
      title: "Tension Release",
      artist: "Stress Relief Therapy",
      duration: "15:30",
      genre: "Stress Relief",
      audioUrl:
        "https://actions.google.com/sounds/v1/water/stream_over_rocks.ogg",
    },
    {
      title: "Pressure Valve",
      artist: "Decompression Suite",
      duration: "12:45",
      genre: "Therapeutic Ambient",
      audioUrl: "https://actions.google.com/sounds/v1/zen/temple_bells.ogg",
    },
    {
      title: "Unwinding Hour",
      artist: "Relaxation Masters",
      duration: "20:00",
      genre: "Deep Relaxation",
      audioUrl: "https://actions.google.com/sounds/v1/ambiences/soft_rain.ogg",
    },
  ],
};

interface PlaylistState {
  currentSong: any | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  previousVolume: number;
  isMuted: boolean;
  isShuffled: boolean;
  isRepeating: boolean;
}

const MoodMusic = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [moodConfidence, setMoodConfidence] = useState(0);
  const [likedSongs, setLikedSongs] = useState<Set<string>>(new Set());
  const [playlist, setPlaylist] = useState<PlaylistState>({
    currentSong: null,
    isPlaying: false,
    currentTime: 0,
    duration: 180, // 3 minutes default
    volume: 75,
    previousVolume: 75,
    isMuted: false,
    isShuffled: false,
    isRepeating: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();
  const audioRef = useRef<HTMLAudioElement>(null);

  // Real audio progress tracking
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setPlaylist((prev) => ({
        ...prev,
        currentTime: Math.floor(audio.currentTime),
        duration: Math.floor(audio.duration) || prev.duration,
      }));
    };

    const handleLoadedMetadata = () => {
      setPlaylist((prev) => ({
        ...prev,
        duration: Math.floor(audio.duration),
      }));
      setIsLoading(false);
    };

    const handleEnded = () => {
      setPlaylist((prev) => ({
        ...prev,
        isPlaying: false,
        currentTime: 0,
      }));

      // Auto-play next song if not repeating
      if (!playlist.isRepeating) {
        setTimeout(() => skipToNext(), 500);
      } else {
        // Restart the current song
        audio.currentTime = 0;
        setPlaylist((prev) => ({
          ...prev,
          isPlaying: true,
          currentTime: 0,
        }));
        audio.play();
      }
    };

    const handleCanPlay = () => {
      setIsLoading(false);
    };

    const handleWaiting = () => {
      setIsLoading(true);
    };

    const handleError = () => {
      setIsLoading(false);
      setTimeout(() => {
        toast({
          title: "Audio Error",
          description: "Failed to load audio. Trying next song...",
          variant: "destructive",
        });
      }, 0);
      setTimeout(() => skipToNext(), 1000);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("waiting", handleWaiting);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("waiting", handleWaiting);
      audio.removeEventListener("error", handleError);
    };
  }, [playlist.currentSong]);

  // Sync audio volume with state
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = playlist.volume / 100;
    }
  }, [playlist.volume]);

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
          // Use setTimeout to avoid setState during render
          setTimeout(() => {
            toast({
              title: "Mood Analysis Complete!",
              description: `Perfect music recommendations for your ${moodOptions.find((m) => m.id === moodId)?.label} mood.`,
            });
          }, 0);
          return 95;
        }
        return prev + 5;
      });
    }, 100);
  };

  const togglePlay = async (song: any) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playlist.currentSong?.title === song.title) {
      // Toggle play/pause for current song
      if (playlist.isPlaying) {
        audio.pause();
        setPlaylist((prev) => ({ ...prev, isPlaying: false }));
      } else {
        setIsLoading(true);
        try {
          await audio.play();
          setPlaylist((prev) => ({ ...prev, isPlaying: true }));
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          setTimeout(() => {
            toast({
              title: "Playback Error",
              description: "Unable to play audio. Please try again.",
              variant: "destructive",
            });
          }, 0);
        }
      }
    } else {
      // Play new song
      setIsLoading(true);
      setPlaylist((prev) => ({
        ...prev,
        currentSong: song,
        isPlaying: false,
        currentTime: 0,
        duration:
          parseInt(song.duration.split(":")[0]) * 60 +
          parseInt(song.duration.split(":")[1]),
      }));

      audio.src = song.audioUrl;
      audio.load();

      try {
        await audio.play();
        setPlaylist((prev) => ({ ...prev, isPlaying: true }));
        setTimeout(() => {
          toast({
            title: "Now Playing",
            description: `${song.title} by ${song.artist}`,
          });
        }, 0);
      } catch (error) {
        setIsLoading(false);
        setTimeout(() => {
          toast({
            title: "Playback Error",
            description: "Unable to play audio. Please check your connection.",
            variant: "destructive",
          });
        }, 0);
      }
    }
  };

  const toggleLike = (songTitle: string) => {
    setLikedSongs((prev) => {
      const newSet = new Set(prev);
      const isRemoving = newSet.has(songTitle);

      if (isRemoving) {
        newSet.delete(songTitle);
      } else {
        newSet.add(songTitle);
      }

      // Use setTimeout to avoid setState during render
      setTimeout(() => {
        toast({
          title: isRemoving ? "Removed from favorites" : "Added to favorites",
          description: isRemoving
            ? "Song removed from your liked music."
            : "Song added to your liked music.",
        });
      }, 0);

      return newSet;
    });
  };

  const skipToNext = () => {
    if (!selectedMood) return;
    const currentPlaylist =
      musicRecommendations[selectedMood as keyof typeof musicRecommendations];
    const currentIndex = currentPlaylist.findIndex(
      (song) => song.title === playlist.currentSong?.title,
    );
    let nextIndex;

    if (playlist.isShuffled) {
      // Random next song (excluding current)
      const availableIndices = currentPlaylist
        .map((_, index) => index)
        .filter((index) => index !== currentIndex);
      nextIndex =
        availableIndices[Math.floor(Math.random() * availableIndices.length)];
    } else {
      nextIndex = (currentIndex + 1) % currentPlaylist.length;
    }

    togglePlay(currentPlaylist[nextIndex]);
  };

  const skipToPrevious = () => {
    if (!selectedMood) return;
    const audio = audioRef.current;

    // If more than 3 seconds into the song, restart it
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0;
      setPlaylist((prev) => ({ ...prev, currentTime: 0 }));
      return;
    }

    const currentPlaylist =
      musicRecommendations[selectedMood as keyof typeof musicRecommendations];
    const currentIndex = currentPlaylist.findIndex(
      (song) => song.title === playlist.currentSong?.title,
    );
    const prevIndex =
      currentIndex <= 0 ? currentPlaylist.length - 1 : currentIndex - 1;
    togglePlay(currentPlaylist[prevIndex]);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const toggleMute = () => {
    setPlaylist((prev) => {
      if (prev.isMuted) {
        // Unmute: restore previous volume
        return {
          ...prev,
          volume: prev.previousVolume,
          isMuted: false,
        };
      } else {
        // Mute: save current volume and set to 0
        return {
          ...prev,
          previousVolume: prev.volume,
          volume: 0,
          isMuted: true,
        };
      }
    });
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setPlaylist((prev) => ({
      ...prev,
      volume: newVolume,
      isMuted: newVolume === 0,
      previousVolume: newVolume > 0 ? newVolume : prev.previousVolume,
    }));
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

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        preload="metadata"
        crossOrigin="anonymous"
        style={{ display: "none" }}
      />

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

          {/* Music Player */}
          {playlist.currentSong && (
            <Card className="bg-slate-800 border-slate-700 mb-8">
              <CardContent className="p-6">
                <div className="flex items-center space-x-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                    <Music className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white">
                      {playlist.currentSong.title}
                    </h3>
                    <p className="text-slate-400">
                      {playlist.currentSong.artist}
                    </p>
                    <div className="flex items-center space-x-4 mt-4">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={skipToPrevious}
                        className="text-slate-400 hover:text-white"
                      >
                        <SkipBack className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => togglePlay(playlist.currentSong)}
                        className="bg-blue-600 hover:bg-blue-700"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : playlist.isPlaying ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={skipToNext}
                        className="text-slate-400 hover:text-white"
                      >
                        <SkipForward className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          setPlaylist((prev) => ({
                            ...prev,
                            isShuffled: !prev.isShuffled,
                          }))
                        }
                        className={`${playlist.isShuffled ? "text-blue-400" : "text-slate-400"} hover:text-white`}
                      >
                        <Shuffle className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          setPlaylist((prev) => ({
                            ...prev,
                            isRepeating: !prev.isRepeating,
                          }))
                        }
                        className={`${playlist.isRepeating ? "text-blue-400" : "text-slate-400"} hover:text-white`}
                      >
                        <Repeat className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={toggleMute}
                      className="text-slate-400 hover:text-white p-1"
                    >
                      {playlist.isMuted || playlist.volume === 0 ? (
                        <VolumeX className="w-4 h-4" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </Button>
                    <Slider
                      value={[playlist.volume]}
                      onValueChange={handleVolumeChange}
                      max={100}
                      step={1}
                      className="w-24"
                    />
                    <span className="text-xs text-slate-400 w-8 text-right">
                      {Math.round(playlist.volume)}%
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-slate-400 mb-2">
                    <span>{formatTime(playlist.currentTime)}</span>
                    <span>{formatTime(playlist.duration)}</span>
                  </div>
                  <Progress
                    value={(playlist.currentTime / playlist.duration) * 100}
                    className="h-2 cursor-pointer"
                    onClick={(e) => {
                      const audio = audioRef.current;
                      if (audio && playlist.duration > 0) {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const clickX = e.clientX - rect.left;
                        const newTime =
                          (clickX / rect.width) * playlist.duration;
                        audio.currentTime = newTime;
                        setPlaylist((prev) => ({
                          ...prev,
                          currentTime: Math.floor(newTime),
                        }));
                      }
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          )}

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
                          onClick={() => toggleLike(song.title)}
                          className={`${likedSongs.has(song.title) ? "text-red-400" : "text-slate-400"} hover:text-red-400`}
                        >
                          <Heart
                            className={`w-4 h-4 ${likedSongs.has(song.title) ? "fill-current" : ""}`}
                          />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 text-sm">
                          {song.duration}
                        </span>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            onClick={() => togglePlay(song)}
                            className={`${
                              playlist.currentSong?.title === song.title &&
                              playlist.isPlaying
                                ? "bg-red-600 hover:bg-red-700"
                                : "bg-blue-600 hover:bg-blue-700"
                            } text-white`}
                          >
                            {playlist.currentSong?.title === song.title &&
                            playlist.isPlaying ? (
                              <Pause className="w-4 h-4" />
                            ) : (
                              <Play className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      {playlist.currentSong?.title === song.title && (
                        <div className="mt-4 pt-4 border-t border-slate-700">
                          <div className="flex items-center space-x-3">
                            <Headphones className="w-4 h-4 text-blue-400" />
                            <div className="flex-1">
                              <div className="w-full bg-slate-700 rounded-full h-1">
                                <div
                                  className="bg-blue-500 h-1 rounded-full transition-all duration-1000"
                                  style={{
                                    width: `${(playlist.currentTime / playlist.duration) * 100}%`,
                                  }}
                                ></div>
                              </div>
                            </div>
                            <span className="text-xs text-slate-400">
                              {formatTime(playlist.currentTime)} /{" "}
                              {song.duration}
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
