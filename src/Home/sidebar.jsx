import { motion } from 'framer-motion'
import {
	Briefcase,
	Building,
	Home,
	ListOrdered,
	Menu,
	Moon,
	Store,
	Sun,
	X,
} from 'lucide-react'
import { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

const navItems = [
	{ name: 'Xalq', icon: <Home size={20} />, path: '/xalq' },
	{ name: 'Optom', icon: <Store size={20} />, path: '/optom' },
	{ name: 'Firmalar', icon: <Building size={20} />, path: '/firmalar' },
	{ name: "Ro'yxat", icon: <ListOrdered size={20} />, path: '/royxat' },
	{ name: 'Ishlar', icon: <Briefcase size={20} />, path: '/ishlar' },
]

export default function Sidebar() {
	const [isOpen, setIsOpen] = useState(false)
	const [dark, setDark] = useState(false)
	const location = useLocation()

	// useEffect(() => {
	// 	const storedDark = localStorage.getItem('darkMode')
	// 	if (storedDark === 'true') {
	// 		setDark(true)
	// 	}
	// }, [])

	// useEffect(() => {
	// 	localStorage.setItem('darkMode', dark)
	// }, [dark])

	return (
		<div className={`${dark ? 'dark' : ''}`}>
			<div className='flex h-screen dark:bg-gray-900  xl:hidden '>
				{/* Sidebar (mobile only) */}
				<motion.div
					initial={false}
					animate={{ x: isOpen ? 0 : '-100%' }}
					transition={{ duration: 0.3 }}
					className='fixed z-50 xl:hidden top-0 left-0 w-[250px] h-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-lg flex flex-col overflow-y-auto'
				>
					<div className='flex items-center justify-between px-4 py-4'>
						<span className='flex items-center gap-2'>
							<img
								src='https://jasur-savdo.vercel.app/assets/mini-logo-DrQXe_32.png'
								alt='logo'
								className='w-10'
							/>
							<span className='text-lg font-bold white space-nowrap'>
								Jasur Savdo
							</span>
						</span>
						<button onClick={() => setIsOpen(false)}>
							<X />
						</button>
					</div>
					<nav className='mt-4 flex flex-col gap-2'>
						{navItems.map((item, idx) => {
							const isActive = location.pathname === item.path
							return (
								<motion.div
									key={idx}
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: idx * 0.05 }}
									className={`flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 ${
										isActive ? 'bg-gray-300 dark:bg-gray-700' : ''
									}`}
								>
									<Link
										to={item.path}
										onClick={() => setIsOpen(false)}
										className='flex items-center gap-3 w-full'
									>
										{item.icon}
										<span className='whitespace-nowrap'>{item.name}</span>
									</Link>
								</motion.div>
							)
						})}
					</nav>
					<div className='mt-auto px-4 py-4'>
						<button
							onClick={() => setDark(!dark)}
							className='w-full px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center gap-2'
						>
							{dark ? <Sun size={18} /> : <Moon size={18} />}
							<span>{dark ? 'Light Mode' : 'Dark Mode'}</span>
						</button>
					</div>
				</motion.div>

				{/* Top Navbar for mobile */}
				<div className='fixed top-0 left-0 right-0 h-16 xl:hidden bg-white dark:bg-gray-800 shadow px-4 flex items-center justify-between z-40'>
					<span className='flex items-center gap-2'>
						<img
							src='https://jasur-savdo.vercel.app/assets/mini-logo-DrQXe_32.png'
							alt='logo'
							className='w-8'
						/>

						{/* <span className='font-bold   text-gray-900 dark:text-white'>
							Jasur Savdo
						</span> */}
					</span>
					<button onClick={() => setIsOpen(true)}>
						<Menu className='text-black dark:text-white' />
					</button>
				</div>

				{/* Main Content */}
				<motion.main
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className='flex-1 pt-20 md:pt-0 p-6 w-full text-gray-900 dark:text-white transition-colors duration-300'
				>
					<Outlet />
				</motion.main>
			</div>
		</div>
	)
}
