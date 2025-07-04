// Global variables
let uploadedResumeFile = null;
let analysisResults = null;

// DOM elements
const resumeUpload = document.getElementById('resumeUpload');
const resumeFile = document.getElementById('resumeFile');
const uploadedResume = document.getElementById('uploadedResume');
const jobDescription = document.getElementById('jobDescription');
const analyzeBtn = document.getElementById('analyzeBtn');
const loadingContainer = document.getElementById('loadingContainer');
const resultsContainer = document.getElementById('resultsContainer');

// Multi-step navigation logic
const steps = [
    document.getElementById('multistep-step1'),
    document.getElementById('multistep-step2'),
    document.getElementById('multistep-step3')
];
const stepperIndicators = document.querySelectorAll('.step-indicator');
let currentStep = 0;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    updateCharacterCount();
    checkAnalyzeButtonState();
    // Multi-step navigation event listeners
    document.getElementById('toStep2Btn').addEventListener('click', function() {
        if (uploadedResumeFile) {
            showStep(1);
        } else {
            showNotification('Please upload a resume file to proceed.', 'error');
        }
    });
    document.getElementById('backToStep1Btn').addEventListener('click', function() {
        showStep(0);
    });
    document.getElementById('toStep3Btn').addEventListener('click', function() {
        if (jobDescription.value.trim().length >= 50) {
            showStep(2);
        } else {
            showNotification('Please enter a job description (min 50 characters).', 'error');
        }
    });
    document.getElementById('backToStep2Btn').addEventListener('click', function() {
        showStep(1);
    });
    // Start at step 0
    showStep(0);
});

// Initialize all event listeners
function initializeEventListeners() {
    // Resume upload functionality
    resumeUpload.addEventListener('click', () => resumeFile.click());
    resumeUpload.addEventListener('dragover', handleDragOver);
    resumeUpload.addEventListener('dragleave', handleDragLeave);
    resumeUpload.addEventListener('drop', handleDrop);
    resumeFile.addEventListener('change', handleFileSelect);
    
    // Job description functionality
    jobDescription.addEventListener('input', function() {
        updateCharacterCount();
        checkAnalyzeButtonState();
        activateStep(2);
    });
    
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            document.querySelector(target).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
}

// File upload handlers
function handleDragOver(e) {
    e.preventDefault();
    resumeUpload.classList.add('dragover');
}

function handleDragLeave(e) {
    e.preventDefault();
    resumeUpload.classList.remove('dragover');
}

function handleDrop(e) {
    e.preventDefault();
    resumeUpload.classList.remove('dragover');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFileUpload(files[0]);
    }
}

function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
        handleFileUpload(file);
    }
}

function handleFileUpload(file) {
    // Validate file type
    const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain'
    ];
    
    if (!allowedTypes.includes(file.type)) {
        showNotification('Please upload a PDF, DOC, DOCX, or TXT file.', 'error');
        return;
    }
    
    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
        showNotification('File size must be less than 10MB.', 'error');
        return;
    }
    
    uploadedResumeFile = file;
    
    // Show uploaded file
    const fileName = file.name;
    uploadedResume.querySelector('.file-name').textContent = fileName;
    uploadedResume.style.display = 'flex';
    resumeUpload.style.display = 'none';
    
    // Activate step 1 and enable step 2
    activateStep(1);
    checkAnalyzeButtonState();
    
    showNotification('Resume uploaded successfully!', 'success');
}

function removeFile(type) {
    if (type === 'resume') {
        uploadedResumeFile = null;
        uploadedResume.style.display = 'none';
        resumeUpload.style.display = 'block';
        resumeFile.value = '';
        checkAnalyzeButtonState();
    }
}

// Step management
function activateStep(stepNumber) {
    document.querySelectorAll('.analyzer-step').forEach(step => {
        step.classList.remove('active');
    });
    
    for (let i = 1; i <= stepNumber; i++) {
        const step = document.getElementById(`step${i}`);
        if (step) {
            step.classList.add('active');
        }
    }
}

// Character count for job description
function updateCharacterCount() {
    const charCount = document.querySelector('.char-count');
    const count = jobDescription.value.length;
    charCount.textContent = `${count} characters`;
}

function clearJobDescription() {
    jobDescription.value = '';
    updateCharacterCount();
    checkAnalyzeButtonState();
}

// Check if analyze button should be enabled
function checkAnalyzeButtonState() {
    const hasResume = uploadedResumeFile !== null;
    const hasJobDescription = jobDescription.value.trim().length >= 50;
    analyzeBtn.disabled = !(hasResume && hasJobDescription);
}

