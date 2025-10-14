import puppeteer, { Browser } from 'puppeteer'

async function scrapeWebsiteContent(url: string): Promise<string | null> {
	let browser: Browser | null = null

	try {
		// Validate URL
		if (!url || !/^https?:\/\//.test(url)) {
			console.error('❌ Invalid URL:', url)
			return null
		}

		browser = await puppeteer.launch({
			headless: true,
			args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
		})

		const page = await browser.newPage()

		// Set user agent
		await page.setUserAgent(
			'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
		)

		// Set viewport
		await page.setViewport({ width: 1920, height: 1080 })

		console.log(`🌐 Navigating to: ${url}`)

		// Navigate with timeout
		await page.goto(url, {
			waitUntil: 'networkidle2',
			timeout: 30000,
		})

		// Wait for body to load
		await page.waitForSelector('body', { timeout: 5000 })

		// Additional wait for dynamic content
		await new Promise((resolve) => setTimeout(resolve, 2000))

		// Extract text content
		const textContent = await page.evaluate(() => {
			// Remove unwanted elements
			const unwantedSelectors = ['script', 'style', 'noscript', 'iframe', 'svg', 'path', 'img', 'video', 'audio']

			unwantedSelectors.forEach((selector) => {
				const elements = document.querySelectorAll(selector)
				elements.forEach((el) => el.remove())
			})

			// Get clean text content
			return document.body.innerText
		})

		await browser.close()

		if (!textContent || textContent.trim().length === 0) {
			console.warn('⚠️ No text content extracted from page')
			return null
		}

		console.log(`✅ Successfully scraped ${textContent.length} characters`)
		return textContent
	} catch (err: any) {
		console.error('❌ Puppeteer scraping error:', {
			message: err.message,
			url,
		})

		if (browser) {
			await browser.close().catch((e) => console.error('Error closing browser:', e))
		}

		return null
	}
}

export default scrapeWebsiteContent
