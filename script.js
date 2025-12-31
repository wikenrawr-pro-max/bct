// ========== DATA SECTION ==========

// Semester data with all subjects for BCT
const semestersData = {
    1: ['Engineering Mathematics I', 'Computer Programming', 'Engineering Drawing I', 'Engineering Physics', 'Applied Mechanics'],
    2: ['Engineering Mathematics II', 'Engineering Drawing II', 'Basic Electronics Engineering', 'Fundamental of Thermodynamics & Heat Transfer', 'Workshop Technology'],
    3: ['Engineering Mathematics III', 'Object Oriented Programming', 'Electric Circuit Theory', 'Electronic Devices and Circuits', 'Digital Logic'],
    4: ['Applied Mathematics', 'Microprocessor', 'Discrete Structure', 'Theory of Computation', 'Numerical Methods'],
    5: ['Probability and Statistics', 'Data Structure and Algorithms', 'Computer Organization and Architecture', 'Computer Graphics', 'Object Oriented Analysis and Design'],
    6: ['Embedded System', 'Artificial Intelligence', 'Computer Networks', 'Database Management System', 'Software Engineering'],
    7: ['Project Management', 'Organization and Management', 'Simulation and Modeling', 'Elective I', 'Elective II'],
    8: ['Energy Environment and Society', 'Engineering Professional Practice', 'Project Work', 'Elective III']
};

// PDF URLs mapping - Replace with your actual PDF links
const pdfUrls = {
    'Engineering Mathematics I': 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    'Computer Programming': 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    // Add more PDF URLs for each subject here
    // Example: 'Subject Name': 'https://your-pdf-url.com/file.pdf',
};

// Store current semester selection
let currentSemester = null;


// ========== INITIALIZATION FUNCTION ==========

// Function to create and display all semester cards
function initializeSemesters() {
    const grid = document.getElementById('semesterGrid');
    
    // Loop through all 8 semesters
    for (let i = 1; i <= 8; i++) {
        const card = document.createElement('div');
        card.className = 'semester-card';
        card.innerHTML = `
            <h3>Semester ${i}</h3>
            <p>${semestersData[i].length} Subjects</p>
        `;
        // Add click event to show subjects
        card.onclick = () => showSubjects(i);
        grid.appendChild(card);
    }
}


// ========== NAVIGATION FUNCTIONS ==========

// Function to display subjects for selected semester
function showSubjects(semester) {
    currentSemester = semester;
    
    // Hide semester grid
    document.getElementById('semesters').style.display = 'none';
    
    // Show subjects section
    document.getElementById('subjectsSection').classList.add('active');
    document.getElementById('semesterTitle').textContent = `Semester ${semester} - Subjects`;
    
    // Populate subjects grid
    const subjectsGrid = document.getElementById('subjectsGrid');
    subjectsGrid.innerHTML = '';
    
    semestersData[semester].forEach(subject => {
        const item = document.createElement('div');
        item.className = 'subject-item';
        item.textContent = subject;
        item.onclick = () => showPDF(subject);
        subjectsGrid.appendChild(item);
    });
}

// Function to display PDF viewer for selected subject
function showPDF(subject) {
    // Hide subjects section
    document.getElementById('subjectsSection').classList.remove('active');
    
    // Show PDF viewer section
    document.getElementById('pdfViewerSection').classList.add('active');
    document.getElementById('pdfTitle').textContent = subject;
    
    // Load PDF in iframe
    const pdfUrl = pdfUrls[subject] || 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
    document.getElementById('pdfViewer').src = pdfUrl;
}


// ========== BACK BUTTON HANDLERS ==========

// Back to semesters button
document.getElementById('backToSemesters').onclick = () => {
    document.getElementById('subjectsSection').classList.remove('active');
    document.getElementById('semesters').style.display = 'block';
};

// Back to subjects button
document.getElementById('backToSubjects').onclick = () => {
    document.getElementById('pdfViewerSection').classList.remove('active');
    document.getElementById('subjectsSection').classList.add('active');
};


// ========== DARK MODE TOGGLE ==========

// Dark mode toggle functionality
document.getElementById('darkModeToggle').onclick = () => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Set new theme
    html.setAttribute('data-theme', newTheme);
    
    // Update button text
    const button = document.getElementById('darkModeToggle');
    button.textContent = newTheme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
};


// ========== SEARCH FUNCTIONALITY ==========

// Search bar functionality
document.getElementById('searchBar').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.semester-card');
    
    // Filter semester cards based on search term
    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(searchTerm) ? 'block' : 'none';
    });
});


// ========== APP INITIALIZATION ==========

// Initialize the application when page loads
initializeSemesters();