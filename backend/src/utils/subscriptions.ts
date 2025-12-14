interface SubscriptionCard {
	name: string
	price: number
	priceId: string | null
	features: string[]
}

export const subscriptionCards: SubscriptionCard[] = [
	{
		name: 'essential',
		price: 49,
		priceId: 'price_1SdwUS3RWlFXmQKIZuvy03K2',
		features: [
			'Solo pros and small teams – every call answered',
			'Includes 200 minutes per month',
			'Custom message capture',
			'Smart call screening',
			'Instant email & SMS alerts',
		],
	},
	{
		name: 'pro',
		price: 125,
		priceId: 'price_1SdwUk3RWlFXmQKIPnSwdaGm',
		features: [
			'Fast-growing teams – automate scheduling 24/7',
			'Everything in Essential plus',
			'Real-time two-way text during calls',
			'Call analytics dashboard with insights',
			'Full calendar sync & appointment link generation',
		],
	},
	{
		name: 'plus',
		price: 299,
		priceId: 'price_1SdwV03RWlFXmQKIVFUPznvl',
		features: [
			'Established businesses – deeper insights & support',
			'Everything in Pro plus',
			'Dedicated account manager for priority support',
			'Deep system integrations with AI workflows',
		],
	},
	{
		name: 'custom',
		price: 0,
		priceId: null,
		features: [
			'Multi-site businesses & franchises',
			'Franchises & multi-location brands – high-volume workflows',
			'Unlimited minutes & full enterprise-scale throughput',
			'Custom prompt sets & advanced agent training',
			'Dedicated account manager and integration',
		],
	},
]

export const getPriceIdAmount = (priceId: string): number => {
	const card = subscriptionCards.find((c) => c.priceId === priceId)
	if (!card) return 0

	// Return the price directly as number (already in dollars)
	return Math.round(card.price * 100)
}

export const getSubscriptionByPriceId = (priceId: string) => {
	return subscriptionCards.find((c) => c.priceId === priceId)
}
