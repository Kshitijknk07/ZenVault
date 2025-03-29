export function Testimonials() {
  const testimonials = [
    {
      quote:
        "ZenVault has completely transformed how I store and manage my sensitive documents. The security features are top-notch, and the interface is incredibly intuitive.",
      author: "Sarah Johnson",
      title: "Freelance Designer",
      avatar: "SJ",
    },
    {
      quote:
        "As a small business owner, data security is paramount. ZenVault provides the peace of mind I need with their end-to-end encryption and reliable backup system.",
      author: "Michael Chen",
      title: "CEO, TechStart Inc.",
      avatar: "MC",
    },
    {
      quote:
        "The cross-platform access is a game-changer. I can securely access my files from any device, which has made my workflow so much more efficient.",
      author: "Emily Rodriguez",
      title: "Marketing Director",
      avatar: "ER",
    },
    {
      quote:
        "I've tried many secure storage solutions, but ZenVault stands out with its combination of security, ease of use, and powerful features. Highly recommended!",
      author: "David Kim",
      title: "Software Engineer",
      avatar: "DK",
    },
  ];

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background -z-10"></div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block">
            <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-secondary/10 text-secondary mb-4">
              Testimonials
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">
            What Our Users Say
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our users have to say
            about ZenVault.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="glass rounded-xl p-8 relative">
              <div className="mb-6">
                <svg
                  className="h-8 w-8 text-primary/40"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
              </div>
              <p className="text-lg mb-6">{testimonial.quote}</p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-medium">
                  {testimonial.avatar}
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">{testimonial.author}</h4>
                  <p className="text-sm text-foreground/70">
                    {testimonial.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
