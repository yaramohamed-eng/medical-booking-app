import { NavLink, Link } from 'react-router-dom'
import useAppStore from '../stores/useAppStore'

const linkClass = ({ isActive }) =>
  `relative px-4 py-2 text-sm font-medium transition-colors ${
    isActive
      ? 'text-gold-100'
      : 'text-brand-100/80 hover:text-white'
  }`

function NavItem({ to, children }) {
  return (
    <NavLink to={to} className={linkClass}>
      {({ isActive }) => (
        <span className="flex flex-col items-center gap-1">
          {children}
          <span
            className={`h-0.5 w-full rounded-full transition-all ${
              isActive ? 'bg-gold-400' : 'bg-transparent'
            }`}
          />
        </span>
      )}
    </NavLink>
  )
}

export default function Navbar() {
  const theme = useAppStore((s) => s.theme)
  const toggleTheme = useAppStore((s) => s.toggleTheme)
  const favoriteIds = useAppStore((s) => s.favoriteIds)

  return (
    <header className="sticky top-0 z-20 bg-brand-700 shadow-md">
      <nav className="max-w-6xl mx-auto grid grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-3">
        {/* Logo — left */}
        <Link to="/doctors" className="flex items-center gap-2 font-bold text-white whitespace-nowrap">
          <span className="w-9 h-9 rounded-full bg-gold-400 text-brand-900 flex items-center justify-center text-lg">
            +
          </span>
          <span className="hidden sm:inline tracking-wide">MediCare</span>
        </Link>

        {/* Menu — perfectly centered */}
        <div className="flex items-center justify-center gap-2 sm:gap-6">
          <NavItem to="/doctors">Doctors</NavItem>
          <NavItem to="/appointments">My Appointments</NavItem>
          <NavItem to="/favorites">
            <span className="relative flex items-center gap-1">
              <span className="text-gold-300"></span>
              Favorites
              {favoriteIds.length > 0 && (
                <span className="absolute -top-2 -right-3 text-[10px] bg-gold-400 text-brand-900 rounded-full w-4 h-4 flex items-center justify-center">
                  {favoriteIds.length}
                </span>
              )}
            </span>
          </NavItem>
          <NavItem to="/profile">Profile</NavItem>
        </div>

        {/* Theme toggle — right */}
        <div className="flex justify-end">
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-brand-600 text-gold-200 hover:bg-brand-500 transition-colors"
            aria-label="Toggle theme"
            title="Toggle light/dark theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </nav>
    </header>
  )
}
