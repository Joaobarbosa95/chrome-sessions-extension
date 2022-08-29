chrome.runtime.onInstalled.addListener(() => {
    alert("installed")
})

const createBookmark = document.getElementById("create-bookmark")
const getBookmark = document.getElementById("get-bookmark")
const createSession = document.getElementById("create-session")
const getSession = document.getElementById("get-session")


createBookmark.addEventListener("click", () => {
    // add session to color/tag
    //
})

getBookmark.addEventListener("click", () => {
    console.log("create bookmark")
})

createSession.addEventListener("click", () => {
    // save all tabs in a folder with session name
    //
})

getSession.addEventListener("click", () => {
    // open all tabs in a session folder
})
