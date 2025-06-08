import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCcw, Brain, Music, Users } from "lucide-react";

const features = [
  {
    icon: RotateCcw,
    title: "Intuitive Repeat Tracking",
    description:
      "Log your emotions effortlessly with quick check-ins and mood recognition. Our AI understands your feelings and guides your wellness journey.",
    cta: "Explore Repeat Logs",
    color: "text-blue-400",
  },
  {
    icon: Brain,
    title: "Personalized AI Therapy",
    description:
      "Receive tailored therapeutic suggestions and coaching based on your unique emotional state and wellness goals.",
    cta: "Discover Therapies",
    color: "text-purple-400",
  },
  {
    icon: Music,
    title: "Music for Healing",
    description:
      "Immerse yourself in AI-curated soundscapes and therapeutic music designed to soothe your mind and uplift your spirit.",
    cta: "Find Your Sound",
    color: "text-green-400",
  },
  {
    icon: Users,
    title: "Supportive Community Forum",
    description:
      "Connect with a compassionate community. Share experiences, find certified therapists for shared experiences and mutual support.",
    cta: "Join the Community",
    color: "text-orange-400",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 px-6 bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Key Features of RepeatHarmony
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Discover how RepeatHarmony empowers you to understand and manage
            your emotional well-being through innovative technology and
            compassionate support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card
                key={index}
                className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-all duration-300 hover:transform hover:scale-105 group"
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-4 bg-slate-700 rounded-full w-16 h-16 flex items-center justify-center group-hover:bg-slate-600 transition-colors">
                    <IconComponent className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl font-semibold text-white mb-2">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-slate-400 mb-6 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white transition-all duration-200"
                  >
                    {feature.cta}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
