chrome.runtime.onInstalled.addListener(() => {
    alert("installed")
})

// Containers
const container = document.getElementById("container")
const sessionsContainer = document.getElementById("sessions-container")

// Inputs 
const createBookmarkInput = document.getElementById("create-bookmark-input")
const getBookmarkInput = document.getElementById("get-bookmark-input")
const createSessionInput = document.getElementById("create-session-input")
const getSessionInput = document.getElementById("get-session-input")

// Buttons 
const createBookmark = document.getElementById("create-bookmark")
const getBookmark = document.getElementById("get-bookmark")
const createSession = document.getElementById("create-session")
const getSession = document.getElementById("get-session")


createBookmark.addEventListener("click", () => {
    // add session to color/tag
    chrome.tabs.create({url: "https://www.google.com"}) 
})

getBookmark.addEventListener("click", () => {
    console.log("create bookmark")
})

createSession.addEventListener("click", () => {
    if(createSessionInput.value.trim().length < 1) return 

    const title = "Session - " +  createSessionInput.value.trim()

    // Create session folder 
    chrome.bookmarks.create({
          'parentId': "1", // Bookmarks bar
          'title': title, 
        }, 
        function(sessionFolder) {
            console.log("Session: ", sessionFolder)

            // Select all tabs
            chrome.tabs.query({}, function(tabs) {
                tabs.forEach(tab => {
                    chrome.bookmarks.create({
                        'parentId': sessionFolder.id,
                        'title': tab.title,
                        'url': tab.url
                    })
                })
            })

            clearInputs()
        }
    )
})

getSession.addEventListener("click", () => {
    // open all tabs in a session folder
    chrome.bookmarks.getSubTree("1", function(bookmarks) {
        console.log(bookmarks[0].children)
        const sessions = bookmarks[0].children.filter(entrie => entrie.title.startsWith("Session - "))
        const matches = sessions.filter(session => session.title.match(`${getSessionInput.value}`))

        matches.forEach(session => {
            const p = document.createElement("p")
            p.innerHTML = session.title.slice(10)
            p.classList.add("session-name")
            sessionsContainer.appendChild(p)

            p.addEventListener("click", () => {
                session.children.forEach(tab => {
                    chrome.tabs.create({url: tab.url})
                })
            })
        })

        container.style.display = "none"
        sessionsContainer.style.display = "block"
        })
})

// Update session

// Utils
function clearInputs() {
    createBookmarkInput.value = ""
    getBookmarkInput.value = ""
    createSessionInput.value = ""
    getSessionInput.value = ""
}

