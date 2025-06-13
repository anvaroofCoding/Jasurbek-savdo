import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

import {
	Briefcase,
	Building,
	Home,
	ListOrdered,
	Menu,
	Moon,
	Store,
	Sun,
} from 'lucide-react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Home/sidebar'

const navItems = [
	{ name: 'Xalq', icon: <Home size={20} />, path: '/xalq' },
	{ name: 'Optom', icon: <Store size={20} />, path: '/optom' },
	{ name: 'Firmalar', icon: <Building size={20} />, path: '/firmalar' },
	{ name: "Ro'yxat", icon: <ListOrdered size={20} />, path: '/royxat' },
	{ name: 'Ishlar', icon: <Briefcase size={20} />, path: '/ishlar' },
]

export default function App() {
	const [isOpen, setIsOpen] = useState(true)
	const [dark, setDark] = useState(false)
	const location = useLocation()

	useEffect(() => {
		const saved = localStorage.getItem('darkMode')
		if (saved === 'true') setDark(true)
	}, [])

	useEffect(() => {
		localStorage.setItem('darkMode', dark)
		if (dark) {
			document.documentElement.classList.add('dark')
		} else {
			document.documentElement.classList.remove('dark')
		}
	}, [dark])

	return (
		<div>
			<div className={`${dark ? 'dark' : ''} `}>
				<div className=' h-screen dark:bg-gray-900 hidden xl:flex'>
					{/* Sidebar */}
					<motion.div
						animate={{ width: isOpen ? 250 : 60 }}
						className='bg-white dark:bg-gray-800 text-gray-900 dark:text-white h-full shadow-lg flex flex-col transition-all duration-300 overflow-hidden'
					>
						<div className='flex items-center justify-between px-4 py-4'>
							{isOpen && (
								<span className='flex justify-between items-center gap-2'>
									<img
										src='https://jasur-savdo.vercel.app/assets/mini-logo-DrQXe_32.png'
										alt='logo'
										className='w-10'
									/>
									<span className='text-lg font-bold whitespace-nowrap'>
										Jasur Savdo
									</span>
								</span>
							)}
							<button onClick={() => setIsOpen(!isOpen)} className='ml-auto'>
								<Menu />
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
										transition={{ delay: isOpen ? idx * 0.05 : 0 }}
										className={`flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 ${
											isActive ? 'bg-gray-300 dark:bg-gray-700' : ''
										}`}
									>
										<Link
											to={item.path}
											className='flex items-center gap-3 w-full'
										>
											{item.icon}
											{isOpen && (
												<span className='whitespace-nowrap'>{item.name}</span>
											)}
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
								{/* <span>{dark ? 'Light Mode' : 'Dark Mode'}</span> */}
							</button>
						</div>
					</motion.div>

					{/* Main Content */}
					<motion.main
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className='flex-1 p-10 text-gray-900 dark:text-white transition-colors duration-300'
					>
						<Outlet />
					</motion.main>
				</div>
			</div>
			<Sidebar />
		</div>
	)
}
