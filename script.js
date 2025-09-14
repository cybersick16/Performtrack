// --- MOCK DATA GENERATION ---
const firstNames = ["Vivaan", "Aditya", "Vihaan", "Arjun", "Sai", "Reyansh", "Ayaan", "Krishna", "Ishaan", "Saanvi", "Aanya", "Aadhya", "Aaradhya", "Anika", "Pari", "Diya", "Avni", "Myra", "Amaira", "James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "William", "Elizabeth", "David", "Susan", "Richard", "Jessica", "Sarah", "Charles", "Karen", "Thomas", "Nancy", "Daniel", "Lisa"];
const lastNames = ["Verma", "Gupta", "Singh", "Patel", "Kumar", "Shah", "Mehta", "Joshi", "Khan", "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson"];
const roles = ["Software Engineer", "Product Manager", "UI/UX Designer", "Data Analyst", "QA Engineer", "DevOps Specialist", "Marketing Lead", "Frontend Developer", "Backend Developer", "Full Stack Developer", "Cloud Engineer", "HR Manager", "Content Strategist"];
const departments = ["Technology", "Product", "Design", "Data Science", "Quality Assurance", "Operations", "Marketing", "Human Resources", "Finance"];
const locations = ["Ahmedabad, IN", "Mumbai, IN", "New York, US", "London, UK", "Tokyo, JP", "Bengaluru, IN", "Pune, IN"];

const generateJoinDate = () => {
    const year = Math.floor(Math.random() * 5) + 2020; // 2020-2024
    const month = Math.floor(Math.random() * 12) + 1;
    const day = Math.floor(Math.random() * 28) + 1;
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

const generatePerformanceHistory = () => {
    const data = [];
    const months = ["March", "April", "May", "June", "July", "August"];
    
    const generateKpis = () => ({
        quality: Math.floor(Math.random() * 21) + 75,
        productivity: Math.floor(Math.random() * 26) + 70,
        communication: Math.floor(Math.random() * 21) + 80,
        initiative: Math.floor(Math.random() * 31) + 65,
    });

    for (const month of months) {
        const kpis = generateKpis();
        const overallScore = Math.round((kpis.quality + kpis.productivity + kpis.communication + kpis.initiative) / 4);
        data.push({
            month,
            kpis,
            overallScore,
            feedback: "Consistent performance noted across all key metrics. Keep up the great work."
        });
    }
    return data;
};

const initialManagers = [
    { id: 'M101', name: 'Rohan Shah', email: 'rohan.shah@performtrack.com', password: 'password123', isManager: true, role: 'Engineering Manager', department: 'Technology', location: 'Mumbai, IN', joinDate: '2019-08-15', linkedin: 'https://linkedin.com/in/rohan-shah' },
    { id: 'M102', name: 'Priya Desai', email: 'priya.desai@performtrack.com', password: 'password123', isManager: true, role: 'Product Lead', department: 'Product', location: 'Ahmedabad, IN', joinDate: '2020-02-20', linkedin: 'https://linkedin.com/in/priya-desai' },
    { id: 'M103', name: 'Amit Singh', email: 'amit.singh@performtrack.com', password: 'password123', isManager: true, role: 'Design Director', department: 'Design', location: 'New York, US', joinDate: '2018-11-10', linkedin: 'https://linkedin.com/in/amit-singh' },
    { id: 'M104', name: 'Sunita Patil', email: 'sunita.patil@performtrack.com', password: 'password123', isManager: true, role: 'Marketing Head', department: 'Marketing', location: 'London, UK', joinDate: '2021-05-30', linkedin: 'https://linkedin.com/in/sunita-patil' },
];

const generateEmployeeData = (count, managers) => {
    const employees = [];
    employees.push({
        id: `E1001`,
        name: `Aarav Sharma`,
        email: `aarav.sharma1@performtrack.com`,
        password: 'password123',
        role: 'Senior Software Engineer',
        department: 'Technology',
        manager: managers[0].name,
        location: locations[Math.floor(Math.random() * locations.length)],
        joinDate: generateJoinDate(),
        linkedin: `https://linkedin.com/in/aarav-sharma`,
        performanceData: generatePerformanceHistory()
    });

    for (let i = 2; i <= count; i++) {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const manager = managers[Math.floor(Math.random() * managers.length)];
        employees.push({
            id: `E100${i}`,
            name: `${firstName} ${lastName}`,
            email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@performtrack.com`,
            password: 'password123',
            role: roles[Math.floor(Math.random() * roles.length)],
            department: departments[Math.floor(Math.random() * departments.length)],
            location: locations[Math.floor(Math.random() * locations.length)],
            joinDate: generateJoinDate(),
            manager: manager.name,
            linkedin: `https://linkedin.com/in/${firstName.toLowerCase()}-${lastName.toLowerCase()}`,
            performanceData: generatePerformanceHistory()
        });
    }
    return employees;
};

let initialEmployees = generateEmployeeData(50, initialManagers);
let allUsers = [...initialEmployees, ...initialManagers];

let appState = {
    currentUser: null,
    employees: initialEmployees,
    managers: initialManagers,
    selectedEmployee: null,
    searchTerm: '',
    loginRole: null, 
};

const LogoSVG = () => `
    <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="mr-3">
        <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#a855f7" />
                <stop offset="100%" stop-color="#ec4899" />
            </linearGradient>
        </defs>
        <path d="M20 85V15H50C66.5685 15 80 28.4315 80 45C80 61.5685 66.5685 75 50 75H35" stroke="url(#logoGradient)" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M50 45L80 15" stroke="url(#logoGradient)" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
`;

const AnimatedCard = (content, className = '') => `
    <div class="glass-card rounded-xl ${className}">
        ${content}
    </div>
`;

const renderLoginPage = () => {
    let loginContent;

    if (!appState.loginRole) {
        loginContent = `
            <div class="flex justify-center mb-6">
                ${LogoSVG()}
                <h1 class="text-3xl font-bold text-gray-100 self-center">PerformTrack</h1>
            </div>
            <p class="text-center text-gray-400 mb-8 animated-pulse">Select Your Role</p>
            <div class="space-y-4">
                 <button id="login-as-manager" class="w-full bg-pink-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-pink-700 neon-glow">
                    Manager
                </button>
                <button id="login-as-employee" class="w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-purple-700 neon-glow">
                    Employee
                </button>
            </div>
        `;
    } else {
        loginContent = `
            <div class="flex justify-center mb-4">
                 <button id="back-to-role-select" class="absolute top-4 left-4 text-pink-400 hover:text-pink-300">&larr; Back</button>
                <h1 class="text-2xl font-bold text-gray-100 self-center">Login as ${appState.loginRole}</h1>
            </div>
            <form id="login-form">
                <div class="space-y-4 mt-6">
                    <div>
                        <input type="email" id="email" placeholder="Email Address" required class="w-full px-4 py-3 bg-gray-900/50 border border-purple-500/50 text-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all" />
                    </div>
                    <div>
                        <input type="password" id="password" placeholder="Password" required class="w-full px-4 py-3 bg-gray-900/50 border border-purple-500/50 text-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all" />
                    </div>
                    <button type="submit" class="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:from-pink-700 hover:to-purple-700 neon-glow flex items-center justify-center">
                        Login
                    </button>
                </div>
            </form>
            <div id="login-error" class="text-red-400 text-center mt-4 text-sm hidden"></div>
        `;
    }

    return `
        <div class="min-h-screen flex items-center justify-center p-4 overflow-hidden">
            <div class="relative z-10 max-w-md w-full">
                ${AnimatedCard(`<div class="p-8 relative">${loginContent}</div>`)}
                <p class="text-center text-gray-500 text-xs mt-6">
                    &copy;2025 PerformTrack. All rights reserved.
                </p>
            </div>
        </div>
    `;
};

const renderHeader = (user) => `
    <header class="glass-card backdrop-blur-md shadow-sm sticky top-0 z-40 m-4 rounded-xl">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="flex items-center">
                    ${LogoSVG()}
                    <span class="text-xl font-bold text-gray-100">PerformTrack</span>
                </div>
                <div class="flex items-center space-x-4">
                    <span class="text-gray-400 hidden sm:block">Welcome, <span class="font-semibold text-pink-400">${user.name.split(' ')[0]}</span></span>
                    <button id="logout-button" class="text-sm font-medium text-pink-400 hover:text-pink-300 transition-colors duration-300">Logout</button>
                </div>
            </div>
        </div>
    </header>
`;

const KpiBar = (label, score) => {
     const getBarColor = (s) => {
        if (s >= 90) return 'bg-cyan-400';
        if (s >= 80) return 'bg-pink-500';
        if (s >= 70) return 'bg-purple-500';
        return 'bg-yellow-500';
    };
    return `
        <div>
            <div class="flex justify-between items-center mb-1">
                <span class="text-sm font-medium text-gray-300">${label}</span>
                <span class="text-sm font-bold text-gray-100">${score}</span>
            </div>
            <div class="w-full bg-gray-700/50 rounded-full h-2.5">
                <div class="${getBarColor(score)} h-2.5 rounded-full shadow-lg" style="width: ${score}%; box-shadow: 0 0 8px ${getBarColor(score).replace('bg-','').split('-')[0]} ;"></div>
            </div>
        </div>
    `;
}

const renderProfileCard = (user) => `
     <div class="p-6">
        <div class="text-center">
            <div class="w-24 h-24 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 mx-auto mb-4 flex items-center justify-center text-3xl font-bold text-pink-100 border-2 border-pink-400/50">
                ${user.name.charAt(0)}${user.name.split(' ')[1].charAt(0)}
            </div>
            <h2 class="text-2xl font-bold text-gray-100">${user.name}</h2>
            <p class="text-pink-400">${user.role}</p>
        </div>
        <div class="mt-6 space-y-3 text-sm text-gray-400">
            <p><strong class="text-gray-300">${user.isManager ? "Manager ID" : "Employee ID"}:</strong> ${user.id}</p>
            <p><strong class="text-gray-300">Department:</strong> ${user.department}</p>
            ${!user.isManager ? `<p><strong class="text-gray-300">Manager:</strong> ${user.manager}</p>` : ''}
             <p><strong class="text-gray-300">Location:</strong> ${user.location}</p>
            <p><strong class="text-gray-300">Join Date:</strong> ${user.joinDate}</p>
            <p><strong class="text-gray-300">Email:</strong> ${user.email}</p>
        </div>
        <a href="${user.linkedin}" target="_blank" rel="noopener noreferrer" class="mt-6 w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center neon-glow">
           <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"></path></svg>
            LinkedIn Profile
        </a>
    </div>
`;

const renderEmployeeDashboard = (user) => `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="lg:col-span-1">
                ${AnimatedCard(renderProfileCard(user))}
            </div>
            <div class="lg:col-span-2 space-y-8">
                ${AnimatedCard(`
                    <div class="p-6">
                        <h3 class="text-xl font-bold text-gray-100 mb-4">Performance Trend</h3>
                        <div class="h-64 relative">
                           <canvas id="performanceChart"></canvas>
                        </div>
                    </div>
                `)}
                ${AnimatedCard(`
                     <div class="p-6">
                        <h3 class="text-xl font-bold text-gray-100 mb-4">Monthly Breakdown</h3>
                        <div id="monthly-details-accordion" class="space-y-2">
                            ${user.performanceData.slice().reverse().map((perf) => `
                                <div>
                                    <button class="accordion-header w-full text-left flex justify-between items-center p-4 bg-gray-900/40 rounded-lg hover:bg-gray-900/60 transition-colors">
                                        <span class="font-semibold text-gray-200">${perf.month}</span>
                                        <svg class="w-5 h-5 text-gray-400 transition-transform transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </button>
                                    <div class="accordion-content">
                                        <div class="p-4 bg-gray-900/20 rounded-b-lg">
                                            <div class="space-y-4 mb-4">
                                                ${KpiBar('Quality of Work', perf.kpis.quality)}
                                                ${KpiBar('Productivity', perf.kpis.productivity)}
                                                ${KpiBar('Communication', perf.kpis.communication)}
                                                ${KpiBar('Initiative', perf.kpis.initiative)}
                                            </div>
                                            <div>
                                                <h4 class="font-semibold text-gray-200 mb-2">Manager Feedback</h4>
                                                <p class="text-sm text-gray-400 bg-gray-900/50 p-3 rounded-lg">${perf.feedback}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `)}
            </div>
        </div>
    </div>
`;

const renderManagerDashboard = (user, employees) => {
     const managedEmployees = employees
        .filter(e => e.manager === user.name)
        .filter(e => e.name.toLowerCase().includes(appState.searchTerm.toLowerCase()));

    return `
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div class="lg:col-span-1 space-y-8">
                     ${AnimatedCard(renderProfileCard(user))}
                     ${AnimatedCard(`
                        <div class="p-4 h-full">
                            <div class="flex justify-between items-center mb-2">
                                <h3 class="font-bold text-lg text-gray-100">Your Team (${managedEmployees.length})</h3>
                                <button id="add-employee-btn" class="text-sm bg-pink-600 hover:bg-pink-700 text-white font-bold py-1 px-3 rounded-lg neon-glow">
                                   + Add
                                </button>
                            </div>
                            <input type="text" id="search-input" placeholder="Search team..." value="${appState.searchTerm}" class="w-full px-3 py-2 mb-4 bg-gray-900/50 border border-purple-500/50 rounded-lg focus:ring-1 focus:ring-pink-500"/>
                            <div id="employee-list" class="overflow-y-auto max-h-[400px] pr-2">
                                ${managedEmployees.map(emp => `
                                    <div data-employee-id="${emp.id}" class="employee-item p-3 rounded-lg cursor-pointer mb-2 transition-all ${appState.selectedEmployee?.id === emp.id ? 'bg-pink-900/50' : 'hover:bg-purple-900/40'}">
                                        <p class="font-semibold text-gray-200">${emp.name}</p>
                                        <p class="text-sm text-gray-500">${emp.role}</p>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `)}
                </div>
                <div class="lg:col-span-2" id="employee-details-view">
                    ${renderSelectedEmployeeView(appState.selectedEmployee)}
                </div>
            </div>
        </div>
    `;
}

const renderSelectedEmployeeView = (employee) => {
    if (!employee) {
        return AnimatedCard(`<div class="p-6 flex items-center justify-center h-full min-h-[400px]"><p class="text-purple-400 text-lg animated-pulse">Select an employee to view their details.</p></div>`);
    }
    return AnimatedCard(`
        <div class="p-6">
            <div class="flex justify-between items-start">
                <div>
                    <h3 class="text-xl font-bold text-gray-100">${employee.name}</h3>
                    <p class="text-pink-400">${employee.role}</p>
                </div>
                <a href="${employee.linkedin}" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:text-blue-300"><svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"></path></svg></a>
            </div>
            <div class="mt-6 h-64 relative"><canvas id="performanceChart"></canvas></div>
            <div class="mt-8">
                <h4 class="font-bold text-lg mb-4 text-gray-100">Edit Performance Scores</h4>
                <div id="edit-scores" class="space-y-6">
                ${employee.performanceData.map(({ month, kpis }) => `
                    <fieldset class="border border-purple-500/30 rounded-lg p-4">
                        <legend class="px-2 font-semibold text-pink-400">${month}</legend>
                        <div class="grid grid-cols-2 gap-x-6 gap-y-4">
                            ${Object.keys(kpis).map(kpi => `
                                <div class="flex items-center justify-between">
                                    <label class="font-medium text-gray-300 text-sm capitalize">${kpi.replace(/([A-Z])/g, ' $1')}</label>
                                    <input type="number" value="${kpis[kpi]}" data-month="${month}" data-kpi="${kpi}" class="score-input bg-gray-900/50 border border-purple-500/50 text-gray-200 w-20 px-2 py-1 rounded-md text-center focus:ring-1 focus:ring-pink-500"/>
                                </div>
                            `).join('')}
                        </div>
                    </fieldset>
                `).join('')}
                </div>
                <button id="save-changes-button" class="mt-6 w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold py-2 px-4 rounded-lg hover:from-pink-700 hover:to-purple-700 neon-glow">Save Changes</button>
            </div>
        </div>
    `);
}

const renderAddEmployeeModal = () => `
    <div id="add-employee-modal" class="modal-overlay">
        <div class="glass-card rounded-xl w-full max-w-lg m-4 transform transition-transform scale-95" id="modal-content">
            <div class="p-6 border-b border-purple-500/30 flex justify-between items-center">
                <h3 class="text-xl font-bold text-gray-100">Add New Employee</h3>
                <button id="close-modal-btn" class="text-gray-400 hover:text-gray-200 text-2xl">&times;</button>
            </div>
            <form id="add-employee-form" class="p-6">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label for="newName" class="block text-sm font-medium text-pink-400 mb-1">Full Name</label>
                        <input type="text" id="newName" required class="w-full px-3 py-2 bg-gray-900/50 border border-purple-500/50 rounded-lg focus:ring-1 focus:ring-pink-500">
                    </div>
                    <div>
                        <label for="newEmail" class="block text-sm font-medium text-pink-400 mb-1">Email</label>
                        <input type="email" id="newEmail" required class="w-full px-3 py-2 bg-gray-900/50 border border-purple-500/50 rounded-lg focus:ring-1 focus:ring-pink-500">
                    </div>
                    <div>
                       <label for="newRole" class="block text-sm font-medium text-pink-400 mb-1">Role</label>
                       <select id="newRole" required class="w-full px-3 py-2 bg-gray-900/50 border border-purple-500/50 rounded-lg focus:ring-1 focus:ring-pink-500">
                           ${roles.map(r => `<option value="${r}">${r}</option>`).join('')}
                       </select>
                    </div>
                     <div>
                       <label for="newDepartment" class="block text-sm font-medium text-pink-400 mb-1">Department</label>
                       <select id="newDepartment" required class="w-full px-3 py-2 bg-gray-900/50 border border-purple-500/50 rounded-lg focus:ring-1 focus:ring-pink-500">
                           ${departments.map(d => `<option value="${d}">${d}</option>`).join('')}
                       </select>
                    </div>
                </div>
                <div class="mt-6 flex justify-end space-x-4">
                    <button type="button" id="cancel-add-btn" class="px-4 py-2 bg-purple-800/50 rounded-lg hover:bg-purple-800/80">Cancel</button>
                    <button type="submit" class="px-4 py-2 bg-pink-600 rounded-lg hover:bg-pink-700 font-semibold neon-glow">Add Employee</button>
                </div>
            </form>
        </div>
    </div>
`;

let chartInstance = null;
const renderChart = (canvasId, data) => {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    if(chartInstance) chartInstance.destroy();
    const chartData = { 
        labels: data.map(d => d.month), 
        datasets: [{ 
            label: 'Overall Score', 
            data: data.map(d => d.overallScore), 
            borderColor: '#ec4899', 
            backgroundColor: 'rgba(236, 72, 153, 0.2)', 
            tension: 0.4, 
            fill: true, 
            pointBackgroundColor: '#0d0c22', 
            pointBorderColor: '#ec4899',
            pointHoverBackgroundColor: '#ec4899',
            pointHoverBorderColor: '#0d0c22',
            pointRadius: 5, 
            pointHoverRadius: 7, 
            pointBorderWidth: 2,
            pointHoverBorderWidth: 2
        }] 
    };
    const options = { 
        responsive: true, 
        maintainAspectRatio: false, 
        scales: { 
            y: { beginAtZero: false, min: 40, max: 100, grid: { color: 'rgba(255, 255, 255, 0.1)' }, ticks: { color: '#9ca3af' } }, 
            x: { grid: { display: false }, ticks: { color: '#9ca3af' } } 
        }, 
        plugins: { 
            legend: { display: false }, 
            tooltip: { 
                backgroundColor: '#17172d', 
                titleColor: '#fff', 
                bodyColor: '#fff', 
                padding: 10, 
                cornerRadius: 8, 
                displayColors: false,
                borderColor: 'rgba(236, 72, 153, 0.5)',
                borderWidth: 1
            } 
        }, 
        animation: { duration: 1000, easing: 'easeInOutCubic' } 
    };
    chartInstance = new Chart(ctx, { type: 'line', data: chartData, options });
};

const root = document.getElementById('app-root');
const modalRoot = document.getElementById('modal-root');

function renderApp() {
    if (!appState.currentUser) {
        root.innerHTML = renderLoginPage();
         modalRoot.innerHTML = '';
    } else {
        let dashboardHtml = appState.currentUser.isManager 
            ? renderManagerDashboard(appState.currentUser, appState.employees) 
            : renderEmployeeDashboard(appState.currentUser);
        root.innerHTML = renderHeader(appState.currentUser) + `<main>${dashboardHtml}</main>`;
        modalRoot.innerHTML = appState.currentUser.isManager ? renderAddEmployeeModal() : '';
        
        setTimeout(() => {
            const data = appState.selectedEmployee ? appState.selectedEmployee.performanceData : appState.currentUser.performanceData;
            if(data) renderChart('performanceChart', data);
        }, 0);
    }
}

const toggleModal = (show) => {
    const modal = document.getElementById('add-employee-modal');
    const content = document.getElementById('modal-content');
    if (modal) {
        if (show) {
            modal.classList.add('visible');
            setTimeout(() => content.classList.remove('scale-95'), 10);
        } else {
            content.classList.add('scale-95');
            setTimeout(() => modal.classList.remove('visible'), 300);
        }
    }
};

document.addEventListener('click', e => {
    if (e.target.id === 'logout-button') {
        appState = { ...appState, currentUser: null, selectedEmployee: null, searchTerm: '', loginRole: null, employees: initialEmployees };
        renderApp();
    }

    if (e.target.id === 'login-as-manager') { appState.loginRole = 'Manager'; renderApp(); }
    if (e.target.id === 'login-as-employee') { appState.loginRole = 'Employee'; renderApp(); }
    if (e.target.id === 'back-to-role-select') { appState.loginRole = null; renderApp(); }
    
    const employeeItem = e.target.closest('.employee-item');
    if (employeeItem) {
        appState.selectedEmployee = appState.employees.find(emp => emp.id === employeeItem.dataset.employeeId);
        renderApp();
    }

    const accordionHeader = e.target.closest('.accordion-header');
    if(accordionHeader) {
        const content = accordionHeader.nextElementSibling;
        const icon = accordionHeader.querySelector('svg');
        const isOpening = !content.style.maxHeight;
        document.querySelectorAll('.accordion-content').forEach(item => {
            item.style.maxHeight = null;
            item.previousElementSibling.querySelector('svg').classList.remove('rotate-180');
        });
        if(isOpening) {
            content.style.maxHeight = content.scrollHeight + "px";
            icon.classList.add('rotate-180');
        }
    }
    
    if (e.target.id === 'save-changes-button') {
        const updatedPerformanceData = appState.selectedEmployee.performanceData.map(monthData => {
            const newKpis = {};
            let kpiSum = 0;
            document.querySelectorAll(`.score-input[data-month="${monthData.month}"]`).forEach(input => {
                const kpi = input.dataset.kpi;
                const score = Math.max(0, Math.min(100, Number(input.value)));
                newKpis[kpi] = score;
                kpiSum += score;
            });
            return { ...monthData, kpis: newKpis, overallScore: Math.round(kpiSum / Object.keys(newKpis).length) };
        });
         
         const updatedEmployees = appState.employees.map(emp => 
            emp.id === appState.selectedEmployee.id ? { ...emp, performanceData: updatedPerformanceData } : emp
         );
         appState.employees = updatedEmployees;
         appState.selectedEmployee.performanceData = updatedPerformanceData;

         const saveButton = document.getElementById('save-changes-button');
         saveButton.textContent = 'Saved!';
         saveButton.classList.add('bg-green-500');
         saveButton.classList.remove('bg-gradient-to-r', 'from-pink-600', 'to-purple-600');
         setTimeout(() => renderApp(), 1500);
    }

    if (e.target.id === 'add-employee-btn') { toggleModal(true); }
    if (e.target.id === 'close-modal-btn' || e.target.id === 'cancel-add-btn') { toggleModal(false); }
});

document.addEventListener('submit', e => {
    if (e.target.id === 'login-form') {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const errorDiv = document.getElementById('login-error');

        const userPool = appState.loginRole === 'Manager' ? allUsers.filter(u => u.isManager) : allUsers.filter(u => !u.isManager);
        const user = userPool.find(u => u.email === email && u.password === password);

        if (user) {
            appState.currentUser = user;
            appState.loginRole = null;
            if (!user.isManager) {
                appState.employees = [user];
            } else {
                appState.employees = initialEmployees;
            }
            renderApp();
        } else {
            errorDiv.textContent = 'Invalid credentials. Please try again.';
            errorDiv.classList.remove('hidden');
        }
    }
    if (e.target.id === 'add-employee-form') {
        e.preventDefault();
        const newName = document.getElementById('newName').value;
        const newEmail = document.getElementById('newEmail').value;
        const newRole = document.getElementById('newRole').value;
        const newDepartment = document.getElementById('newDepartment').value;
        const newId = `E${1000 + initialEmployees.length + 1}`;
        
        const newEmployee = {
            id: newId,
            name: newName,
            email: newEmail,
            password: 'password123',
            role: newRole,
            department: newDepartment,
            location: locations[Math.floor(Math.random() * locations.length)],
            joinDate: new Date().toISOString().split('T')[0],
            manager: appState.currentUser.name,
            linkedin: `https://linkedin.com/in/${newName.split(' ')[0].toLowerCase()}-${newName.split(' ')[1]?.toLowerCase() || ''}`,
            performanceData: generatePerformanceHistory()
        };

        initialEmployees.push(newEmployee);
        allUsers.push(newEmployee);
        appState.employees = initialEmployees;
        
        toggleModal(false);
        renderApp();
    }
});

document.addEventListener('input', e => {
    if (e.target.id === 'search-input') {
        appState.searchTerm = e.target.value;
        renderApp(); // Re-render to filter list
    }
});

renderApp();

// --- CHATBOT LOGIC ---

const chatbotButton = document.getElementById('chatbot-button');
const chatbotWindow = document.getElementById('chatbot-window');
const closeChatbotButton = document.getElementById('close-chatbot');
const chatbotForm = document.getElementById('chatbot-form');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotMessages = document.getElementById('chatbot-messages');

const managerCommands = [
    'view my team', 
    'edit performance for', 
    'add new employee',
    'what can I do as a manager',
    'view my profile'
];
const employeeCommands = [
    'view my performance',
    'what are the features',
    'what are KPIs',
    'view my profile'
];

let botState = 'initial';
let currentCommand = null;

const addBotMessage = (text) => {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'flex justify-start';
    messageDiv.innerHTML = `<div class="bg-purple-600/50 text-white p-3 rounded-r-lg rounded-tl-lg max-w-[80%]">${text}</div>`;
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
};

const addUserMessage = (text) => {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'flex justify-end';
    messageDiv.innerHTML = `<div class="bg-pink-600/50 text-white p-3 rounded-l-lg rounded-tr-lg max-w-[80%]">${text}</div>`;
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
};

const handleChatbotLogin = (role) => {
    appState.loginRole = role;
    renderApp();
    addBotMessage(`Okay, please provide your email address to log in as an ${role}.`);
    botState = 'login-email-entered';
};

const handleManagerCommand = (command, args) => {
    if (command === 'view my team') {
        const managedEmployees = initialEmployees.filter(e => e.manager === appState.currentUser.name);
        if (managedEmployees.length > 0) {
            addBotMessage("Here is your team. You can click on their name to view their details on the dashboard.");
            const listHtml = managedEmployees.map(emp => `
                <div class="my-2 p-2 bg-gray-700/50 rounded-lg cursor-pointer hover:bg-gray-600/50" onclick="selectEmployeeFromChat('${emp.id}')">
                    <span class="font-semibold text-pink-400">${emp.name}</span>
                    <br><span class="text-xs text-gray-400">${emp.role}</span>
                </div>
            `).join('');
            addBotMessage(listHtml);
        } else {
            addBotMessage("You don't have any employees assigned to you yet.");
        }
    } else if (command === 'edit performance for') {
        const empName = args.toLowerCase();
        const managedEmployees = initialEmployees.filter(e => e.manager === appState.currentUser.name);
        const employeeToEdit = managedEmployees.find(e => e.name.toLowerCase().includes(empName));
        if (employeeToEdit) {
            selectEmployeeFromChat(employeeToEdit.id);
            addBotMessage(`I've selected ${employeeToEdit.name}. You can now edit their performance scores directly on the dashboard. Don't forget to click 'Save Changes' when you're done.`);
        } else {
            addBotMessage(`I couldn't find an employee named "${args}" in your team. Please try again with a full name.`);
        }
    } else if (command === 'add new employee') {
        addBotMessage("I can't add an employee for you directly through this chat, but I have opened the 'Add New Employee' form for you. Please fill in the details on the dashboard.");
        toggleModal(true);
    } else if (command === 'what can I do as a manager') {
         addBotMessage("As a manager, you can:<br>- View your team's performance.<br>- Edit an employee's performance scores.<br>- Add new employees to your team.<br>- View your personal profile.");
    } else if (command === 'view my profile') {
        const profile = appState.currentUser;
        addBotMessage(`Your Profile:<br>Name: ${profile.name}<br>Role: ${profile.role}<br>Department: ${profile.department}<br>Join Date: ${profile.joinDate}`);
    } else if (command === 'tell me about performtrack') {
        addBotMessage("PerformTrack is a comprehensive performance management platform designed to streamline employee evaluations and team tracking. Our key goal is to provide a clear, data-driven view of performance trends, helping both managers and employees stay aligned and focused on growth.");
    }
};

const handleEmployeeCommand = (command) => {
    if (command === 'view my performance') {
         addBotMessage("I have updated your dashboard to show your performance trend and a monthly breakdown. You can see the details there.");
         appState.selectedEmployee = null; // Ensure the main dashboard view is for the user
         renderApp();
    } else if (command === 'what are the features') {
        addBotMessage(`PerformTrack offers several key features to help you manage and track performance:
        <ul class="list-disc list-inside space-y-2 mt-2">
            <li><b>Performance Dashboard:</b> A quick, at-a-glance view of your or your team's overall performance.</li>
            <li><b>Trend Chart:</b> Visualizes performance over time so you can easily spot trends.</li>
            <li><b>KPI Breakdown:</b> Breaks down scores for key metrics like Quality, Productivity, and Initiative.</li>
            <li><b>Feedback Management:</b> Allows managers to provide detailed, actionable feedback.</li>
            <li><b>Employee Management:</b> Managers can easily add and manage team members.</li>
        </ul>`);
    } else if (command === 'what are KPIs') {
        addBotMessage("KPI stands for Key Performance Indicator. In PerformTrack, the KPIs are: <br>- **Quality of Work**: The standard and excellence of your output.<br>- **Productivity**: The amount of work you complete.<br>- **Communication**: How effectively you communicate with your team.<br>- **Initiative**: Your proactiveness and ability to take charge.");
    } else if (command === 'view my profile') {
        const profile = appState.currentUser;
        addBotMessage(`Your Profile:<br>Name: ${profile.name}<br>Role: ${profile.role}<br>Department: ${profile.department}<br>Join Date: ${profile.joinDate}`);
    } else if (command === 'tell me about performtrack') {
         addBotMessage("PerformTrack is a comprehensive performance management platform designed to streamline employee evaluations and team tracking. Our key goal is to provide a clear, data-driven view of performance trends, helping both managers and employees stay aligned and focused on growth.");
    }
};

window.selectEmployeeFromChat = (employeeId) => {
     const employee = allUsers.find(emp => emp.id === employeeId);
     if (employee) {
         appState.selectedEmployee = employee;
         renderApp();
     }
};

chatbotButton.addEventListener('click', () => {
    chatbotWindow.classList.toggle('hidden');
    if (!chatbotWindow.classList.contains('hidden')) {
        chatbotInput.focus();
    }
});

closeChatbotButton.addEventListener('click', () => {
    chatbotWindow.classList.add('hidden');
});

chatbotForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = chatbotInput.value.trim();
    if (!message) return;

    addUserMessage(message);
    chatbotInput.value = '';

    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('log out')) {
        addBotMessage("You have been logged out.");
        document.getElementById('logout-button').click();
        botState = 'initial';
        return;
    }

    if (!appState.currentUser) {
        if (lowerMessage.includes('manager')) {
            handleChatbotLogin('Manager');
        } else if (lowerMessage.includes('employee')) {
            handleChatbotLogin('Employee');
        } else {
             addBotMessage("Please specify if you want to log in as a Manager or an Employee.");
        }
    } else {
        if (appState.currentUser.isManager) {
            let handled = false;
            const allCommands = [...managerCommands, 'tell me about performtrack'];
            for (const command of allCommands) {
                if (lowerMessage.startsWith(command)) {
                    const args = message.substring(command.length).trim();
                    handleManagerCommand(command, args);
                    handled = true;
                    break;
                }
            }
            if (!handled) {
                 addBotMessage(`I'm sorry, I don't understand that. As a manager, you can try: ${allCommands.join(', ')}.`);
            }
        } else { // Employee
            let handled = false;
            const allCommands = [...employeeCommands, 'tell me about performtrack'];
            for (const command of allCommands) {
                if (lowerMessage.includes(command)) {
                    handleEmployeeCommand(command);
                    handled = true;
                    break;
                }
            }
            if (!handled) {
                 addBotMessage(`I'm sorry, I don't understand that. As an employee, you can try: ${allCommands.join(', ')}.`);
            }
        }
    }
});