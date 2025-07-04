# Project Structure Overview

## 📁 Directory Layout

```
resume-analyzer-package/
├── 📄 README.md                    # Comprehensive documentation
├── 📄 QUICKSTART.md                # Quick setup guide
├── 📄 PROJECT_STRUCTURE.md         # This file
├── 📄 setup.py                     # Automated setup script
├── 📄 requirements.txt             # Python dependencies
├── 📄 .env                         # Environment variables (API keys)
├── 📄 sample-resume.txt            # Sample resume for testing
├── 📁 venv/                        # Python virtual environment
├── 📁 src/                         # Source code directory
│   ├── 📄 main.py                  # Flask application entry point
│   ├── 📁 static/                  # Frontend files (served by Flask)
│   │   ├── 📄 index.html           # Main HTML page
│   │   ├── 📄 styles.css           # CSS styling
│   │   ├── 📄 script.js            # JavaScript functionality
│   │   └── 📁 assets/              # Images and static assets
│   │       └── 📁 images/          # Image files
│   │           ├── 🖼️ ai-recruitment.jpg
│   │           ├── 🖼️ resume-sample.jpg
│   │           └── 🖼️ ai-future.webp
│   ├── 📁 routes/                  # Flask route handlers
│   │   ├── 📄 analysis.py          # AI analysis endpoints
│   │   └── 📄 user.py              # User management routes
│   ├── 📁 models/                  # Database models
│   │   └── 📄 user.py              # User model definition
│   └── 📁 database/                # Database files
│       └── 📄 app.db               # SQLite database
```

## 🔧 Core Components

### Frontend (src/static/)
- **index.html**: Single-page application with modern UI
- **styles.css**: Responsive CSS with animations and modern design
- **script.js**: Interactive JavaScript for file upload, form handling, and API communication
- **assets/**: Images and visual assets for the website

### Backend (src/)
- **main.py**: Flask application setup, CORS configuration, route registration
- **routes/analysis.py**: AI-powered resume analysis endpoints
- **routes/user.py**: User management (template from Flask generator)
- **models/user.py**: Database models (SQLite with SQLAlchemy)

### Configuration
- **.env**: Environment variables including Together AI API key
- **requirements.txt**: Python package dependencies
- **setup.py**: Automated setup and installation script

## 🚀 Key Features Implementation

### 1. File Upload System
**Location**: `src/static/script.js` + `src/routes/analysis.py`
- Drag & drop interface
- Multiple format support (PDF, DOC, DOCX, TXT)
- File validation and size limits
- Text extraction from various formats

### 2. AI Integration
**Location**: `src/routes/analysis.py`
- Together AI API integration
- Llama 3.3 70B model usage
- Structured prompt engineering
- Response parsing and validation
- Fallback mock responses

### 3. Resume Analysis Engine
**Location**: `src/routes/analysis.py` (functions: `create_analysis_prompt`, `parse_ai_response`)
- Resume content extraction
- Job description parsing
- Skill matching algorithms
- Gap analysis
- ATS optimization suggestions

### 4. User Interface
**Location**: `src/static/`
- Modern responsive design
- Step-by-step workflow
- Real-time feedback
- Loading animations
- Results visualization

## 🔌 API Endpoints

### Health Check
```
GET /api/health
Response: {"status": "healthy", "service": "resume-analyzer-api"}
```

### Resume Analysis
```
POST /api/analyze
Content-Type: multipart/form-data
Body: 
  - resume: File (PDF/DOC/DOCX/TXT)
  - jobDescription: String (min 50 chars)

Response: JSON with analysis results
```

## 🗄️ Data Flow

1. **Upload**: User uploads resume file → JavaScript validates → Stores in memory
2. **Input**: User enters job description → JavaScript validates length
3. **Submit**: Form data sent to `/api/analyze` endpoint
4. **Process**: Backend extracts text → Calls Together AI → Parses response
5. **Display**: Results shown in structured format with download options

## 🔒 Security Features

- **Environment Variables**: Sensitive data in .env file
- **File Validation**: Strict file type and size checking
- **Input Sanitization**: All user inputs validated
- **CORS Configuration**: Secure cross-origin requests
- **Error Handling**: Graceful error management

## 🧪 Testing Components

- **sample-resume.txt**: Pre-made resume for testing
- **Mock Analysis**: Fallback responses when AI API unavailable
- **Health Endpoint**: System status checking
- **Error Handling**: Comprehensive error scenarios

## 📦 Dependencies

### Python Backend
```
Flask==3.1.1              # Web framework
flask-cors==6.0.0          # Cross-origin resource sharing
PyPDF2==3.0.1             # PDF text extraction
python-docx==1.2.0        # DOCX file processing
requests==2.32.4          # HTTP client for API calls
python-dotenv==1.1.1      # Environment variable management
SQLAlchemy==2.0.36        # Database ORM
```

### Frontend Libraries
- Font Awesome 6.0.0 (Icons)
- Google Fonts - Inter (Typography)
- Native JavaScript (No frameworks)

## 🔄 Development Workflow

1. **Setup**: Run `python setup.py` or manual installation
2. **Development**: Modify files in `src/` directory
3. **Testing**: Use sample files and various job descriptions
4. **Debugging**: Check Flask console and browser developer tools
5. **Deployment**: Use Flask's built-in server or deploy to production

## 🎯 Customization Points

### Adding New File Formats
- Modify `ALLOWED_EXTENSIONS` in `analysis.py`
- Add extraction logic in `extract_text_from_file()`

### Enhancing AI Prompts
- Update `create_analysis_prompt()` function
- Modify response parsing in `parse_ai_response()`

### UI Improvements
- Edit `styles.css` for visual changes
- Modify `script.js` for functionality updates
- Update `index.html` for structure changes

### Database Extensions
- Add new models in `src/models/`
- Create migration scripts
- Update routes for new data handling

This structure provides a solid foundation for a production-ready resume analysis application with room for future enhancements and customizations.

