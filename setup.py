#!/usr/bin/env python3
"""
Setup script for AI Resume Analyzer
This script helps set up the application environment and dependencies.
"""

import os
import sys
import subprocess
import platform

def run_command(command, description):
    """Run a command and handle errors."""
    print(f"\n{description}...")
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        print(f"✓ {description} completed successfully")
        return True
    except subprocess.CalledProcessError as e:
        print(f"✗ {description} failed: {e}")
        print(f"Error output: {e.stderr}")
        return False

def check_python_version():
    """Check if Python version is compatible."""
    version = sys.version_info
    if version.major < 3 or (version.major == 3 and version.minor < 8):
        print("✗ Python 3.8 or higher is required")
        print(f"Current version: {version.major}.{version.minor}.{version.micro}")
        return False
    print(f"✓ Python version {version.major}.{version.minor}.{version.micro} is compatible")
    return True

def setup_virtual_environment():
    """Create and activate virtual environment."""
    if os.path.exists("venv"):
        print("✓ Virtual environment already exists")
        return True
    
    if not run_command("python -m venv venv", "Creating virtual environment"):
        return False
    
    return True

def install_dependencies():
    """Install required Python packages."""
    system = platform.system().lower()
    
    if system == "windows":
        pip_command = "venv\\Scripts\\pip install -r requirements.txt"
    else:
        pip_command = "venv/bin/pip install -r requirements.txt"
    
    return run_command(pip_command, "Installing dependencies")

def check_env_file():
    """Check if .env file exists and has required variables."""
    if not os.path.exists(".env"):
        print("✗ .env file not found")
        print("Creating .env file with default values...")
        with open(".env", "w") as f:
            f.write("TOGETHER_API_KEY=your_api_key_here\n")
            f.write("FLASK_ENV=development\n")
            f.write("SECRET_KEY=default_secret_key\n")
        print("✓ .env file created. Please update with your API key.")
        return False
    
    with open(".env", "r") as f:
        content = f.read()
        if "your_api_key_here" in content:
            print("⚠ Please update the TOGETHER_API_KEY in .env file")
            return False
    
    print("✓ .env file configured")
    return True

def main():
    """Main setup function."""
    print("=" * 50)
    print("AI Resume Analyzer - Setup Script")
    print("=" * 50)
    
    # Check Python version
    if not check_python_version():
        sys.exit(1)
    
    # Setup virtual environment
    if not setup_virtual_environment():
        print("✗ Failed to setup virtual environment")
        sys.exit(1)
    
    # Install dependencies
    if not install_dependencies():
        print("✗ Failed to install dependencies")
        sys.exit(1)
    
    # Check environment file
    env_configured = check_env_file()
    
    print("\n" + "=" * 50)
    print("Setup completed!")
    print("=" * 50)
    
    if not env_configured:
        print("\n⚠ IMPORTANT: Update your .env file with the correct API key before running the application.")
    
    print("\nTo start the application:")
    system = platform.system().lower()
    if system == "windows":
        print("1. venv\\Scripts\\activate")
    else:
        print("1. source venv/bin/activate")
    print("2. python src/main.py")
    print("3. Open http://localhost:5000 in your browser")
    
    print("\nFor more information, see README.md")

if __name__ == "__main__":
    main()

