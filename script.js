// ========== DATA SECTION ==========

// Grade 11 Subjects (Sample - Replace with actual subjects)
const grade11Subjects = [
    'Physics', 'Chemistry', 'Mathematics', 'English', 
    'Computer Science', 'Biology', 'Accountancy', 'Economics'
];

// Grade 12 Subjects (Sample - Replace with actual subjects)
const grade12Subjects = [
    'Physics', 'Chemistry', 'Mathematics', 'English', 
    'Computer Science', 'Biology', 'Accountancy', 'Economics'
];

// BCT Semester Data with actual subjects
const bctSemestersData = {
    'Year I - Part I': [
        { code: 'ENSH 101', name: 'Engineering Mathematics I' },
        { code: 'ENCT 101', name: 'Computer Programming' },
        { code: 'ENME 101', name: 'Engineering Drawing' },
        { code: 'ENEX 101', name: 'Fundamental of Electrical and Electronics Engineering' },
        { code: 'ENSH 102', name: 'Engineering Physics' },
        { code: 'ENME 106', name: 'Engineering Workshop' }
    ],
    'Year I - Part II': [
        { code: 'ENSH 151', name: 'Engineering Mathematics II' },
        { code: 'ENCT 151', name: 'Object Oriented Programming' },
        { code: 'ENEX 152', name: 'Digital Logic' },
        { code: 'ENEX 151', name: 'Electronic Device and Circuits' },
        { code: 'ENSH 153', name: 'Engineering Chemistry' },
        { code: 'ENEE 154', name: 'Electrical Circuits and Machines' }
    ],
    'Year II - Part I': [
        { code: 'ENSH 201', name: 'Engineering Mathematics III' },
        { code: 'ENSH 204', name: 'Communication English' },
        { code: 'ENCT 201', name: 'Computer Graphics and Visualization' },
        { code: 'ENCT 202', name: 'Foundation of Data Science' },
        { code: 'ENCT 203', name: 'Theory of Computation' },
        { code: 'ENEX 201', name: 'Microprocessors' }
    ],
    'Year II - Part II': [
        { code: 'ENSH 252', name: 'Numerical Methods' },
        { code: 'ENEX 252', name: 'Instrumentation' },
        { code: 'ENEX 254', name: 'Electromagnetics' },
        { code: 'ENCT 252', name: 'Data Structure and Algorithm' },
        { code: 'ENCT 253', name: 'Data Communication' },
        { code: 'ENCT 254', name: 'Operating System' }
    ],
    'Year III - Part I': [
        { code: 'ENSH 304', name: 'Probability and Statistics' },
        { code: 'ENCT 301', name: 'Database Management System' },
        { code: 'ENCT 302', name: 'Web Application Programming' },
        { code: 'ENCT 303', name: 'Computer Organization and Architecture' },
        { code: 'ENCT 304', name: 'Computer Networks' },
        { code: 'ENCT 325-344', name: 'Elective I' }
    ],
    'Year III - Part II': [
        { code: 'ENCE 356', name: 'Engineering Economics' },
        { code: 'ENCT 351', name: 'Artificial Intelligence' },
        { code: 'ENCT 352', name: 'Software Engineering' },
        { code: 'ENCT 353', name: 'Simulation and Modeling' },
        { code: 'ENCT 354', name: 'Minor Project' },
        { code: 'ENCT 385-399', name: 'Elective II' }
    ],
    'Year IV - Part I': [
        { code: 'ENEX 416', name: 'Digital Signal Analysis and Processing' },
        { code: 'ENCT 411', name: 'Distributed and Cloud Computing' },
        { code: 'ENCT 412', name: 'ICT Project Management' },
        { code: 'ENEX 417', name: 'Energy, Environment and Social Engineering' },
        { code: 'ENCT 435-444', name: 'Elective III' },
        { code: 'ENCT 413', name: 'Project I' }
    ],
    'Year IV - Part II': [
        { code: 'ENCT 463', name: 'Network and Cyber Security' },
        { code: 'ENCT 465-474', name: 'Elective IV' },
        { code: 'ENCT 462', name: 'Internship' },
        { code: 'ENCT 461', name: 'Project II' }
    ]
};

// Sample chapters for demonstration (Replace with actual chapter data)
const sampleChapters = [
    'Chapter 1', 'Chapter 2', 'Chapter 3', 'Chapter 4', 
    'Chapter 5', 'Chapter 6', 'Chapter 7', 'Chapter 8'
];

