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

## Setup Instructions

### Prerequisites
- Python 3.8 or higher
- pip (Python package installer)

### Installation

1. **Extract the project files**
   ```bash
   unzip resume-analyzer-package.zip
   cd resume-analyzer-package
   ```

2. **Create and activate virtual environment**
   ```bash
   python -m venv venv
   
   # On Windows:
   venv\Scripts\activate
   
   # On macOS/Linux:
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables**
   - The `.env` file is already included with the Together AI API key
   - If you need to update it, edit the `.env` file:
   ```
   TOGETHER_API_KEY=your_api_key_here
   FLASK_ENV=development
   SECRET_KEY=your_secret_key_here
   ```

5. **Run the application**
   ```bash
   python src/main.py
   ```

6. **Access the application**
   - Open your browser and go to: `http://localhost:5000`

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

## API Endpoints

### Health Check
```
GET /api/health
```
Returns the API status.

### Resume Analysis
```
POST /api/analyze
```
**Parameters:**
- `resume` (file): Resume file (PDF, DOC, DOCX, TXT)
- `jobDescription` (text): Job description text

**Response:**
```json
{
  "matchScore": 85,
  "suitability": {
    "overall": "Strong candidate with relevant experience",
    "strengths": ["Technical skills", "Experience"],
    "concerns": ["Missing certifications"]
  },
  "skillGaps": {
    "missing": ["AWS certification"],
    "weak": ["Leadership experience"]
  },
  "recommendations": [
    "Add AWS certification",
    "Highlight leadership experience"
  ],
  "optimizedResume": "<html>...</html>"
}
```

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

## Troubleshooting

### Common Issues

1. **API Key Error**
   - Ensure the Together AI API key is correctly set in `.env`
   - Check API key validity and quota

2. **File Upload Issues**
   - Verify file format is supported (PDF, DOC, DOCX, TXT)
   - Check file size (max 16MB)
   - Ensure file is not corrupted

3. **Analysis Fails**
   - Check internet connection for API calls
   - Verify job description is at least 50 characters
   - Ensure resume content is extractable

4. **Server Won't Start**
   - Verify Python version (3.8+)
   - Check all dependencies are installed
   - Ensure port 5000 is available

### Debug Mode
The application runs in debug mode by default. Check the console for detailed error messages.

## Development

### Adding New Features
1. **Frontend**: Modify files in `src/static/`
2. **Backend**: Add routes in `src/routes/`
3. **Database**: Update models in `src/models/`

### Testing
- Use the included `sample-resume.txt` for testing
- Test with various job descriptions
- Verify file upload with different formats

## Dependencies

### Python Packages
- Flask: Web framework
- flask-cors: Cross-origin resource sharing
- PyPDF2: PDF text extraction
- python-docx: DOCX file processing
- requests: HTTP client for API calls
- python-dotenv: Environment variable management

### Frontend Libraries
- Font Awesome: Icons
- Google Fonts: Typography

## License

This project is for educational and demonstration purposes.

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review the console logs for error messages
3. Verify API key and internet connection
4. Test with the provided sample files

## Future Enhancements

Potential improvements:
- Multiple resume format exports (PDF, Word)
- Resume templates and themes
- Batch processing for multiple jobs
- User accounts and history
- Advanced analytics and reporting
- Integration with job boards
- Mobile application

---

**Note**: This application uses the Together AI API which requires an internet connection and valid API key. The included API key is for demonstration purposes.

