import { AnimatePresence, motion } from 'framer-motion'
import { Edit, Eye, Plus, Trash2, X } from 'lucide-react'
import { useState } from 'react'

const sampleData = Array.from({ length: 25 }, (_, i) => ({
	id: i + 1,
	ism: `Mijoz ${i + 1}`,
	haqida: 'Doimiy mijoz',
	telefon: '+998901234567',
	sana: '2025-06-13',
	miqdor: `${(1000 + i * 100).toLocaleString()} UZS`,
	rasm: `https://randomuser.me/api/portraits/men/${i % 99}.jpg`,
}))

export default function Xalq() {
	const [search, setSearch] = useState('')
	const [selectedImage, setSelectedImage] = useState(null)
	const [currentPage, setCurrentPage] = useState(1)
	const itemsPerPage = 8

	const filteredData = sampleData.filter(item =>
		item.ism.toLowerCase().includes(search.toLowerCase())
	)

	const totalPages = Math.ceil(filteredData.length / itemsPerPage)
	const displayedData = filteredData.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	)

	return (
		<div className='space-y-6 overflow-x-hidden md:overflow-x-auto '>
			{/* Navbar */}
			<div className='flex flex-col p-1 sm:flex-row sm:items-center justify-between mb-4 gap-4'>
				<input
					type='text'
					value={search}
					onChange={e => setSearch(e.target.value)}
					placeholder='🔍 Qidiruv...'
					className='
    w-full sm:w-64 
    px-5 py-2 
    rounded-full 
    bg-white dark:bg-gray-800 
    text-gray-800 dark:text-white 
    placeholder-gray-400 dark:placeholder-gray-500
    shadow-md 
    border border-gray-200 dark:border-gray-700
    focus:outline-none 
    focus:ring-2 focus:ring-purple-500 focus:border-transparent
    transition duration-200 ease-in-out
  '
				/>

				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					className='flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition w-full sm:w-auto justify-center'
					title='Yangi mijoz qo‘shish'
				>
					<Plus size={18} /> Qo‘shish
				</motion.button>
			</div>

			{/* Table (Laptop/Desktop) */}
			<div className='hidden md:block overflow-x-auto rounded-xl shadow-md'>
				<div className='min-w-[1000px]'>
					<table className='w-full divide-y divide-gray-200 dark:divide-gray-700'>
						<thead className='bg-gray-100 dark:bg-gray-800'>
							<tr>
								<th className='px-4 py-2 text-left'>ID</th>
								<th className='px-4 py-2 text-left'>Ism</th>
								<th className='px-4 py-2 text-left'>Mijoz haqida</th>
								<th className='px-4 py-2 text-left'>Telefon</th>
								<th className='px-4 py-2 text-left'>Sana</th>
								<th className='px-4 py-2 text-left'>Miqdori</th>
								<th className='px-4 py-2 text-left'>Rasm</th>
								<th className='px-4 py-2 text-left'>Amallar</th>
							</tr>
						</thead>
						<tbody className='divide-y divide-gray-100 dark:divide-gray-800'>
							{displayedData.map(item => (
								<tr
									key={item.id}
									className='hover:bg-gray-50 dark:hover:bg-gray-700 transition'
								>
									<td className='px-4 py-2'>{item.id}</td>
									<td className='px-4 py-2'>{item.ism}</td>
									<td className='px-4 py-2'>{item.haqida}</td>
									<td className='px-4 py-2'>{item.telefon}</td>
									<td className='px-4 py-2'>{item.sana}</td>
									<td className='px-4 py-2'>{item.miqdor}</td>
									<td className='px-4 py-2'>
										<div className='relative group w-10 h-10'>
											<img
												src={item.rasm}
												alt='mijoz'
												className='rounded-full object-cover w-full h-full border'
											/>
											<button
												onClick={() => setSelectedImage(item.rasm)}
												title='Rasmni ko‘rish'
												className='absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-full'
											>
												<Eye className='text-white' size={16} />
											</button>
										</div>
									</td>
									<td className='px-4 py-2'>
										<div className='flex gap-2'>
											<motion.button
												whileHover={{ scale: 1.1 }}
												title='Ko‘rish'
											>
												<Eye size={18} />
											</motion.button>
											<motion.button
												whileHover={{ scale: 1.1 }}
												title='Tahrirlash'
											>
												<Edit size={18} className='text-green-500' />
											</motion.button>
											<motion.button
												whileHover={{ scale: 1.1 }}
												title='O‘chirish'
											>
												<Trash2 size={18} className='text-red-500' />
											</motion.button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* Cards (Mobile/Tablet) */}
			<div className='overflow-y-auto max-h-[80vh] scroll-purple grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:hidden py-10'>
				{displayedData.map(item => (
					<motion.div
						key={item.id}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3 }}
						className='bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 space-y-3 relative'
					>
						<div className='flex items-center gap-4'>
							<div className='relative group'>
								<img
									src={item.rasm}
									alt='mijoz'
									className='w-14 h-14 rounded-full object-cover border'
								/>
								<button
									onClick={() => setSelectedImage(item.rasm)}
									title='Rasmni ko‘rish'
									className='absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-full'
								>
									<Eye className='text-white' size={18} />
								</button>
							</div>
							<div>
								<h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
									{item.ism}
								</h3>
								<p className='text-sm text-gray-500 dark:text-gray-400'>
									{item.haqida}
								</p>
							</div>
						</div>
						<div className='text-sm text-gray-700 dark:text-gray-300 space-y-1'>
							<p>
								<strong>Telefon:</strong> {item.telefon}
							</p>
							<p>
								<strong>Sana:</strong> {item.sana}
							</p>
							<p>
								<strong>Miqdor:</strong> {item.miqdor}
							</p>
						</div>
						<div className='flex gap-2 mt-2'>
							<motion.button whileHover={{ scale: 1.1 }} title='Ko‘rish'>
								<Eye size={18} />
							</motion.button>
							<motion.button whileHover={{ scale: 1.1 }} title='Tahrirlash'>
								<Edit size={18} className='text-green-500' />
							</motion.button>
							<motion.button whileHover={{ scale: 1.1 }} title='O‘chirish'>
								<Trash2 size={18} className='text-red-500' />
							</motion.button>
						</div>
					</motion.div>
				))}
				<div className='col-span-full flex justify-center items-center gap-2 mt-4'>
					{Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
						<motion.button
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.95 }}
							key={page}
							onClick={() => setCurrentPage(page)}
							className={`px-4 py-2 rounded text-sm transition ${
								currentPage === page
									? 'bg-purple-600 text-white'
									: 'bg-gray-200 dark:bg-gray-700'
							}`}
						>
							{page}
						</motion.button>
					))}
				</div>
			</div>

			{/* Pagination */}
			<div className='xl:flex hidden justify-center  items-center gap-2 mt-4'>
				{Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
					<motion.button
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.95 }}
						key={page}
						onClick={() => setCurrentPage(page)}
						className={`px-4 py-2 rounded text-sm transition ${
							currentPage === page
								? 'bg-purple-600 text-white'
								: 'bg-gray-200 dark:bg-gray-700'
						}`}
					>
						{page}
					</motion.button>
				))}
			</div>

			{/* Modal for image */}
			<AnimatePresence>
				{selectedImage && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='fixed inset-0 z-50 flex items-center justify-center bg-black/60'
					>
						<motion.div
							initial={{ scale: 0.8 }}
							animate={{ scale: 1 }}
							exit={{ scale: 0.8 }}
							className='relative'
						>
							<img
								src={selectedImage}
								alt='Rasm'
								className='max-w-md rounded-lg shadow-lg'
							/>
							<button
								onClick={() => setSelectedImage(null)}
								className='absolute -top-2 -right-2 bg-white text-black rounded-full shadow p-1'
							>
								<X size={16} />
							</button>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
