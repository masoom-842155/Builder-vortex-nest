import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const HowItWorksSection = () => {
  return (
    <section className="py-24 px-6 bg-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
              How RepeatHarmony Works
            </h2>
            <p className="text-xl text-slate-400 mb-8 leading-relaxed">
              RepeatHarmony simplifies emotional tracking and therapeutic
              guidance. Our advanced AI analyzes your mood input, providing
              personalized insights and recommending strategies to foster mental
              well-being. Experience a journey towards emotional balance.
            </p>
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200"
            >
              View Your Dashboard
            </Button>
          </div>

          {/* Dashboard Preview */}
          <div className="relative">
            <Card className="bg-slate-700 border-slate-600 p-6 shadow-2xl">
              {/* Mock Dashboard */}
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-600 pb-4">
                  <h3 className="text-2xl font-semibold text-white">
                    Your Dashboard
                  </h3>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                </div>

                {/* Mood Chart */}
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-white">
                    Weekly Mood Trends
                  </h4>
                  <div className="bg-slate-600 rounded-lg p-4 h-32 flex items-end justify-center space-x-2">
                    {/* Mock Chart Bars */}
                    {[65, 80, 45, 90, 75, 85, 70].map((height, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center space-y-1"
                      >
                        <div
                          className="bg-gradient-to-t from-blue-600 to-blue-400 rounded-t w-6 transition-all duration-1000"
                          style={{ height: `${height}%` }}
                        ></div>
                        <span className="text-xs text-slate-400">
                          {["M", "T", "W", "T", "F", "S", "S"][index]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-600 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-400">85%</div>
                    <div className="text-sm text-slate-400">Wellness Score</div>
                  </div>
                  <div className="bg-slate-600 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-400">12</div>
                    <div className="text-sm text-slate-400">Days Streak</div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="space-y-3">
                  <h4 className="text-lg font-medium text-white">
                    Recent Activities
                  </h4>
                  <div className="space-y-2">
                    {[
                      {
                        activity: "Meditation Session",
                        time: "2 hours ago",
                        color: "bg-purple-500",
                      },
                      {
                        activity: "Mood Check-in",
                        time: "4 hours ago",
                        color: "bg-blue-500",
                      },
                      {
                        activity: "Therapy Session",
                        time: "1 day ago",
                        color: "bg-green-500",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 bg-slate-600 rounded p-3"
                      >
                        <div
                          className={`w-3 h-3 rounded-full ${item.color}`}
                        ></div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-white">
                            {item.activity}
                          </div>
                          <div className="text-xs text-slate-400">
                            {item.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500 rounded-full opacity-20 blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500 rounded-full opacity-20 blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
