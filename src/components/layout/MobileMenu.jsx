import { useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { X, Heart, ShoppingBag, Scale, ArrowRight } from 'lucide-react'
import Logo from '../common/Logo'

function MobileMenu({
  open,
  onClose,
  links,
  cartCount = 0,
  wishlistCount = 0,
  compareCount = 0,
}) {
  useEffect(() => {
    if (!open) return

    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  const quickLinks = [
    { label: 'Wishlist', to: '/wishlist', icon: Heart, count: wishlistCount },
    { label: 'Compare', to: '/compare', icon: Scale, count: compareCount },
    { label: 'Cart', to: '/cart', icon: ShoppingBag, count: cartCount },
  ]

  return (
    <div
      className="fixed inset-0 z-50 lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
    >
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className="absolute inset-0 bg-black/70"
      />

      <aside className="absolute right-0 top-0 flex h-full w-[88%] max-w-sm flex-col border-l border-nx-border bg-nx-surface">
        <div className="flex h-16 items-center justify-between border-b border-nx-border px-5">
          <Logo onClick={onClose} />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center rounded-full text-nx-muted transition hover:bg-nx-card hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4" aria-label="Mobile">
          <ul className="space-y-1">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium transition ${
                      isActive
                        ? 'bg-nx-card text-nx-cyan'
                        : 'text-nx-text hover:bg-nx-card'
                    }`
                  }
                >
                  {link.label}
                  <ArrowRight className="h-4 w-4 opacity-60" />
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {quickLinks.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={onClose}
                className="relative flex flex-col items-center gap-2 rounded-xl border border-nx-border bg-nx-card px-2 py-4 text-xs font-medium text-nx-text transition hover:border-nx-cyan"
              >
                <item.icon className="h-5 w-5 text-nx-cyan" />
                {item.label}
                {item.count > 0 && (
                  <span className="absolute right-2 top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-nx-cyan px-1 text-[11px] font-bold text-nx-bg">
                    {item.count}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </nav>

        <p className="border-t border-nx-border p-5 text-xs text-nx-muted">
          NEXORA - Smart Living Store
        </p>
      </aside>
    </div>
  )
}

export default MobileMenu