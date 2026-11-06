import { Link } from 'react-router-dom'
import Logo from '../common/Logo'
import { categories } from '../../data/categories'

const accountLinks = [
  { label: 'Cart', to: '/cart' },
  { label: 'Wishlist', to: '/wishlist' },
  { label: 'Compare', to: '/compare' },
  { label: 'Checkout', to: '/checkout' },
]

const companyLinks = [
  { label: 'About us', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

function FooterColumn({ title, children }) {
  return (
    <div>
      <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
        {title}
      </h3>
      <ul className="mt-5 space-y-3">{children}</ul>
    </div>
  )
}

function FooterLink({ to, children }) {
  return (
    <li>
      <Link
        to={to}
        className="text-sm text-nx-muted transition hover:text-nx-cyan"
      >
        {children}
      </Link>
    </li>
  )
}

function Footer() {
  return (
    <footer className="border-t border-nx-border bg-nx-surface">
      <div className="nx-container py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-nx-muted">
              Premium smart home devices that are simple to set up and a joy to
              live with.
            </p>
            <p className="mt-4 text-xs text-nx-muted">
              Free shipping over $99 · 30-day returns
            </p>
          </div>

          <FooterColumn title="Shop">
            {categories.map((category) => (
              <FooterLink
                key={category.slug}
                to={`/shop?category=${category.slug}`}
              >
                {category.name}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="My Account">
            {accountLinks.map((link) => (
              <FooterLink key={link.to} to={link.to}>
                {link.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Company">
            {companyLinks.map((link) => (
              <FooterLink key={link.to} to={link.to}>
                {link.label}
              </FooterLink>
            ))}
          </FooterColumn>
        </div>
      </div>

      <div className="border-t border-nx-border">
        <div className="nx-container flex flex-col items-center justify-between gap-2 py-6 text-xs text-nx-muted sm:flex-row">
          <p>© {new Date().getFullYear()} NEXORA. All rights reserved.</p>
          <p>NEXORA · Smart Living Store</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer