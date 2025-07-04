# Quick Start Guide

AI Resume Analyzer is a web app that uses AI to compare your resume with a job description, highlight skill gaps, and generate ATS-friendly resumes. Upload your resume (PDF, DOC, DOCX, or TXT), paste a job description, and get instant, actionable feedback.

## 🚀 Get Started in 3 Minutes

### Option 1: Automatic Setup (Recommended)
```bash
python setup.py
```

### Option 2: Manual Setup

1. **Create virtual environment**
   ```bash
   python -m venv venv
   ```

2. **Activate virtual environment**
   ```bash
   # Windows:
   venv\Scripts\activate
   
   # macOS/Linux:
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the application**
   ```bash
   python src/main.py
   ```

5. **Open in browser**
   ```
   http://localhost:5000
   ```

## 🧪 Test the Application

1. **Upload the sample resume**
   - Use the included `sample-resume.txt` file
   - Or upload your own resume (PDF, DOC, DOCX, TXT)

2. **Add a job description**
   - Copy any job posting from LinkedIn, Indeed, etc.
   - Paste it in the job description area

3. **Click "Analyze with AI"**
   - Wait for the AI analysis (10-30 seconds)
   - Review the results and recommendations

## 🔧 Configuration

The `.env` file contains:
```
TOGETHER_API_KEY=tgp_v1_fg1pZSBY_mzFrUJ1h6PdTbpbWCDqcu52a7h9FLQzLuw
FLASK_ENV=development
SECRET_KEY=asdf#FGSgvasgf$5$WGT
```

## 📁 Key Files

- `src/main.py` - Flask application entry point
- `src/static/index.html` - Main web interface
- `src/routes/analysis.py` - AI analysis logic
- `requirements.txt` - Python dependencies
- `.env` - Environment variables (API keys)

## 🐛 Troubleshooting

**Server won't start?**
- Check Python version (3.8+)
- Ensure port 5000 is free
- Verify all dependencies installed

**Analysis fails?**
- Check internet connection
- Verify API key in .env file
- Ensure resume file is readable

**File upload issues?**
- Check file format (PDF, DOC, DOCX, TXT)
- Verify file size < 16MB
- Try with sample-resume.txt

## 💡 Tips

- Use detailed job descriptions for better analysis
- Try different resume formats to test compatibility
- Check browser console for any JavaScript errors
- The AI provides mock results if API fails (for demo purposes)

## 📞 Need Help?

1. Check the full README.md for detailed documentation
2. Review console logs for error messages
3. Test with the provided sample files first

