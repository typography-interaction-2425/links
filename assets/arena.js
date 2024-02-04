// This allows us to process/render the descriptions, which are in Markdown!
// More about Markdown: https://www.markdownguide.org
let markdownIt = document.createElement('script')
markdownIt.src = 'https://cdn.jsdelivr.net/npm/markdown-it@14.0.0/dist/markdown-it.min.js'
document.head.appendChild(markdownIt)



// Okay, Are.na stuff!
const channelSlug = 'typography-and-interaction-too' // The “slug” is just the end of the URL



// First, let’s lay out some *functions*, starting with our basic metadata:
const placeChannelInfo = (data) => {
	// Target some elements in your HTML:
	const channelTitle = document.getElementById('channel-title')
	const channelDescription = document.getElementById('channel-description')
	const channelCount = document.getElementById('channel-count')
	const channelLink = document.getElementById('channel-link')

	// Then set their content/attributes to our data:
	channelTitle.innerHTML = data.title
	channelDescription.innerHTML = window.markdownit().render(data.metadata.description) // Converts Markdown → HTML
	channelCount.innerHTML = data.length
	channelLink.href = `https://www.are.na/channel/${channelSlug}`
}



// Then our big function for specific-block-type rendering:
const renderBlock = (block) => {
	// To start, a shared `ul` where we’ll insert all our blocks
	const channelBlocks = document.getElementById('channel-blocks')

	// Links!
	if (block.class == 'Link') {
		const linkItem =
			`
			<li>
				<p><em>Link</em></p>
				<picture>
					<source media="(max-width: 428px)" srcset="${ block.image.thumb.url }">
					<source media="(max-width: 640px)" srcset="${ block.image.large.url }">
					<img src="${ block.image.original.url }">
				</picture>
				<h3>${ block.title }</h3>
				${ block.description_html }
				<p><a href="${ block.source.url }">See the original ↗</a></p>
			</li>
			`
		channelBlocks.insertAdjacentHTML('beforeend', linkItem)
	}

	// Images!
	else if (block.class == 'Image') {
		// …up to you!
	}

	// Text!
	else if (block.class == 'Text') {
		// …up to you!
	}

	// Uploaded (not linked) media…
	else if (block.class == 'Attachment') {
		const attachment = block.attachment.content_type // Save us some repetition

		// Uploaded videos!
		if (attachment.includes('video')) {

		}

		// Uploaded PDFs!
		else if (attachment.includes('pdf')) {
			// …up to you!
		}

		// Uploaded audio!
		else if (attachment.includes('audio')) {

		}
	}

	// Linked media…
	else if (block.class == 'Media') {
		const embed = block.embed.type

		// Linked video!
		if (embed.includes('video')) {

		}

		// Linked audio!
		else if (embed.includes('rich')) {

		}
	}
}



// Now that we have said what we can do, go get the data:
fetch(`https://api.are.na/v2/channels/${channelSlug}?per=100`, { cache: 'no-store' })
	.then((response) => response.json()) // Return it as JSON
	.then((data) => {
		// console.log(data) // Always good to check your response!
		placeChannelInfo(data) // Pass the data to the first function

		// Loop through the `contents` array (list), backwards. Are.na returns them in reverse!
		data.contents.reverse().forEach((block) => {
			// console.log(block) // The data for a single block
			renderBlock(block) // Pass the single block data to the render function
		})
	})
