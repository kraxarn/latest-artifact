const redirect = () => {
	const params = new URLSearchParams(window.location.search)
	if (!params.has("owner") || !params.has("repo")) {
		document.write("Invalid request")
		return
	}
	document.write("Please wait...")
	const owner = params.get("owner")
	const repo = params.get("repo")
	fetch(`https://api.github.com/repos/${owner}/${repo}/actions/runs`)
		.then(response => response.json())
		.then(json => {
			if (json.total_count === 0) {
				document.write("No artifacts found")
				return
			}
			const url = json.workflow_runs[0].html_url
			document.write(`<a href="${url}">Redirecting, click here if nothing happens</a>`)
			window.location = url
		})
		.catch(err => document.write(err))
}
redirect()