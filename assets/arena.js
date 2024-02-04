// This allows us to process/render the descriptions, which are in Markdown!
// More about Markdown: https://www.markdownguide.org
let markdownIt = document.createElement('script')
markdownIt.src = 'https://cdn.jsdelivr.net/npm/markdown-it@14.0.0/dist/markdown-it.min.js'
document.head.appendChild(markdownIt)



// Okay, Are.na stuff!
const channelSlug = 'typography-and-interaction-too' // The “slug” is just the end of the URL.



// First, let’s lay out some *functions*:

const placeChannelInfo = (data) => {
	// Target some elements in your HTML:
	const channelTitle = document.getElementById('channel-title')
	const channelDescription = document.getElementById('channel-description')
	const channelCount = document.getElementById('channel-count')
	const channelLink = document.getElementById('channel-link')

	// Then set their content/attributes to our data:
	channelTitle.innerText = data.title
	channelDescription.innerHTML = window.markdownit().render(data.metadata.description) // Markdown → HTML.
	channelCount.innerText = data.length
	channelLink.href = `https://www.are.na/channel/${channelSlug}`
}



// Now that we have said what we can do, go get the data:
fetch(`https://api.are.na/v2/channels/${channelSlug}?per=100`, { cache: 'no-store' })
	.then(response => response.json())
	.then(data => {
		console.log(data) // Always good to check your  response!
		placeChannelInfo(data)
	})
