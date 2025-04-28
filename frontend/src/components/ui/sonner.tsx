import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

// Define and export the missing types
export type ToastActionElement = React.ReactNode; // Example definition
export type ToastProps = {
  theme?: string;
  className?: string;
  style?: React.CSSProperties;
  // Add other properties as needed
};

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
