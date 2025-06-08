import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    quote:
      "RepeatHarmony has transformed my daily routine. The personalized therapy suggestions are spot on, and the mood tracking helps me understand myself better.",
    author: "Alicia K.",
    role: "Verified User",
    avatar: "AK",
    rating: 5,
  },
  {
    quote:
      "I never thought an app could make such a difference. The calming music and supportive community have been a lifeline during tough times.",
    author: "Ben S.",
    role: "Community Member",
    avatar: "BS",
    rating: 5,
  },
  {
    quote:
      "As a therapist, I'm impressed by RepeatHarmony's approach. It's an excellent tool for self-reflection and provides valuable insights for users.",
    author: "Dr. Luna V.",
    role: "Mental Health Professional",
    avatar: "LV",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 px-6 bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            What Our Users Say
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Hear from individuals whose lives have been positively impacted by
            RepeatHarmony.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-all duration-300 hover:transform hover:scale-105"
            >
              <CardContent className="p-8">
                {/* Rating Stars */}
                <div className="flex space-x-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-slate-300 text-lg leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="" alt={testimonial.author} />
                    <AvatarFallback className="bg-blue-600 text-white font-semibold">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-white">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-slate-400">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
