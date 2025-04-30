import { GalleryVerticalEnd } from "lucide-react";

import { LoginForm } from "@/components/AuthPage/LoginForm";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 bg-[#2c2c2e]">
      <div className="flex flex-col gap-4 p-6 md:p-10 bg-[#2c2c2e] text-white">
        <div className="flex justify-center gap-2 md:justify-start">
          <a
            href="#"
            className="flex items-center gap-2 font-medium text-white"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#3b82f6] text-white">
              <GalleryVerticalEnd className="size-4" />
            </div>
            <span className="text-xl">
              <span className="text-[#3b82f6]">Zen</span>Vault
            </span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-[#2c2c2e] lg:block">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-[#3b82f6]/30 blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-[#3b82f6]/20 blur-3xl"></div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="max-w-md text-center">
            <div className="inline-flex items-center bg-[#3b82f6]/10 px-4 py-2 rounded-full mb-6 border border-[#3b82f6]/20">
              <span className="text-sm text-white">Secure File Storage</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Your files deserve the best protection
            </h2>
            <p className="text-white/70 mb-6">
              ZenVault provides military-grade encryption and intuitive file
              management for all your important documents.
            </p>

            <div className="space-y-6">
              <div className="bg-[#3b82f6]/5 border border-[#3b82f6]/10 rounded-lg p-4">
                <h3 className="text-xl font-semibold text-white mb-2">
                  End-to-End Encryption
                </h3>
                <p className="text-white/70 text-sm">
                  Your files are encrypted before they leave your device and can
                  only be decrypted by you or your authorized recipients.
                </p>
              </div>

              <div className="bg-[#3b82f6]/5 border border-[#3b82f6]/10 rounded-lg p-4">
                <h3 className="text-xl font-semibold text-white mb-2">
                  Access Anywhere
                </h3>
                <p className="text-white/70 text-sm">
                  Seamlessly access your files from any device with our
                  responsive web app, iOS and Android mobile apps.
                </p>
              </div>

              <div className="bg-[#3b82f6]/5 border border-[#3b82f6]/10 rounded-lg p-4">
                <h3 className="text-xl font-semibold text-white mb-2">
                  Advanced Sharing
                </h3>
                <p className="text-white/70 text-sm">
                  Share files securely with customizable permissions, password
                  protection, and expiration dates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
