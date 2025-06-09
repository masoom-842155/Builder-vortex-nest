import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import HeaderSection from "@/components/sections/HeaderSection";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CtaSection from "@/components/sections/CtaSection";
import FooterSection from "@/components/sections/FooterSection";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleGetStarted = async () => {
    setIsLoading(true);

    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Welcome to RepeatHarmony!",
        description: "Let's start your mental wellness journey.",
      });
      navigate("/mood-input");
    }, 1500);
  };

  const handleLearnMore = () => {
    // Smooth scroll to features section
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }

    toast({
      title: "Learn about our features",
      description:
        "Discover how RepeatHarmony can help improve your mental wellness.",
    });
  };

  const handleFeatureExplore = (featureType: string) => {
    switch (featureType) {
      case "mood-tracking":
        navigate("/mood-input");
        break;
      case "ai-therapy":
        navigate("/therapy");
        break;
      case "music-healing":
        navigate("/mood-music");
        break;
      case "community":
        navigate("/forum");
        break;
      default:
        navigate("/dashboard");
    }

    setTimeout(() => {
      toast({
        title: "Feature Access",
        description: `Exploring ${featureType.replace("-", " ")} features.`,
      });
    }, 0);
  };

  const handleDashboardView = () => {
    navigate("/dashboard");
    setTimeout(() => {
      toast({
        title: "Dashboard Preview",
        description: "View your wellness analytics and progress.",
      });
    }, 0);
  };

  const handleNewsletterSignup = (email: string) => {
    if (email) {
      setTimeout(() => {
        toast({
          title: "Newsletter Subscription",
          description: "Thank you for subscribing to RepeatHarmony updates!",
        });
      }, 0);
      return true;
    }
    return false;
  };

  const handleTestimonialClick = (author: string) => {
    setTimeout(() => {
      toast({
        title: "User Testimonial",
        description: `Read more success stories from ${author} and others.`,
      });
    }, 0);
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <HeaderSection />
      <HeroSection
        onGetStarted={handleGetStarted}
        onLearnMore={handleLearnMore}
        isLoading={isLoading}
      />
      <FeaturesSection onFeatureExplore={handleFeatureExplore} />
      <HowItWorksSection onViewDashboard={handleDashboardView} />
      <TestimonialsSection onTestimonialClick={handleTestimonialClick} />
      <CtaSection onGetStarted={handleGetStarted} isLoading={isLoading} />
      <FooterSection onNewsletterSignup={handleNewsletterSignup} />
    </div>
  );
};

export default Index;
