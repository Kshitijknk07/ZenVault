"use client";

import React from "react";
import Link from "next/link";
import { Logo } from "../icons/Logo";
import { Button } from "../ui/Button";
import { useState } from "react";
import { BackgroundBeams } from "../ui/background-beams";
import { SparklesCore } from "../ui/sparkles";
import { motion } from "framer-motion";

export function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you for subscribing with ${email}!`);
    setEmail("");
  };

  return (
    <footer className="relative overflow-hidden border-t border-border/30 pt-16 pb-10">
      <div className="absolute inset-0 w-full h-full">
        <BackgroundBeams className="opacity-20" />
      </div>

      <div className="absolute inset-0 w-full h-full">
        <SparklesCore
          id="footer-sparkles"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleColor="#ffffff"
          particleDensity={70}
          className="w-full h-full opacity-30"
          speed={0.5}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16 pb-16 border-b border-border/20">
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/30 rounded-full blur-xl group-hover:bg-primary/40 transition-all duration-300"></div>
                <Logo className="w-10 h-10 relative z-10 text-primary" />
              </motion.div>
              <motion.span
                className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                ZenVault
              </motion.span>
            </Link>

            <p className="text-foreground/70 text-sm max-w-md leading-relaxed">
              Secure cloud storage for all your files. ZenVault offers a Google
              Drive-like experience with enhanced privacy, security, and
              organization features to keep your digital life in perfect order.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              {[
                { color: "primary", text: "End-to-end encryption" },
                { color: "accent", text: "Unlimited storage" },
                { color: "secondary", text: "Seamless sharing" },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, x: 3 }}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-${feature.color}/20 flex items-center justify-center`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full bg-${feature.color}`}
                    ></div>
                  </div>
                  <span className="text-sm text-foreground/80">
                    {feature.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <motion.div
              className="bg-gradient-to-br from-background/80 via-background/60 to-background/40 backdrop-blur-md p-6 rounded-xl border border-border/40 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)" }}
            >
              <h3 className="text-lg font-medium mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                Stay updated with ZenVault
              </h3>
              <p className="text-foreground/70 text-sm mb-4">
                Get the latest news, updates, and special offers directly to
                your inbox.
              </p>

              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2.5 rounded-lg bg-background/50 border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm transition-all duration-300 hover:border-primary/50"
                  required
                />
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-primary via-accent to-primary hover:opacity-90 transition-all duration-300 shadow-md"
                >
                  Subscribe
                </Button>
              </form>

              <p className="text-xs text-foreground/50 mt-3">
                By subscribing, you agree to our Privacy Policy and consent to
                receive updates from ZenVault.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
              {[
                { value: "10M+", label: "Users", color: "primary" },
                { value: "99.9%", label: "Uptime", color: "accent" },
                { value: "5PB+", label: "Data Stored", color: "secondary" },
                { value: "190+", label: "Countries", color: "gradient" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-background/60 to-background/30 backdrop-blur-sm p-4 rounded-lg border border-border/30 text-center shadow-sm"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                    borderColor: `var(--${
                      stat.color === "gradient" ? "primary" : stat.color
                    })`,
                  }}
                >
                  <div
                    className={`text-2xl font-bold ${
                      stat.color === "gradient"
                        ? "bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent"
                        : `text-${stat.color}`
                    }`}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs text-foreground/60">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-16">
          {[
            {
              title: "Product",
              links: [
                { href: "#features", label: "Features" },
                { href: "#security", label: "Security" },
                { href: "#pricing", label: "Pricing" },
                { href: "#integrations", label: "Integrations" },
                { href: "#updates", label: "Updates" },
              ],
              color: "primary",
            },
            {
              title: "Solutions",
              links: [
                { href: "#personal", label: "Personal Cloud" },
                { href: "#business", label: "Business" },
                { href: "#enterprise", label: "Enterprise" },
                { href: "#education", label: "Education" },
                { href: "#developers", label: "Developers API" },
              ],
              color: "accent",
            },
            {
              title: "Resources",
              links: [
                { href: "#documentation", label: "Documentation" },
                { href: "#guides", label: "Guides & Tutorials" },
                { href: "#blog", label: "Blog" },
                { href: "#community", label: "Community" },
                { href: "#status", label: "System Status" },
              ],
              color: "secondary",
            },
            {
              title: "Company",
              links: [
                { href: "#about", label: "About Us" },
                { href: "#careers", label: "Careers" },
                { href: "#press", label: "Press" },
                { href: "#contact", label: "Contact" },
                { href: "#partners", label: "Partners" },
              ],
              color: "primary",
            },
            {
              title: "Legal",
              links: [
                { href: "#privacy", label: "Privacy Policy" },
                { href: "#terms", label: "Terms of Service" },
                { href: "#cookies", label: "Cookie Policy" },
                { href: "#compliance", label: "Compliance" },
                { href: "#security-policy", label: "Security Policy" },
              ],
              color: "accent",
            },
          ].map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIndex * 0.1, duration: 0.5 }}
            >
              <h3
                className={`font-medium mb-4 text-${section.color} text-sm uppercase tracking-wider`}
              >
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((item, itemIndex) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: sectionIndex * 0.1 + itemIndex * 0.05,
                      duration: 0.3,
                    }}
                  >
                    <Link
                      href={item.href}
                      className={`text-foreground/60 hover:text-${section.color} transition-all duration-200 text-sm flex items-center gap-1.5 group`}
                    >
                      <motion.span
                        className={`w-1 h-1 rounded-full bg-foreground/30 group-hover:bg-${section.color} group-hover:w-1.5 transition-all duration-300`}
                        whileHover={{ width: 6 }}
                      />
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="flex flex-col md:flex-row gap-6 items-center justify-between p-8 mb-12 bg-gradient-to-r from-primary/5 via-background/80 to-accent/5 rounded-xl border border-border/40 backdrop-blur-md shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          whileHover={{ boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)" }}
        >
          <div className="text-center md:text-left">
            <h3 className="text-xl font-medium mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Get ZenVault on all your devices
            </h3>
            <p className="text-foreground/70 text-sm max-w-md">
              Access your files anywhere, anytime with our mobile and desktop
              apps. Sync across all platforms seamlessly.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            {[
              {
                name: "iOS App",
                icon: (
                  <svg
                    className="w-5 h-5 mr-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.5 3H6.5C5.4 3 4.5 3.9 4.5 5V19C4.5 20.1 5.4 21 6.5 21H17.5C18.6 21 19.5 20.1 19.5 19V5C19.5 3.9 18.6 3 17.5 3ZM12 19C11.2 19 10.5 18.3 10.5 17.5C10.5 16.7 11.2 16 12 16C12.8 16 13.5 16.7 13.5 17.5C13.5 18.3 12.8 19 12 19ZM17.5 15H6.5V5H17.5V15Z"
                      fill="currentColor"
                    />
                  </svg>
                ),
                color: "primary",
              },
              {
                name: "Android App",
                icon: (
                  <svg
                    className="w-5 h-5 mr-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.5 3H6.5C5.4 3 4.5 3.9 4.5 5V19C4.5 20.1 5.4 21 6.5 21H17.5C18.6 21 19.5 20.1 19.5 19V5C19.5 3.9 18.6 3 17.5 3ZM12 19C11.2 19 10.5 18.3 10.5 17.5C10.5 16.7 11.2 16 12 16C12.8 16 13.5 16.7 13.5 17.5C13.5 18.3 12.8 19 12 19ZM17.5 15H6.5V5H17.5V15Z"
                      fill="currentColor"
                    />
                  </svg>
                ),
                color: "accent",
              },
              {
                name: "Desktop App",
                icon: (
                  <svg
                    className="w-5 h-5 mr-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 18H4V6H20V18Z"
                      fill="currentColor"
                    />
                    <path
                      d="M6 8.5H18V10H6V8.5ZM6 11.5H16V13H6V11.5ZM6 14.5H14V16H6V14.5Z"
                      fill="currentColor"
                    />
                  </svg>
                ),
                color: "secondary",
              },
            ].map((app, index) => (
              <motion.div
                key={app.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <Button
                  variant="outline"
                  className={`bg-${app.color}/10 border-${app.color}/30 hover:border-${app.color}/70 hover:bg-${app.color}/20 text-foreground/90 shadow-sm transition-all duration-300`}
                >
                  {app.icon}
                  {app.name}
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="border-t border-border/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <motion.div
            className="flex flex-col md:flex-row items-center gap-4 text-sm text-foreground/60"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-medium">
              © {new Date().getFullYear()} ZenVault. All rights reserved.
            </p>
            <div className="hidden md:flex w-1 h-1 rounded-full bg-primary/50"></div>
            {["Privacy", "Terms", "Cookies"].map((item, index) => (
              <React.Fragment key={item}>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </motion.div>
                {index < 2 && (
                  <div className="hidden md:flex w-1 h-1 rounded-full bg-primary/50"></div>
                )}
              </React.Fragment>
            ))}
          </motion.div>

          <motion.div
            className="flex gap-5 mt-6 md:mt-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {[
              {
                name: "Twitter",
                icon: (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                ),
                color: "primary",
              },
              {
                name: "LinkedIn",
                icon: (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                ),
                color: "accent",
              },
              {
                name: "GitHub",
                icon: (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                ),
                color: "secondary",
              },
              {
                name: "YouTube",
                icon: (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                      clipRule="evenodd"
                    />
                  </svg>
                ),
                color: "primary",
              },
              {
                name: "Discord",
                icon: (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                ),
                color: "accent",
              },
            ].map((item, index) => (
              <motion.div
                key={item.name}
                whileHover={{
                  scale: 1.2,
                  y: -3,
                  color: `var(--${item.color})`,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.2 }}
              >
                <Link
                  href="#"
                  className="text-foreground/60 transition-all duration-300 hover:shadow-lg p-2 rounded-full hover:bg-background/80"
                  aria-label={item.name}
                >
                  {item.icon}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
