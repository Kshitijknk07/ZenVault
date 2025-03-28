import { Container } from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";

export const Testimonials = () => {
  const testimonials = [
    {
      quote:
        "ZenVault has completely transformed how I store and share files. The security features give me peace of mind that my data is safe.",
      author: "Sarah Johnson",
      role: "Marketing Director",
      avatar: "SJ",
    },
    {
      quote:
        "As a freelancer, I need reliable access to my files from anywhere. ZenVault makes this seamless across all my devices.",
      author: "Michael Chen",
      role: "Graphic Designer",
      avatar: "MC",
    },
    {
      quote:
        "The collaboration features are outstanding. My team can work together on projects without any hassle or confusion.",
      author: "Emily Rodriguez",
      role: "Project Manager",
      avatar: "ER",
    },
    {
      quote:
        "I've tried many cloud storage solutions, but ZenVault offers the best balance of security, ease of use, and features.",
      author: "David Kim",
      role: "Software Engineer",
      avatar: "DK",
    },
  ];

  return (
    <section className="w-full py-24 bg-muted/30">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Thousands of individuals and businesses trust ZenVault for their
            file storage needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border-border/50 bg-card/50 backdrop-blur-sm"
            >
              <CardContent className="p-8">
                <div className="flex flex-col h-full">
                  <div className="mb-6">
                    <svg
                      className="h-8 w-8 text-primary/40"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <p className="text-lg mb-6 flex-grow">{testimonial.quote}</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                      {testimonial.avatar}
                    </div>
                    <div className="ml-4">
                      <p className="font-medium">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};
