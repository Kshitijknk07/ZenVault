import { Star, Quote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "CreativeCorp",
    avatar: "https://i.pravatar.cc/150?img=1",
    content:
      "ZenVault has transformed how we store and share our design assets. The security features give us peace of mind, and the interface is incredibly intuitive.",
    rating: 5,
  },
  {
    name: "Alex Chen",
    role: "IT Security Manager",
    company: "TechSecure",
    avatar: "https://i.pravatar.cc/150?img=3",
    content:
      "As a security professional, I'm impressed with ZenVault's encryption standards. It meets all our compliance requirements while still being user-friendly.",
    rating: 5,
  },
  {
    name: "Michael Brown",
    role: "Freelance Photographer",
    company: "MB Photography",
    avatar: "https://i.pravatar.cc/150?img=12",
    content:
      "I need to know my client photos are protected, and ZenVault delivers. The ability to securely share files with clients has simplified my workflow immensely.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 bg-secondary/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by Professionals Worldwide
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from our users who rely on ZenVault for their secure storage
            needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-background rounded-xl p-6 shadow-sm border border-border/50 relative"
            >
              <Quote className="absolute top-6 right-6 h-8 w-8 text-muted/10" />
              <div className="flex items-center gap-4 mb-4">
                <Avatar>
                  <AvatarImage
                    src={testimonial.avatar}
                    alt={testimonial.name}
                  />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>

              <div className="flex mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              <p className="text-muted-foreground">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
