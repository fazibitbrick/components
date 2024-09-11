import Link from 'next/link';
import { Home, CheckSquare, Users, User } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <nav className="fixed bottom-0 w-full bg-black bg-opacity-50 backdrop-blur-lg shadow-lg p-4">
      <div className="flex justify-around">
        <NavItem href="/" icon={<Home />} label="Home" />
        <NavItem href="/task" icon={<CheckSquare />} label="Task" />
        <NavItem href="/referral" icon={<Users />} label="Referral" />
        <NavItem href="/profile" icon={<User />} label="Profile" />
      </div>
    </nav>
  );
};

const NavItem = ({ href, icon, label }) => (
  <Link href={href} passHref>
    <motion
      whileTap={{ scale: 0.9 }} // Tap effect
      className="flex flex-col items-center justify-center text-white"
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </motion>
  </Link>
);

export default Navbar;
