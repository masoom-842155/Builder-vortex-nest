import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Animated background waves */}
      <div className="absolute inset-0 z-0">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1440 800"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient
              id="wave-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
              <stop offset="50%" stopColor="rgba(147, 197, 253, 0.2)" />
              <stop offset="100%" stopColor="rgba(219, 234, 254, 0.1)" />
            </linearGradient>
          </defs>
          <path
            d="M0,400 C320,300 420,600 1440,400 L1440,800 L0,800 Z"
            fill="url(#wave-gradient)"
            className="animate-pulse"
          />
          <path
            d="M0,500 C360,350 440,650 1440,500 L1440,800 L0,800 Z"
            fill="rgba(59, 130, 246, 0.2)"
            className="animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <path
            d="M0,600 C400,450 480,700 1440,600 L1440,800 L0,800 Z"
            fill="rgba(147, 197, 253, 0.1)"
            className="animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight">
          Find Your Inner{" "}
          <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Calm
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
          RepeatHarmony is your personal AI-powered mental health companion.
          Track emotions, get personalized therapy, and find peace through
          guided experiences.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            Get Started
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-blue-300 text-blue-100 hover:bg-blue-600 hover:text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200"
          >
            Learn More
          </Button>
        </div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 z-5">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
