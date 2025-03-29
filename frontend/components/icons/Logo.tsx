import { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="4" width="18" height="16" rx="2" ry="2"></rect>
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M12 9v-2"></path>
      <path d="M12 15v2"></path>
      <path d="M9 12h-2"></path>
      <path d="M15 12h2"></path>
    </svg>
  );
}
