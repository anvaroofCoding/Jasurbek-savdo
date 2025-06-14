// Royxat.js (Updated with Add Client modal and seller info)
import { AnimatePresence, motion } from 'framer-motion'
import { Edit, Eye, Plus, Printer, Trash2 } from 'lucide-react'
import { useRef, useState } from 'react'

const sampleData = Array.from({ length: 25 }, (_, i) => ({
	id: i + 1,
	ism: `Mijoz ${i + 1}`,
	haqida: 'Doimiy mijoz',
	telefon: '+998901234567',
	manzil: `Toshkent, Chilonzor-${(i % 10) + 1}`,
	sana: '2025-06-13',
	miqdor: `${(1000 + i * 100).toLocaleString()} UZS`,
	mahsulotlar: ['Mahsulot A', 'Mahsulot B'],
	sotuvchi: 'Sotuvchi Akmal',
	rasm: `https://randomuser.me/api/portraits/men/${i % 99}.jpg`,
}))

export default function Royxat() {
	const [search, setSearch] = useState('')
	const [selectedImage, setSelectedImage] = useState(null)
	const [selectedClient, setSelectedClient] = useState(null)
	const [currentPage, setCurrentPage] = useState(1)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [formData, setFormData] = useState({
		ism: '',
		manzil: '',
		telefon: '',
		miqdor: '',
		sotuvchi: '',
	})
	const itemsPerPage = 15
	const printRef = useRef()

	const filteredData = sampleData.filter(item =>
		item.ism.toLowerCase().includes(search.toLowerCase())
	)

	const totalPages = Math.ceil(filteredData.length / itemsPerPage)
	const displayedData = filteredData.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	)

	const handlePrint = () => {
		const printContents = document.getElementById('printable-section').innerHTML
		const printWindow = window.open('', '_blank')
		printWindow.document.write(`
      <html><head><title>Chop etish</title></head>
      <body>${printContents}</body></html>
    `)
		printWindow.document.close()
		printWindow.focus()
		printWindow.print()
		printWindow.close()
	}

	const handleAddClient = () => {
		const newClient = {
			id: sampleData.length + 1,
			ism: formData.ism,
			manzil: formData.manzil,
			telefon: formData.telefon,
			miqdor: formData.miqdor,
			haqida: 'Yangi mijoz',
			sana: new Date().toISOString().split('T')[0],
			mahsulotlar: ['Yangi mahsulot'],
			sotuvchi: formData.sotuvchi,
			rasm: 'https://randomuser.me/api/portraits/men/1.jpg',
		}
		sampleData.push(newClient)
		setFormData({ ism: '', manzil: '', telefon: '', miqdor: '', sotuvchi: '' })
		setIsModalOpen(false)
	}

	return (
		<div className='space-y-6 overflow-x-hidden md:overflow-x-auto'>
			<div className='flex flex-col mt-0 p-1 sm:flex-row sm:items-center justify-between mb-4 gap-4'>
				<input
					type='text'
					value={search}
					onChange={e => setSearch(e.target.value)}
					placeholder='🔍 Qidiruv...'
					className='w-full sm:w-64 px-5 py-2 rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-md border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200 ease-in-out'
				/>

				<div className='flex gap-2'>
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={() => setIsModalOpen(true)}
						className='flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition w-full sm:w-auto justify-center'
						title='Yangi mijoz qo‘shish'
					>
						<Plus size={18} /> Qo‘shish
					</motion.button>

					{selectedClient && (
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							onClick={handlePrint}
							className='flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-full sm:w-auto justify-center'
							title='Chekni chop etish'
						>
							<Printer size={18} /> Chekni chiqarish
						</motion.button>
					)}
				</div>
			</div>

			<AnimatePresence>
				{isModalOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4'
					>
						<motion.div
							initial={{ scale: 0.8 }}
							animate={{ scale: 1 }}
							exit={{ scale: 0.8 }}
							className='bg-white dark:bg-gray-900 p-6 rounded-xl w-full max-w-md space-y-4 shadow-xl'
						>
							<h2 className='text-lg font-semibold text-gray-900 dark:text-white'>
								Yangi mijoz qo‘shish
							</h2>
							<input
								type='text'
								placeholder='Ism'
								value={formData.ism}
								onChange={e =>
									setFormData({ ...formData, ism: e.target.value })
								}
								className='w-full p-2 rounded-md border dark:bg-gray-800'
							/>
							<input
								type='text'
								placeholder='Manzil'
								value={formData.manzil}
								onChange={e =>
									setFormData({ ...formData, manzil: e.target.value })
								}
								className='w-full p-2 rounded-md border dark:bg-gray-800'
							/>
							<input
								type='text'
								placeholder='Telefon'
								value={formData.telefon}
								onChange={e =>
									setFormData({ ...formData, telefon: e.target.value })
								}
								className='w-full p-2 rounded-md border dark:bg-gray-800'
							/>
							<input
								type='text'
								placeholder='Miqdor'
								value={formData.miqdor}
								onChange={e =>
									setFormData({ ...formData, miqdor: e.target.value })
								}
								className='w-full p-2 rounded-md border dark:bg-gray-800'
							/>
							<input
								type='text'
								placeholder='Sotuvchi'
								value={formData.sotuvchi}
								onChange={e =>
									setFormData({ ...formData, sotuvchi: e.target.value })
								}
								className='w-full p-2 rounded-md border dark:bg-gray-800'
							/>
							<div className='flex justify-end gap-2 pt-2'>
								<button
									onClick={() => setIsModalOpen(false)}
									className='px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 text-black dark:text-white'
								>
									Bekor qilish
								</button>
								<button
									onClick={handleAddClient}
									className='px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700'
								>
									Qo‘shish
								</button>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Printable Section (Hidden) */}
			{selectedClient && (
				<div id='printable-section' className='hidden print:block'>
					<div className='p-4 max-w-lg mx-auto bg-white text-black'>
						<h2 className='text-lg font-bold mb-2'>Chek ma’lumotlari</h2>
						<p>
							<strong>Ism:</strong> {selectedClient.ism}
						</p>
						<p>
							<strong>Manzil:</strong> {selectedClient.manzil}
						</p>
						<p>
							<strong>Telefon:</strong> {selectedClient.telefon}
						</p>
						<p>
							<strong>Sana:</strong> {selectedClient.sana}
						</p>
						<p>
							<strong>Mahsulotlar:</strong>
						</p>
						<ul className='list-disc pl-6'>
							{selectedClient.mahsulotlar.map((m, idx) => (
								<li key={idx}>{m}</li>
							))}
						</ul>
						<p>
							<strong>Jami summa:</strong> {selectedClient.miqdor}
						</p>
						<p>
							<strong>Sotuvchi:</strong> {selectedClient.sotuvchi}
						</p>
					</div>
				</div>
			)}

			{/* Jadval */}
			<div className='overflow-x-auto h-[75vh] rounded-xl shadow-md xl:block hidden'>
				<table className='min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm'>
					<thead className='bg-gray-100 dark:bg-gray-800 text-left'>
						<tr>
							<th className='px-4 py-2'>ID</th>
							<th className='px-4 py-2'>Ism</th>
							<th className='px-4 py-2'>Manzil</th>
							<th className='px-4 py-2'>Telefon</th>
							<th className='px-4 py-2'>Sana</th>
							<th className='px-4 py-2'>Miqdor</th>
							<th className='px-4 py-2'>Amallar</th>
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
								<td className='px-4 py-2'>{item.manzil}</td>
								<td className='px-4 py-2'>{item.telefon}</td>
								<td className='px-4 py-2'>{item.sana}</td>
								<td className='px-4 py-2'>{item.miqdor}</td>
								<td className='px-4 py-2'>
									<div className='flex gap-2'>
										<motion.button
											whileHover={{ scale: 1.1 }}
											onClick={() => setSelectedClient(item)}
										>
											<Eye size={18} />
										</motion.button>
										<motion.button whileHover={{ scale: 1.1 }}>
											<Edit size={18} className='text-green-500' />
										</motion.button>
										<motion.button whileHover={{ scale: 1.1 }}>
											<Trash2 size={18} className='text-red-500' />
										</motion.button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Mobile */}
			<div className='grid grid-cols-1 sm:grid-cols-2 gap-4 xl:hidden'>
				{displayedData.map(item => (
					<motion.div
						key={item.id}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3 }}
						className='bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 space-y-2'
					>
						<div className='flex items-center gap-4'>
							<img
								src={item.rasm}
								alt='rasm'
								className='w-14 h-14 rounded-full border object-cover'
							/>
							<div>
								<h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
									{item.ism}
								</h3>
								<p className='text-sm text-gray-500 dark:text-gray-400'>
									{item.manzil}
								</p>
							</div>
						</div>
						<div className='text-sm text-gray-700 dark:text-gray-300'>
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
						<div className='flex gap-2 pt-2'>
							<motion.button
								whileHover={{ scale: 1.1 }}
								onClick={() => setSelectedClient(item)}
							>
								<Eye size={18} />
							</motion.button>
							<motion.button whileHover={{ scale: 1.1 }}>
								<Edit size={18} className='text-green-500' />
							</motion.button>
							<motion.button whileHover={{ scale: 1.1 }}>
								<Trash2 size={18} className='text-red-500' />
							</motion.button>
						</div>
					</motion.div>
				))}
			</div>

			{/* Pagination */}
			<div className='flex justify-center gap-2 mt-4'>
				{Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
					<motion.button
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.95 }}
						key={page}
						onClick={() => setCurrentPage(page)}
						className={`px-4 py-2 rounded text-sm transition ${
							currentPage === page
								? 'bg-red-600 text-white'
								: 'bg-gray-200 dark:bg-gray-700'
						}`}
					>
						{page}
					</motion.button>
				))}
			</div>
		</div>
	)
}
