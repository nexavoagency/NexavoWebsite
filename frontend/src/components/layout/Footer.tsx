import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] border-t border-white/10 py-8 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-3 gradient-text">Nexavo</h3>
            <p className="text-gray-400 text-sm">
              Innovative IT solutions for modern businesses.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li><Link href="/about" className="hover:text-white">About</Link></li>
              <li><Link href="/services" className="hover:text-white">Services</Link></li>
              <li><Link href="/portfolio" className="hover:text-white">Portfolio</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Contact</h4>
            <p className="text-gray-400 text-sm">Email: nexavoagency@gmail.com</p>
            <p className="text-gray-400 text-sm">Phone: 0325 3001794</p>
          </div>
        </div>
        <div className="border-t border-white/10 mt-6 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Nexavo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}