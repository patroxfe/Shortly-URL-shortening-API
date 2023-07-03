const hamburgerMenu = document.querySelector('.nav__content-menu')
const mobileMenu = document.querySelector('.nav__content-large-container')
const navItems = document.querySelectorAll('.nav-item')
const shadowMobile = document.querySelector('.shadow-mobile')
const inputShorten = document.querySelector('.shorten-content__input')
const errorShorten = document.querySelector('.shorten-content__error')
const btnShorten = document.querySelector('.shorten-content__btn')
const linkShortenContainer = document.querySelector('.shorten-link-container')
const newLinkContainer = document.getElementsByClassName('shorten-link__new')
const regExp =
/(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;
let newLink

const showInputContent = () => {
	if (inputShorten.value.length === 0 || !regExp.test(inputShorten.value)) {
		errorShorten.style.display = 'block'
	} else {
		errorShorten.style.display = ''
		shortenUrl()
	}
}

const shortenUrl = () => {
	const URL = `https://api.shrtco.de/v2/shorten?url=${inputShorten.value}`
	axios.get(URL).then(res => {
		newLink = res.data.result.short_link
		createNewArea()
		inputShorten.value = ''
	})
}

const showMenu = () => {
	mobileMenu.classList.toggle('nav-active')

	if (mobileMenu.classList.contains('nav-active')) {
		shadowMobile.style.display = 'block'
	} else {
		shadowMobile.style.display = 'none'
	}
}

const createNewArea = () => {
	const newArea = document.createElement('div')
	newArea.classList.add('shorten-link')
	newArea.innerHTML = `
	  <div class="shorten-link__old">
		<p class="shorten-link__old-link">
		  ${inputShorten.value}
		</p>
	  </div>
	  <div class="shorten-link__new">
		<p class="shorten-link__new-link">${newLink}</p>
		<button class="shorten-link__new-btn">Copy</button>
	  </div>`
	linkShortenContainer.append(newArea)

	const shortenLinkNewBtn = newArea.querySelector('.shorten-link__new-btn')
	const shortenLinkNewLink = newArea.querySelector('.shorten-link__new-link')
	
	shortenLinkNewBtn.addEventListener('click', () => {
		shortenLinkNewBtn.classList.add('button-click')
		shortenLinkNewBtn.textContent = 'Copied!'

		const textarea = document.createElement('textarea')
		textarea.value = shortenLinkNewLink.textContent
		document.body.append(textarea)
		textarea.select()
		document.execCommand('copy')
		document.body.removeChild(textarea)
	})
}

navItems.forEach(navItem =>
	navItem.addEventListener('click', () => {
		mobileMenu.classList.remove('nav-active')
		shadowMobile.style.display = 'none'
	})
)

btnShorten.addEventListener('click', showInputContent)
hamburgerMenu.addEventListener('click', showMenu)

inputShorten.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
	  showInputContent();
	}
  });
  