// PDF URLs mapping - Replace with your actual PDF links
const pdfUrls = {
    // Format: 'Subject Name - Chapter/Type': 'URL'
    // Example: 'Engineering Mathematics I - Chapter 1': 'https://your-url.com/file.pdf'
};

// Navigation state
let navigationState = {
    currentProgram: null,
    currentLevel: null,
    currentContent: null,
    currentSubject: null
};


// ========== INITIALIZATION FUNCTION ==========

// Initialize the application
function init() {
    hideAllSections();
    document.getElementById('programs').style.display = 'block';
}


// ========== NAVIGATION FUNCTIONS ==========

// Show level options (Notes, Syllabus, Past Papers)
function showLevels(program) {
    navigationState.currentProgram = program;
    hideAllSections();
    
    const levelsSection = document.getElementById('levelsSection');
    const levelsGrid = document.getElementById('levelsGrid');
    const levelTitle = document.getElementById('levelTitle');
    
    // Set title based on program
    const titles = {
        'grade11': 'Grade 11',
        'grade12': 'Grade 12',
        'bct': 'BCT Engineering'
    };
    levelTitle.textContent = titles[program];
    
    // Create level cards
    levelsGrid.innerHTML = '';
    
    const levels = [
        { id: 'notes', icon: '📝', title: 'Notes', desc: 'Chapter-wise study notes' },
        { id: 'syllabus', icon: '📋', title: 'Syllabus', desc: 'Complete syllabus' },
        { id: 'pastpapers', icon: '📄', title: 'Past Papers', desc: 'Previous year questions' }
    ];
    
    levels.forEach(level => {
        const card = document.createElement('div');
        card.className = 'level-card';
        card.innerHTML = `
            <div style="font-size: 3rem; margin-bottom: 1rem;">${level.icon}</div>
            <h3>${level.title}</h3>
            <p>${level.desc}</p>
        `;
        card.onclick = () => showContent(level.id);
        levelsGrid.appendChild(card);
    });
    
    levelsSection.classList.add('active');
}

// Show content (Semesters/Years based on selection)
function showContent(level) {
    navigationState.currentLevel = level;
    hideAllSections();
    
    const contentSection = document.getElementById('contentSection');
    const contentGrid = document.getElementById('contentGrid');
    const contentTitle = document.getElementById('contentTitle');
    
    const program = navigationState.currentProgram;
    
    // Set title
    const titles = {
        'grade11': 'Grade 11',
        'grade12': 'Grade 12',
        'bct': 'BCT Engineering'
    };
    const levelNames = {
        'notes': 'Notes',
        'syllabus': 'Syllabus',
        'pastpapers': 'Past Papers'
    };
    contentTitle.textContent = `${titles[program]} - ${levelNames[level]}`;
    
    // Create content cards
    contentGrid.innerHTML = '';
    
    if (program === 'bct') {
        // BCT has 8 semesters (Year I-IV, Part I-II)
        Object.keys(bctSemestersData).forEach(semester => {
            const card = document.createElement('div');
            card.className = 'content-card';
            card.innerHTML = `
                <h3>${semester}</h3>
                <p>${bctSemestersData[semester].length} subjects</p>
            `;
            card.onclick = () => showSubjects(semester);
            contentGrid.appendChild(card);
        });
    } else {
        // Grade 11 and 12 - single year
        const card = document.createElement('div');
        card.className = 'content-card';
        const yearName = program === 'grade11' ? 'Grade 11' : 'Grade 12';
        const subjects = program === 'grade11' ? grade11Subjects : grade12Subjects;
        card.innerHTML = `
            <h3>${yearName}</h3>
            <p>${subjects.length} subjects</p>
        `;
        card.onclick = () => showSubjects(yearName);
        contentGrid.appendChild(card);
    }
    
    contentSection.classList.add('active');
}

