import { useCallback, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Search, Heart, ShoppingBag, Scale, Menu } from 'lucide-react'
import Logo from '../common/Logo'
import MobileMenu from './MobileMenu'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { useCompare } from '../../context/CompareContext'

const links = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

function IconLink({ to, label, count = 0, children }) {
  return (
    <Link
      to={to}
      aria-label={count > 0 ? `${label} (${count})` : label}
      title={label}
      className="relative flex h-10 w-10 items-center justify-center rounded-full text-nx-muted transition hover:bg-nx-card hover:text-white"
    >
      {children}
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-nx-cyan px-1 text-[11px] font-bold text-nx-bg">
          {count}
        </span>
      )}
    </Link>
  )
}

function SearchForm({ value, onChange, onSubmit, className = '', autoFocus = false }) {
  return (
    <form onSubmit={onSubmit} role="search" className={`relative ${className}`}>
      <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-nx-muted" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search smart devices..."
        aria-label="Search products"
        autoFocus={autoFocus}
        className="h-10 w-full rounded-full border border-nx-border bg-nx-surface pl-10 pr-4 text-sm text-white placeholder:text-nx-muted focus:border-nx-cyan focus:outline-none"
      />
    </form>
  )
}

function Navbar() {
  const navigate = useNavigate()
  const { cartCount } = useCart()
  const { wishlistCount } = useWishlist()
  const { compareCount } = useCompare()

  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  const handleSearch = (e) => {
    e.preventDefault()
    const q = query.trim()
    navigate(q ? `/shop?q=${encodeURIComponent(q)}` : '/shop')
    setSearchOpen(false)
  }

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-nx-border bg-nx-bg/85 backdrop-blur-xl">
        <div className="nx-container flex h-16 items-center justify-between gap-4 lg:h-20">
          <Logo />

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? 'bg-nx-card text-nx-cyan'
                      : 'text-nx-muted hover:text-white'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <SearchForm
              value={query}
              onChange={setQuery}
              onSubmit={handleSearch}
              className="hidden w-64 xl:block"
            />

            <button
              type="button"
              onClick={() => setSearchOpen((open) => !open)}
              aria-label="Search"
              className="flex h-10 w-10 items-center justify-center rounded-full text-nx-muted transition hover:bg-nx-card hover:text-white xl:hidden"
            >
              <Search className="h-5 w-5" />
            </button>

            <div className="hidden sm:block">
              <IconLink to="/compare" label="Compare" count={compareCount}>
                <Scale className="h-5 w-5" />
              </IconLink>
            </div>

            <IconLink to="/wishlist" label="Wishlist" count={wishlistCount}>
              <Heart className="h-5 w-5" />
            </IconLink>

            <IconLink to="/cart" label="Cart" count={cartCount}>
              <ShoppingBag className="h-5 w-5" />
            </IconLink>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="flex h-10 w-10 items-center justify-center rounded-full text-white transition hover:bg-nx-card lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="border-t border-nx-border py-3 xl:hidden">
            <div className="nx-container">
              <SearchForm
                value={query}
                onChange={setQuery}
                onSubmit={handleSearch}
                autoFocus
              />
            </div>
          </div>
        )}
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={closeMenu}
        links={links}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        compareCount={compareCount}
      />
    </>
  )
}

export default Navbar