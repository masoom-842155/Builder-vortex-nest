import { Button } from "@/components/ui/button";

const CtaSection = () => {
  return (
    <section className="py-24 px-6 bg-gradient-to-r from-blue-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
          Start Your Journey to{" "}
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Well-being
          </span>{" "}
          Today
        </h2>

        <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
          Take the first step towards a calmer, more balanced life with
          RepeatHarmony. It's free to get started.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button
            size="lg"
            className="bg-white text-slate-900 hover:bg-slate-100 px-12 py-4 text-xl font-bold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Sign Up Now
          </Button>
        </div>

        <p className="text-sm text-blue-200 mt-8 opacity-80">
          No credit card required • Free forever plan available
        </p>
      </div>
    </section>
  );
};

export default CtaSection;
