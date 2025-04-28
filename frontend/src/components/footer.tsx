const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-gray-100">
      <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
        <p>© {currentYear} FileVault. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