// Scroll to analyzer section
function scrollToAnalyzer() {
    document.getElementById('analyzer').scrollIntoView({
        behavior: 'smooth'
    });
}

// Main analysis function
async function startAnalysis() {
    if (!uploadedResumeFile || !jobDescription.value.trim()) {
        showNotification('Please upload a resume and enter a job description.', 'error');
        return;
    }
    
    // Show loading state
    document.querySelector('.multistep-container').style.display = 'none';
    loadingContainer.style.display = 'block';
    resultsContainer.style.display = 'none';
    
    // Animate loading steps
    animateLoadingSteps();
    
    try {
        // Prepare form data
        const formData = new FormData();
        formData.append('resume', uploadedResumeFile);
        formData.append('jobDescription', jobDescription.value.trim());
        
        // Call backend API
        const response = await fetch('/api/analyze', {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const results = await response.json();
        analysisResults = results;
        
        // Display results
        displayResults(results);
        
    } catch (error) {
        console.error('Analysis error:', error);
        
        // For demo purposes, show mock results
        showMockResults();
    }
}

// Animate loading steps
function animateLoadingSteps() {
    const steps = document.querySelectorAll('.loading-step');
    let currentStep = 0;
    
    const interval = setInterval(() => {
        if (currentStep > 0) {
            steps[currentStep - 1].classList.remove('active');
        }
        
        if (currentStep < steps.length) {
            steps[currentStep].classList.add('active');
            currentStep++;
        } else {
            clearInterval(interval);
        }
    }, 1500);
}

// Display analysis results
function displayResults(results) {
    loadingContainer.style.display = 'none';
    resultsContainer.style.display = 'block';
    
    // Update match score with animation
    animateMatchScore(results.matchScore || 75);
    
    // Update suitability content
    document.getElementById('suitabilityContent').innerHTML = formatSuitabilityContent(results.suitability);
    
    // Update skill gaps content
    document.getElementById('skillGapsContent').innerHTML = formatSkillGapsContent(results.skillGaps);
    
    // Update recommendations content
    document.getElementById('recommendationsContent').innerHTML = formatRecommendationsContent(results.recommendations);
    
    // Update resume preview
    document.getElementById('resumePreview').innerHTML = formatResumePreview(results.optimizedResume);
    
    // Scroll to results
    resultsContainer.scrollIntoView({ behavior: 'smooth' });
}

// Show mock results for demo
function showMockResults() {
    const mockResults = {
        matchScore: 78,
        suitability: {
            overall: "Good match for this position",
            strengths: [
                "Strong technical background in required technologies",
                "Relevant work experience in similar roles",
                "Educational background aligns with job requirements"
            ],
            concerns: [
                "Limited experience with some specific tools mentioned",
                "Could benefit from additional certifications"
            ]
        },
        skillGaps: {
            missing: [
                "AWS Cloud Certification",
                "Docker containerization experience",
                "Agile/Scrum methodology experience"
            ],
            weak: [
                "Leadership experience",
                "Public speaking skills",
                "Project management"
            ]
        },
        recommendations: [
            "Consider obtaining AWS certification to strengthen cloud computing credentials",
            "Highlight any containerization or DevOps experience more prominently",
            "Add specific metrics and achievements to quantify your impact",
            "Include relevant keywords from the job description naturally throughout your resume",
            "Consider adding a professional summary section at the top"
        ],
        optimizedResume: generateMockResume()
    };
    
    displayResults(mockResults);
}

// Animate match score
function animateMatchScore(targetScore) {
    const scoreElement = document.getElementById('matchScore');
    let currentScore = 0;
    const increment = targetScore / 50;
    
    const interval = setInterval(() => {
        currentScore += increment;
        if (currentScore >= targetScore) {
            currentScore = targetScore;
            clearInterval(interval);
        }
        scoreElement.textContent = Math.round(currentScore);
    }, 50);
}

// Format content functions
function formatSuitabilityContent(suitability) {
    if (!suitability) return '<p>Analysis not available.</p>';
    
    let html = `<div class="suitability-overall">
        <h4>Overall Assessment</h4>
        <p>${suitability.overall}</p>
    </div>`;
    
    if (suitability.strengths && suitability.strengths.length > 0) {
        html += `<div class="strengths">
            <h4><i class="fas fa-check-circle" style="color: #10b981;"></i> Strengths</h4>
            <ul>`;
        suitability.strengths.forEach(strength => {
            html += `<li>${strength}</li>`;
        });
        html += `</ul></div>`;
    }
    
    if (suitability.concerns && suitability.concerns.length > 0) {
        html += `<div class="concerns">
            <h4><i class="fas fa-exclamation-triangle" style="color: #f59e0b;"></i> Areas of Concern</h4>
            <ul>`;
        suitability.concerns.forEach(concern => {
            html += `<li>${concern}</li>`;
        });
        html += `</ul></div>`;
    }
    
    return html;
}

function formatSkillGapsContent(skillGaps) {
    if (!skillGaps) return '<p>Analysis not available.</p>';
    
    let html = '';
    
    if (skillGaps.missing && skillGaps.missing.length > 0) {
        html += `<div class="missing-skills">
            <h4><i class="fas fa-times-circle" style="color: #ef4444;"></i> Missing Skills</h4>
            <ul>`;
        skillGaps.missing.forEach(skill => {
            html += `<li>${skill}</li>`;
        });
        html += `</ul></div>`;
    }
    
    if (skillGaps.weak && skillGaps.weak.length > 0) {
        html += `<div class="weak-skills">
            <h4><i class="fas fa-arrow-up" style="color: #f59e0b;"></i> Areas for Improvement</h4>
            <ul>`;
        skillGaps.weak.forEach(skill => {
            html += `<li>${skill}</li>`;
        });
        html += `</ul></div>`;
    }
    
    return html || '<p>No significant skill gaps identified.</p>';
}

function formatRecommendationsContent(recommendations) {
    if (!recommendations || recommendations.length === 0) {
        return '<p>No specific recommendations available.</p>';
    }
    
    let html = '<div class="recommendations-list">';
    recommendations.forEach((rec, index) => {
        html += `<div class="recommendation-item">
            <div class="rec-number">${index + 1}</div>
            <p>${rec}</p>
        </div>`;
    });
    html += '</div>';
    
    return html;
}

function formatResumePreview(resumeContent) {
    if (!resumeContent) {
        return '<p>Optimized resume generation failed. Please try again.</p>';
    }
    
    return `<div class="resume-content">
        <div class="resume-header">
            <h3>Your Optimized ATS Resume</h3>
            <p>This resume has been optimized for Applicant Tracking Systems and tailored to match the job requirements.</p>
        </div>
        <div class="resume-body">
            ${resumeContent}
        </div>
    </div>`;
}

function generateMockResume() {
    return `
        <div class="resume-section">
            <h3>John Doe</h3>
            <p>Software Engineer | Full Stack Developer</p>
            <p>Email: john.doe@email.com | Phone: (555) 123-4567 | LinkedIn: linkedin.com/in/johndoe</p>
        </div>
        
        <div class="resume-section">
            <h4>Professional Summary</h4>
            <p>Experienced software engineer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Proven track record of delivering scalable web applications and leading cross-functional teams to achieve project goals.</p>
        </div>
        
        <div class="resume-section">
            <h4>Technical Skills</h4>
            <ul>
                <li><strong>Frontend:</strong> React, JavaScript, TypeScript, HTML5, CSS3, Redux</li>
                <li><strong>Backend:</strong> Node.js, Express.js, Python, RESTful APIs</li>
                <li><strong>Database:</strong> MongoDB, PostgreSQL, MySQL</li>
                <li><strong>Cloud:</strong> AWS (EC2, S3, Lambda), Docker, Kubernetes</li>
                <li><strong>Tools:</strong> Git, Jenkins, Jira, Agile/Scrum</li>
            </ul>
        </div>
        
        <div class="resume-section">
            <h4>Professional Experience</h4>
            <div class="job">
                <h5>Senior Software Engineer - Tech Solutions Inc. (2021-Present)</h5>
                <ul>
                    <li>Led development of customer-facing web application serving 100K+ users</li>
                    <li>Improved application performance by 40% through code optimization and caching strategies</li>
                    <li>Mentored junior developers and conducted code reviews</li>
                </ul>
            </div>
            
            <div class="job">
                <h5>Software Engineer - Digital Innovations LLC (2019-2021)</h5>
                <ul>
                    <li>Developed and maintained multiple React-based web applications</li>
                    <li>Collaborated with UX/UI designers to implement responsive designs</li>
                    <li>Integrated third-party APIs and payment processing systems</li>
                </ul>
            </div>
        </div>
        
        <div class="resume-section">
            <h4>Education</h4>
            <p><strong>Bachelor of Science in Computer Science</strong><br>
            University of Technology (2015-2019)</p>
        </div>
        
        <div class="resume-section">
            <h4>Certifications</h4>
            <ul>
                <li>AWS Certified Developer - Associate (2022)</li>
                <li>React Developer Certification (2021)</li>
            </ul>
        </div>
    `;
}

// Action functions
function downloadResume() {
    if (!analysisResults || !analysisResults.optimizedResume) {
        showNotification('No resume available for download.', 'error');
        return;
    }
    
    // Create a downloadable HTML file
    const resumeHTML = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Optimized Resume</title>
            <style>
                body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
                .resume-section { margin-bottom: 20px; }
                h3, h4, h5 { color: #333; }
                ul { padding-left: 20px; }
                .job { margin-bottom: 15px; }
            </style>
        </head>
        <body>
            ${analysisResults.optimizedResume}
        </body>
        </html>
    `;
    
    const blob = new Blob([resumeHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'optimized-resume.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('Resume downloaded successfully!', 'success');
}

function editResume() {
    showNotification('Resume editing feature coming soon!', 'info');
}

function startNewAnalysis() {
    // Reset the form
    uploadedResumeFile = null;
    analysisResults = null;
    
    // Reset UI
    uploadedResume.style.display = 'none';
    resumeUpload.style.display = 'block';
    resumeFile.value = '';
    jobDescription.value = '';
    updateCharacterCount();
    
    // Reset steps
    document.querySelectorAll('.analyzer-step').forEach(step => {
        step.classList.remove('active');
    });
    document.getElementById('step1').classList.add('active');
    
    // Hide results and show analyzer
    resultsContainer.style.display = 'none';
    loadingContainer.style.display = 'none';
    document.querySelector('.analyzer-container').style.display = 'block';
    
    // Scroll to analyzer
    scrollToAnalyzer();
    
    checkAnalyzeButtonState();
}

function shareResults() {
    if (navigator.share) {
        navigator.share({
            title: 'My Resume Analysis Results',
            text: `I got a ${analysisResults?.matchScore || 'high'}% match for this job position!`,
            url: window.location.href
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            showNotification('Link copied to clipboard!', 'success');
        });
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 15px;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function getNotificationColor(type) {
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#6366f1'
    };
    return colors[type] || '#6366f1';
}

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
        flex: 1;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 5px;
        border-radius: 50%;
        transition: background 0.3s ease;
    }
    
    .notification-close:hover {
        background: rgba(255,255,255,0.2);
    }
    
    .recommendations-list {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    
    .recommendation-item {
        display: flex;
        gap: 15px;
        align-items: flex-start;
    }
    
    .rec-number {
        background: #6366f1;
        color: white;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.8rem;
        font-weight: 600;
        flex-shrink: 0;
    }
    
    .recommendation-item p {
        margin: 0;
        line-height: 1.5;
    }
    
    .resume-content {
        font-family: 'Times New Roman', serif;
        line-height: 1.4;
    }
    
    .resume-header {
        text-align: center;
        margin-bottom: 30px;
        padding-bottom: 20px;
        border-bottom: 2px solid #6366f1;
    }
    
    .resume-section {
        margin-bottom: 20px;
    }
    
    .resume-section h3 {
        font-size: 1.8rem;
        margin-bottom: 5px;
        color: #333;
    }
    
    .resume-section h4 {
        font-size: 1.2rem;
        margin-bottom: 10px;
        color: #6366f1;
        border-bottom: 1px solid #e5e7eb;
        padding-bottom: 5px;
    }
    
    .resume-section h5 {
        font-size: 1rem;
        margin-bottom: 8px;
        color: #333;
    }
    
    .resume-section ul {
        margin-bottom: 10px;
    }
    
    .job {
        margin-bottom: 15px;
    }
    
    .suitability-overall,
    .strengths,
    .concerns,
    .missing-skills,
    .weak-skills {
        margin-bottom: 20px;
    }
    
    .suitability-overall h4,
    .strengths h4,
    .concerns h4,
    .missing-skills h4,
    .weak-skills h4 {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 10px;
        font-size: 1.1rem;
    }
    
    .suitability-overall ul,
    .strengths ul,
    .concerns ul,
    .missing-skills ul,
    .weak-skills ul {
        margin-left: 20px;
    }
    
    .suitability-overall li,
    .strengths li,
    .concerns li,
    .missing-skills li,
    .weak-skills li {
        margin-bottom: 5px;
        line-height: 1.4;
    }
`;
document.head.appendChild(notificationStyles);

// Multi-step navigation logic
function showStep(stepIdx) {
    steps.forEach((step, idx) => {
        step.style.display = idx === stepIdx ? 'block' : 'none';
    });
    stepperIndicators.forEach((indicator, idx) => {
        indicator.classList.toggle('active', idx === stepIdx);
        indicator.classList.toggle('completed', idx < stepIdx);
    });
    currentStep = stepIdx;
}

