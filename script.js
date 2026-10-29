// Selecting DOM elements from HTML for manipulation and event handling
const noticeForm = document.getElementById('notice-form');
const noticeTitleInput = document.getElementById('notice-title');
const noticeDescInput = document.getElementById('notice-desc');
const noticeList = document.getElementById('notice-list');

// Trigger loading of saved notices from browser localStorage when DOM content loads
document.addEventListener('DOMContentLoaded', loadNotices);

// Event listener for form submission when publishing a new notice
noticeForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default browser form reload behavior

    // Retrieve and trim input values
    const title = noticeTitleInput.value.trim();
    const description = noticeDescInput.value.trim();
    
    // Generate formatted current date and time stamp
    const date = new Date().toLocaleDateString('en-GB', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
    });

    // Validate that fields are not empty before proceeding
    if (title && description) {
        const noticeObj = { title, description, date };
        
        // Save notice to browser local storage and render it on UI
        saveNoticeToStorage(noticeObj);
        renderNotice(noticeObj);

        // Reset the form input fields after successful submission
        noticeForm.reset();
    }
});

// Function to store notice object persistently in browser localStorage
function saveNoticeToStorage(notice) {
    // Retrieve existing notices array or initialize an empty array if none exist
    let notices = JSON.parse(localStorage.getItem('collegeNotices')) || [];
    notices.unshift(notice); // Add the new notice to the beginning of the array
    localStorage.setItem('collegeNotices', JSON.stringify(notices));
}

// Function to fetch and load all stored notices when the page is opened/refreshed
function loadNotices() {
    let notices = JSON.parse(localStorage.getItem('collegeNotices')) || [];
    noticeList.innerHTML = ''; // Clear container to avoid duplicate rendering
    notices.forEach(notice => renderNotice(notice));
}

// Function to dynamically create and render a notice card element on the web page
function renderNotice(notice) {
    const card = document.createElement('div');
    card.classList.add('notice-card');

    // Populate card inner HTML with title, description, and timestamp
    card.innerHTML = `
        <h3>${notice.title}</h3>
        <p>${notice.description}</p>
        <span>Posted on: ${notice.date}</span>
    `;

    // Prepend the new notice card so recent updates appear at the top
    noticeList.prepend(card);
}
