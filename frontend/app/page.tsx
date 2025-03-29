export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-4xl w-full">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">ZenVault</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Secure and peaceful storage for your digital assets
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6">About ZenVault</h2>
          <p className="text-lg mb-4">
            ZenVault is a modern, secure solution for storing and managing your
            digital assets. With a focus on simplicity and peace of mind, we
            provide a safe haven for your important files, documents, and
            memories.
          </p>
          <p className="text-lg mb-4">
            Our platform combines cutting-edge security with an intuitive
            interface, making it easy to organize, access, and protect what
            matters most to you.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="text-xl font-medium mb-2">
                End-to-End Encryption
              </h3>
              <p>
                Your data is encrypted before it leaves your device, ensuring
                maximum privacy and security.
              </p>
            </div>
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="text-xl font-medium mb-2">
                Intuitive Organization
              </h3>
              <p>
                Easily categorize and find your files with our smart
                organization system.
              </p>
            </div>
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="text-xl font-medium mb-2">
                Cross-Platform Access
              </h3>
              <p>Access your vault from any device, anywhere, anytime.</p>
            </div>
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="text-xl font-medium mb-2">Automatic Backups</h3>
              <p>
                Never worry about losing important data with our reliable backup
                system.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-auto py-6 text-center text-gray-500">
        <p>© 2023 ZenVault. All rights reserved.</p>
      </footer>
    </div>
  );
}
