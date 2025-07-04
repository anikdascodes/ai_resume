# AI Resume Analyzer

AI Resume Analyzer is a web application that uses AI to evaluate resumes against job descriptions. Users upload their resume (PDF, DOC, DOCX, or TXT) and paste a job description; the app analyzes compatibility, identifies skill gaps, and generates actionable improvement suggestions along with an ATS-friendly resume. Built with Flask and integrated with Together AI's Llama model, it features a modern UI and supports multiple file formats for a seamless, insightful job application experience.

## Features

- **Resume Upload**: Support for PDF, DOC, DOCX, and TXT files
- **Job Description Analysis**: Paste any job description for analysis
- **AI-Powered Analysis**: Uses Meta's Llama 3.3 70B model via Together AI
- **Match Score**: Get compatibility percentage with the job
- **Skill Gap Analysis**: Identify missing skills and areas for improvement
- **ATS-Friendly Resume Generation**: Create optimized resumes for applicant tracking systems
- **Modern UI**: Responsive design with smooth animations and professional styling

## Technology Stack

### Frontend
- HTML5, CSS3, JavaScript
- Modern responsive design
- Font Awesome icons
- Google Fonts (Inter)

### Backend
- Flask (Python web framework)
- Together AI API integration
- File processing (PDF, DOCX, TXT)
- CORS enabled for frontend-backend communication

### AI Integration
- Together AI API
- Meta Llama 3.3 70B Instruct Turbo Free model
- Intelligent resume analysis and optimization

## Project Structure

```
resume-analyzer-package/
├── src/
│   ├── static/                 # Frontend files
│   │   ├── index.html         # Main HTML file
│   │   ├── styles.css         # CSS styles
│   │   ├── script.js          # JavaScript functionality
│   │   └── assets/            # Images and assets
│   ├── routes/                # Flask routes
│   │   ├── analysis.py        # AI analysis endpoints
│   │   └── user.py           # User management routes
│   ├── models/               # Database models
│   │   └── user.py          # User model
│   ├── database/            # SQLite database
│   └── main.py             # Flask application entry point
├── venv/                   # Python virtual environment
├── requirements.txt        # Python dependencies
├── .env                   # Environment variables (API keys)
├── sample-resume.txt      # Sample resume for testing
└── README.md             # This documentation
```



## Usage Guide

### 1. Upload Resume
- Click on the upload area in Step 1
- Select a resume file (PDF, DOC, DOCX, or TXT)
- The file will be processed and validated

### 2. Add Job Description
- Paste the complete job description in the textarea in Step 2
- Include requirements, responsibilities, and qualifications
- Minimum 50 characters required

### 3. Analyze with AI
- Click the "Analyze with AI" button in Step 3
- The system will process your resume and job description
- AI analysis typically takes 10-30 seconds

### 4. Review Results
- **Match Score**: See your compatibility percentage
- **Job Suitability**: Overall assessment with strengths and concerns
- **Skill Gaps**: Missing skills and areas for improvement
- **Recommendations**: Specific suggestions for improvement
- **Optimized Resume**: ATS-friendly resume tailored for the job

### 5. Download Resume
- Download the optimized resume in HTML format
- Use the generated resume for job applications



## File Processing

The application supports multiple file formats:

- **PDF**: Uses PyPDF2 for text extraction
- **DOCX**: Uses python-docx for document processing
- **DOC**: Converted to DOCX format for processing
- **TXT**: Direct text reading

## AI Integration Details

### Together AI Configuration
- **Model**: meta-llama/Llama-3.3-70B-Instruct-Turbo-Free
- **API**: Together AI REST API
- **Features**: 
  - Resume content analysis
  - Job requirement matching
  - Skill gap identification
  - ATS optimization suggestions
  - Resume content generation

### Analysis Process
1. **Text Extraction**: Extract text from uploaded resume
2. **Content Analysis**: Parse resume structure and content
3. **Job Matching**: Compare resume against job requirements
4. **Gap Analysis**: Identify missing skills and qualifications
5. **Optimization**: Generate improved resume content
6. **Scoring**: Calculate match percentage

## Security Features

- **Environment Variables**: API keys stored securely in .env file
- **File Validation**: Strict file type and size validation
- **CORS Protection**: Configured for secure frontend-backend communication
- **Input Sanitization**: All user inputs are validated and sanitized