// Show subjects for selected content
function showSubjects(content) {
    navigationState.currentContent = content;
    hideAllSections();
    
    const subjectsSection = document.getElementById('subjectsSection');
    const subjectsGrid = document.getElementById('subjectsGrid');
    const subjectsTitle = document.getElementById('subjectsTitle');
    
    subjectsTitle.textContent = `${content} - Select Subject`;
    subjectsGrid.innerHTML = '';
    
    let subjects = [];
    
    // Get subjects based on program
    if (navigationState.currentProgram === 'bct') {
        subjects = bctSemestersData[content] || [];
        subjects.forEach(subject => {
            const item = document.createElement('div');
            item.className = 'subject-item';
            item.innerHTML = `<strong>${subject.code}</strong><br>${subject.name}`;
            item.onclick = () => handleSubjectClick(subject.name);
            subjectsGrid.appendChild(item);
        });
    } else if (navigationState.currentProgram === 'grade11') {
        subjects = grade11Subjects;
        subjects.forEach(subject => {
            const item = document.createElement('div');
            item.className = 'subject-item';
            item.textContent = subject;
            item.onclick = () => handleSubjectClick(subject);
            subjectsGrid.appendChild(item);
        });
    } else if (navigationState.currentProgram === 'grade12') {
        subjects = grade12Subjects;
        subjects.forEach(subject => {
            const item = document.createElement('div');
            item.className = 'subject-item';
            item.textContent = subject;
            item.onclick = () => handleSubjectClick(subject);
            subjectsGrid.appendChild(item);
        });
    }
    
    subjectsSection.classList.add('active');
}

// Handle subject click based on level type
function handleSubjectClick(subject) {
    navigationState.currentSubject = subject;
    
    // If it's notes, show chapters; otherwise show PDF directly
    if (navigationState.currentLevel === 'notes') {
        showChapters(subject);
    } else {
        // For syllabus and past papers, show PDF directly
        showPDF(subject, navigationState.currentLevel);
    }
}

// Show chapters for notes
function showChapters(subject) {
    hideAllSections();
    
    const chaptersSection = document.getElementById('chaptersSection');
    const chaptersGrid = document.getElementById('chaptersGrid');
    const chaptersTitle = document.getElementById('chaptersTitle');
    
    chaptersTitle.textContent = `${subject} - Select Chapter`;
    chaptersGrid.innerHTML = '';
    
    // Create chapter items (using sample chapters)
    sampleChapters.forEach(chapter => {
        const item = document.createElement('div');
        item.className = 'chapter-item';
        item.textContent = chapter;
        item.onclick = () => showPDF(subject, chapter);
        chaptersGrid.appendChild(item);
    });
    
    chaptersSection.classList.add('active');
}

// Show PDF viewer
function showPDF(subject, type) {
    hideAllSections();
    
    const pdfSection = document.getElementById('pdfViewerSection');
    const pdfTitle = document.getElementById('pdfTitle');
    const pdfViewer = document.getElementById('pdfViewer');
    
    pdfTitle.textContent = `${subject} - ${type}`;
    
    // Get PDF URL from mapping or use dummy
    const pdfKey = `${subject} - ${type}`;
    const pdfUrl = pdfUrls[pdfKey] || 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
    
    pdfViewer.src = pdfUrl;
    pdfSection.classList.add('active');
}


// ========== HELPER FUNCTIONS ==========

// Hide all sections
function hideAllSections() {
    document.getElementById('programs').style.display = 'none';
    document.getElementById('levelsSection').classList.remove('active');
    document.getElementById('contentSection').classList.remove('active');
    document.getElementById('subjectsSection').classList.remove('active');
    document.getElementById('chaptersSection').classList.remove('active');
    document.getElementById('pdfViewerSection').classList.remove('active');
}


// ========== BACK BUTTON HANDLERS ==========

document.getElementById('backToPrograms').onclick = () => {
    navigationState = { currentProgram: null, currentLevel: null, currentContent: null, currentSubject: null };
    init();
};

document.getElementById('backToLevels').onclick = () => {
    showLevels(navigationState.currentProgram);
};

document.getElementById('backToContent').onclick = () => {
    showContent(navigationState.currentLevel);
};

document.getElementById('backToSubjects').onclick = () => {
    showSubjects(navigationState.currentContent);
};

document.getElementById('backFromPDF').onclick = () => {
    // If viewing notes chapter, go back to chapters
    if (navigationState.currentLevel === 'notes') {
        showChapters(navigationState.currentSubject);
    } else {
        // Otherwise go back to subjects
        showSubjects(navigationState.currentContent);
    }
};


// ========== DARK MODE TOGGLE ==========

document.getElementById('dark