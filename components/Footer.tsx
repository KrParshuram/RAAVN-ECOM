export default function Footer() {
  return (
    <footer className="py-6 mt-auto bg-black text-gray-100">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
        {/* Social Links */}
        <div className="text-center md:text-left">
          <p className="font-medium">Follow us on:</p>
          <div className="flex gap-4 mt-2 justify-center md:justify-start">
            <a href="#" className="hover:text-primary">Facebook</a>
            <a href="#" className="hover:text-primary">Twitter</a>
            <a href="#" className="hover:text-primary">Instagram</a>
          </div>
        </div>

        {/* Contact + Copyright */}
        <div className="text-center md:text-right">
          <p>Contact us: support@myshop.com</p>
          <p className="mt-2">© {new Date().getFullYear()} MyShop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
