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

const pdfUrls = {
    'Engineering Mathematics I': 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
};

let currentSemester = null;

function initializeSemesters() {
    const grid = document.getElementById('semesterGrid');
    for (let i = 1; i <= 8; i++) {
        const card = document.createElement('div');
        card.className = 'semester-card';
        card.innerHTML = `
            <h3>Semester ${i}</h3>
            <p>${semestersData[i].length} Subjects</p>
        `;
        card.onclick = () => showSubjects(i);
        grid.appendChild(card);
    }
}

// ... Copy all your functions (showSubjects, showPDF, etc.) here ...

initializeSemesters();