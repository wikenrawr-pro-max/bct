// ========== DATA SECTION ==========
const grade11Subjects = ['Physics', 'Chemistry', 'Mathematics', 'English', 'Nepali', 'Computer Science', 'Social Studies'];
const grade12Subjects = ['Physics', 'Chemistry', 'Mathematics', 'English', 'Nepali', 'Computer Science', 'Social Studies'];

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
        { code: 'ENCT 325', name: 'Elective I' }
    ],
    'Year III - Part II': [
        { code: 'ENCE 356', name: 'Engineering Economics' },
        { code: 'ENCT 351', name: 'Artificial Intelligence' },
        { code: 'ENCT 352', name: 'Software Engineering' },
        { code: 'ENCT 353', name: 'Simulation and Modeling' },
        { code: 'ENCT 354', name: 'Minor Project' },
        { code: 'ENCT 385', name: 'Elective II' }
    ],
    'Year IV - Part I': [
        { code: 'ENEX 416', name: 'Digital Signal Analysis and Processing' },
        { code: 'ENCT 411', name: 'Distributed and Cloud Computing' },
        { code: 'ENCT 412', name: 'ICT Project Management' },
        { code: 'ENEX 417', name: 'Energy, Environment and Social Engineering' },
        { code: 'ENCT 435', name: 'Elective III' },
        { code: 'ENCT 413', name: 'Project I' }
    ],
    'Year IV - Part II': [
        { code: 'ENCT 463', name: 'Network and Cyber Security' },
        { code: 'ENCT 465', name: 'Elective IV' },
        { code: 'ENCT 462', name: 'Internship' },
        { code: 'ENCT 461', name: 'Project II' }
    ]
};

const sampleChapters = ['Chapter 1: Introduction', 'Chapter 2: Core Concepts', 'Chapter 3: Advanced Theory', 'Chapter 4: Practical Applications'];

let navigationState = { program: null, level: null, content: null, subject: null };

// ========== CORE FUNCTIONS ==========

function hideAllSections() {
    ['programs', 'levelsSection', 'contentSection', 'subjectsSection', 'chaptersSection', 'pdfViewerSection']
    .forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove('active');
        if (id === 'programs') el.style.display = 'none';
    });
}

function showLevels(program) {
    navigationState.program = program;
    hideAllSections();
    const levelsSection = document.getElementById('levelsSection');
    document.getElementById('levelTitle').textContent = program === 'bct' ? 'BCT Engineering' : `Grade ${program.slice(-2)}`;
    
    const levelsGrid = document.getElementById('levelsGrid');
    levelsGrid.innerHTML = '';
    
    const levels = [
        { id: 'notes', icon: '📝', title: 'Notes', desc: 'Chapter-wise notes' },
        { id: 'syllabus', icon: '📋', title: 'Syllabus', desc: 'Course Syllabus' },
        { id: 'pastpapers', icon: '📄', title: 'Past Papers', desc: 'Old Questions' }
    ];

    levels.forEach(level => {
        const card = document.createElement('div');
        card.className = 'level-card';
        card.innerHTML = `<h3>${level.icon} ${level.title}</h3><p>${level.desc}</p>`;
        card.onclick = () => showContent(level.id);
        levelsGrid.appendChild(card);
    });
    levelsSection.classList.add('active');
}

function showContent(level) {
    navigationState.level = level;
    hideAllSections();
    const contentSection = document.getElementById('contentSection');
    const grid = document.getElementById('contentGrid');
    grid.innerHTML = '';

    if (navigationState.program === 'bct') {
        Object.keys(bctSemestersData).forEach(sem => {
            const card = document.createElement('div');
            card.className = 'content-card';
            card.innerHTML = `<h3>${sem}</h3>`;
            card.onclick = () => showSubjects(sem);
            grid.appendChild(card);
        });
    } else {
        const card = document.createElement('div');
        card.className = 'content-card';
        card.innerHTML = `<h3>Full Year</h3>`;
        card.onclick = () => showSubjects('Full Year');
        grid.appendChild(card);
    }
    contentSection.classList.add('active');
}

function showSubjects(content) {
    navigationState.content = content;
    hideAllSections();
    const section = document.getElementById('subjectsSection');
    const grid = document.getElementById('subjectsGrid');
    grid.innerHTML = '';

    let subjects = navigationState.program === 'bct' ? bctSemestersData[content] : 
                   (navigationState.program === 'grade11' ? grade11Subjects : grade12Subjects);

    subjects.forEach(sub => {
        const item = document.createElement('div');
        item.className = 'subject-item';
        item.innerHTML = typeof sub === 'object' ? `<b>${sub.code}</b><br>${sub.name}` : sub;
        item.onclick = () => {
            navigationState.subject = typeof sub === 'object' ? sub.name : sub;
            if (navigationState.level === 'notes') showChapters();
            else showPDF(navigationState.level);
        };
        grid.appendChild(item);
    });
    section.classList.add('active');
}

function showChapters() {
    hideAllSections();
    const section = document.getElementById('chaptersSection');
    const grid = document.getElementById('chaptersGrid');
    grid.innerHTML = '';

    sampleChapters.forEach(ch => {
        const item = document.createElement('div');
        item.className = 'chapter-item';
        item.textContent = ch;
        item.onclick = () => showPDF(ch);
        grid.appendChild(item);
    });
    section.classList.add('active');
}

function showPDF(title) {
    hideAllSections();
    const section = document.getElementById('pdfViewerSection');
    document.getElementById('pdfTitle').textContent = `${navigationState.subject} - ${title}`;
    document.getElementById('pdfViewer').src = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
    section.classList.add('active');
}

// ========== EVENT LISTENERS ==========

document.getElementById('darkModeToggle').onclick = () => {
    const theme = document.documentElement.getAttribute('data-theme');
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    document.getElementById('darkModeToggle').textContent = newTheme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
};

document.getElementById('backToPrograms').onclick = () => {
    hideAllSections();
    document.getElementById('programs').style.display = 'block';
};

document.getElementById('backToLevels').onclick = () => showLevels(navigationState.program);
document.getElementById('backToContent').onclick = () => showContent(navigationState.level);
document.getElementById('backToSubjects').onclick = () => showSubjects(navigationState.content);
document.getElementById('backFromPDF').onclick = () => navigationState.level === 'notes' ? showChapters() : showSubjects(navigationState.content);