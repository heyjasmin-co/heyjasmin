import React, { useState } from 'react'

interface TrainRosieProps {
	className?: string
	onSuccess?: (data: { businessName: string; selectedOption: string }) => void
}

type OptionType = 'profile' | 'website'

const TrainRosie: React.FC<TrainRosieProps> = ({  onSuccess }) => {
	const [businessName, setBusinessName] = useState<string>('')
	const [selectedOption, setSelectedOption] = useState<OptionType>('profile')

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault()
		if (selectedOption === 'profile' && !businessName.trim()) {
			alert('Please enter your business name')
			return
		}

		console.log('Form submitted:', { businessName, selectedOption })
		onSuccess?.({ businessName, selectedOption })
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
			{/* Main Card */}
			<div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
				{/* Header Section */}
				<div className="p-6 sm:p-8">
					<div className="flex items-center justify-center mb-4">
						<div className="flex items-center space-x-2">
							<div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
								<span className="text-white text-lg">🤖</span>
							</div>
							<span className="text-xl font-bold text-gray-800">Rosie</span>
						</div>
					</div>

					<h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-3">
						Train Rosie with your{' '}
						<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
							Google Business Profile
						</span>
					</h1>

					<p className="text-gray-600 text-center text-sm sm:text-base leading-relaxed mb-6">
						Find your profile by entering your business name. Your AI agent will be trained on your Google profile. Takes less
						than a minute!
					</p>

					<div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-6"></div>
				</div>

				{/* Form Section */}
				<div className="px-6 sm:px-8 pb-8">
					<div className="mb-6">
						<h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">Find your Google Business Profile</h2>

						{/* Option Selector */}
						<div className="flex space-x-2 mb-6 bg-gray-100 rounded-lg p-1">
							<button
								type="button"
								onClick={() => setSelectedOption('profile')}
								className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
									selectedOption === 'profile' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'
								}`}
							>
								Business Profile
							</button>
							<button
								type="button"
								onClick={() => setSelectedOption('website')}
								className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
									selectedOption === 'website' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'
								}`}
							>
								Use Website
							</button>
						</div>

						{/* Form */}
						<form onSubmit={handleSubmit} className="space-y-4">
							{selectedOption === 'profile' && (
								<div className="space-y-3">
									<div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
										<div className="w-5 h-5 rounded-full border-2 border-blue-500 flex items-center justify-center mt-0.5 flex-shrink-0">
											<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
										</div>
										<div className="flex-1">
											<label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">
												Type your business name...
											</label>
											<input
												id="businessName"
												type="text"
												value={businessName}
												onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBusinessName(e.target.value)}
												placeholder="e.g., Joe's Coffee Shop"
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
											/>
										</div>
									</div>
								</div>
							)}

							{selectedOption === 'website' && (
								<div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
									<div className="w-5 h-5 rounded-full border-2 border-green-500 flex items-center justify-center mt-0.5 flex-shrink-0">
										<div className="w-2 h-2 bg-green-500 rounded-full"></div>
									</div>
									<div className="flex-1">
										<p className="text-sm font-medium text-gray-700 mb-2">Use my website instead</p>
										<p className="text-xs text-gray-500">
											We'll extract business information from your website to train Rosie.
										</p>
									</div>
								</div>
							)}

							<button
								type="submit"
								className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold text-sm sm:text-base hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
							>
								Continue →
							</button>
						</form>
					</div>

					{/* Footer CTA */}
					<div className="text-center">
						<div className="inline-flex items-center space-x-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
							<span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
							<span>Start risk-free: 7-day trial with all features</span>
						</div>
					</div>
				</div>

				{/* Bottom Gradient Border */}
				<div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
			</div>
		</div>
	)
}

export default TrainRosie
