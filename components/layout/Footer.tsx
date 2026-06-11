import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-darker border-t border-white/10 py-12">
      <div className="container-1200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <img
              src="/logo.png"
              alt="ClothReady"
              className="h-9 mb-4"
              style={{  }}
            />
            <p className="text-sm text-gray-custom leading-relaxed">
              B2B fitness wear and streetwear manufacturer. Direct factory in Guangzhou, China.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-custom">
              <li><Link href="/products" className="hover:text-white">Products</Link></li>
              <li><Link href="/about" className="hover:text-white">About</Link></li>
              <li><Link href="/sample-order" className="hover:text-white">Sample Order</Link></li>
              <li><Link href="/tracking" className="hover:text-white">Track Order</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-3">Services</h4>
            <ul className="space-y-2 text-sm text-gray-custom">
              <li>Custom Manufacturing</li>
              <li>Private Label</li>
              <li>OEM/ODM</li>
              <li>Tech Pack Development</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-custom">
              <li>info@clothready.com</li>
              <li>+86 134-1204-4008</li>
              <li>WeChat & WhatsApp</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-xs text-gray-custom">
            &copy; 2026 ClothReady. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
