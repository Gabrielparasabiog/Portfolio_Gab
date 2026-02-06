from flask import Flask, request, jsonify
from flask_cors import CORS
from functools import wraps
from datetime import datetime, timedelta
import re
import html

app = Flask(__name__)
CORS(app)

# Rate limiting storage (in production, use Redis)
rate_limit_store = {}
MAX_REQUESTS = 10
TIME_WINDOW = 60  # seconds

def rate_limit(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        client_ip = request.remote_addr
        now = datetime.now()
        
        if client_ip in rate_limit_store:
            requests, first_request = rate_limit_store[client_ip]
            if now - first_request < timedelta(seconds=TIME_WINDOW):
                if requests >= MAX_REQUESTS:
                    return jsonify({'response': 'Too many requests. Please wait a moment.'}), 429
                rate_limit_store[client_ip] = (requests + 1, first_request)
            else:
                rate_limit_store[client_ip] = (1, now)
        else:
            rate_limit_store[client_ip] = (1, now)
        
        return f(*args, **kwargs)
    return decorated_function

def sanitize_input(text):
    """Sanitize user input to prevent XSS and injection attacks"""
    if not text:
        return ""
    
    # Remove potentially dangerous characters
    text = html.escape(text)
    
    # Remove script tags and event handlers
    text = re.sub(r'<script[^>]*>.*?</script>', '', text, flags=re.IGNORECASE | re.DOTALL)
    text = re.sub(r'on\w+\s*=', '', text, flags=re.IGNORECASE)
    
    # Limit length
    if len(text) > 500:
        text = text[:500]
    
    return text.strip()

def validate_input(text):
    """Validate input format"""
    if not text or not isinstance(text, str):
        return False
    
    # Check for SQL injection patterns
    sql_patterns = [
        r'(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE)\b)',
        r'(\b(UNION|OR|AND)\s+\d+\s*=\s*\d+)',
        r'(\'|\"|;|--|\/\*|\*\/)'
    ]
    
    for pattern in sql_patterns:
        if re.search(pattern, text, re.IGNORECASE):
            return False
    
    # Check for XSS patterns
    xss_patterns = [
        r'<script',
        r'javascript:',
        r'onerror=',
        r'onload=',
        r'<iframe',
        r'<object',
        r'<embed'
    ]
    
    for pattern in xss_patterns:
        if re.search(pattern, text, re.IGNORECASE):
            return False
    
    return True

# Pre-defined Q&A pairs
qa_pairs = {
    # Who is Gabriel - Short intro with link
    "who_is_gabriel": {
        "keywords": ["who", "gabriel", "introduce", "about gabriel", "tell me about", "sino si gabriel", "sino ka", "who are you", "introduce yourself", "tell me about yourself", "what do you do", "what is your name", "name", "background", "bio", "biography"],
        "response": """Gabriel Paras Abiog is a passionate **AI Developer and Data Analyst** currently completing his Bachelor of Science in Computer Science at FEU Institute of Technology. 

He specializes in building intelligent systems, analyzing complex datasets, and delivering high-quality software solutions. With 4+ years of combined experience, he has successfully completed 15+ projects and holds 8 industry certifications.

**Key Highlights:**
• 15+ Projects Completed
• 8 Certifications
• 95%+ Test Coverage Excellence
• 4 AI/ML Projects

<a href="#about" class="chatbot-link">📖 Click here to view more about Gabriel</a>"""
    },
    
    # Experience questions
    "experience": {
        "keywords": ["experience", "worked", "work", "job", "position", "role", "intern", "developer", "employment", "work history", "career", "professional experience", "employment history", "work experience", "previous job", "current job", "where do you work", "where have you worked", "companies", "employer"],
        "response": """Gabriel has diverse experience in AI development and software engineering:

**Current Role:**
• AI Developer Intern (Fullstack) at FEU Institute of Technology
• Improved chatbot accuracy by 15%, reduced API response time by 40%

**Previous Roles:**
• AI Developer and Data Analyst - Deployed 5+ ML models, processed 100K+ data points
• Web Developer - Achieved 100% cross-browser compatibility
• Customer Service Representative - 95%+ satisfaction rate, zero compliance violations

<a href="#experience" class="chatbot-link">💼 Click here to view detailed experience</a>"""
    },
    
    # Projects questions
    "projects": {
        "keywords": ["project", "projects", "built", "developed", "created", "work", "portfolio", "application", "app", "applications", "what have you built", "what did you build", "show me projects", "your projects", "portfolio projects", "github", "code", "programming projects", "software projects", "what projects", "examples", "demos"],
        "response": """Gabriel has worked on 15+ exciting AI and software projects:

**Featured Projects:**
• **TALA: AI-Powered Calendar Assistant** - 95%+ test coverage, 80% conflict reduction
• **FEU Tech AI Chatbot** - 98%+ accuracy, 68% response time improvement
• **AI Skill Assessment** - 100% scoring accuracy, 5000+ assessments processed
• **AI Tutor** - 92% satisfaction rate, 35% improved learning outcomes

All projects feature comprehensive testing, modern tech stacks, and measurable results.

<a href="#projects" class="chatbot-link">🚀 Click here to view all projects with details</a>"""
    },
    
    # Technology questions
    "technologies": {
        "keywords": ["technology", "technologies", "tech", "skills", "programming", "languages", "tools", "stack", "framework", "what tech", "what tools"],
        "response": """Gabriel works with a comprehensive tech stack:

**Programming:** Python, JavaScript, Java, C++
**Frontend:** React.js, HTML, CSS
**Backend:** Node.js, Express.js, REST APIs
**Databases:** MongoDB
**Testing:** Postman, PyTest, JUnit, Selenium (95%+ coverage)
**AI/ML:** GPT-4, LangChain, OpenAI API, ML/DL
**Cloud:** AWS, Linux
**Security:** Kali Linux

He has 10+ technologies mastered with strong proficiency across the full stack.

<a href="#skills" class="chatbot-link">🛠️ Click here to view all skills and proficiency levels</a>"""
    },
    
    # Contact questions
    "contact": {
        "keywords": ["contact", "email", "reach", "get in touch", "hire", "available", "connect", "how to contact", "email address", "phone"],
        "response": """You can reach Gabriel through:

📧 **Email:** gabrielparasabiog@gmail.com
🌐 **Website:** www.reallygreatsite.com
📍 **Location:** 117 Patnuaby St. Brgy San Agustin Q.C

He's always open to discussing new opportunities, interesting projects, or collaborations!

<a href="#contact" class="chatbot-link">📞 Click here for contact information</a>"""
    },
    
    # Certifications questions
    "certifications": {
        "keywords": ["certification", "certifications", "certified", "certificate", "credentials", "qualifications", "cert"],
        "response": """Gabriel holds 8 industry-recognized certifications:

**Cisco:** DevNet Associate, CCNA Introduction to Networks
**IT Specialist:** Python, Java
**Google (2025):** Job Search with AI, Art of Prompting, Introduction to AI
**Coursera:** Google Project Management Professional Certificate

These certifications demonstrate his commitment to continuous learning and professional development.

<a href="#education" class="chatbot-link">🎓 Click here to view all certifications and education</a>"""
    },
    
    # Education questions
    "education": {
        "keywords": ["education", "degree", "university", "college", "school", "studied", "graduate", "student", "academic"],
        "response": """Gabriel is currently completing his **Bachelor of Science in Computer Science** at FEU Institute of Technology.

**Relevant Coursework:**
• Software Quality Assurance
• Software Engineering
• Database Management
• Artificial Intelligence
• Networking Fundamentals

He's also an active organizer of tech events like CS Expo 2024 and has participated in multiple tech conferences.

<a href="#education" class="chatbot-link">🎓 Click here to view full education and activities</a>"""
    },
    
    # Skills questions
    "skills": {
        "keywords": ["skill", "skills", "expertise", "proficient", "good at", "specialize", "what can", "capabilities"],
        "response": """Gabriel has a comprehensive skill set:

**Professional Skills:**
Testing (95%+ coverage), Automation, Scripting, Problem-solving, Communication, Debugging, Documentation, Optimization, Organization, Analysis, Design, Integration, Collaboration, Troubleshooting, Deployment

**Technical Skills:**
Strong proficiency in Python (90%), JavaScript (85%), Node.js (85%), React.js (80%), REST APIs (85%), Postman (90%), PyTest (90%), Selenium (85%), MongoDB (80%), and more.

He specializes in AI development, data analysis, and quality assurance!

<a href="#skills" class="chatbot-link">💪 Click here to view all skills with proficiency levels</a>"""
    },
    
    # Achievements and Stats
    "achievements": {
        "keywords": ["achievement", "achievements", "accomplishment", "stats", "statistics", "metrics", "results", "success"],
        "response": """Gabriel has impressive achievements:

**Key Metrics:**
• 15+ Projects Completed
• 10+ Technologies Mastered
• 5+ Team Collaborations
• 8 Certifications
• 95%+ Test Coverage
• 4 AI Projects

**Notable Results:**
• Improved chatbot accuracy by 15%
• Reduced API response time by 40-68%
• Processed 100,000+ data points
• Achieved 98%+ response accuracy
• Zero compliance violations

<a href="#stats" class="chatbot-link">📊 Click here to view all achievements and metrics</a>"""
    },
    
    # Experience Duration
    "experience_years": {
        "keywords": ["how long", "years of experience", "experience years", "how many years", "duration"],
        "response": """Gabriel has 4+ years of combined professional experience:

• **2 years** - Customer Service Representative (Teleperformance)
• **3 months** - AI Developer Intern (FEU Institute of Technology)
• **Current** - AI Developer and Data Analyst (FEU Institute of Technology)
• **2024** - Web Developer (IEMELIF Church Website)

Plus extensive project experience with 15+ completed projects.

<a href="#experience" class="chatbot-link">💼 Click here to view detailed experience</a>"""
    },
    
    # AI Projects
    "ai_projects": {
        "keywords": ["ai project", "ai projects", "machine learning", "ml project", "deep learning", "dl project", "chatbot", "ai chatbot"],
        "response": """Gabriel has worked on 4 major AI projects:

1. **FEU Tech AI Chatbot** - GPT-4 powered, 98%+ accuracy, 68% faster response time
2. **AI Skill Assessment** - Automated evaluation system, 100% scoring accuracy
3. **AI Tutor** - Personalized learning, 92% satisfaction, 35% improved outcomes
4. **TALA Calendar Assistant** - AI-powered scheduling, 80% conflict reduction

All projects use cutting-edge AI/ML technologies like GPT-4, LangChain, and custom ML models.

<a href="#projects" class="chatbot-link">🤖 Click here to view all AI projects</a>"""
    },
    
    # Testing and QA
    "testing_qa": {
        "keywords": ["testing", "qa", "quality assurance", "test coverage", "automated testing", "manual testing", "selenium", "pytest"],
        "response": """Gabriel is highly skilled in Quality Assurance:

**Testing Expertise:**
• 95%+ Test Coverage across all projects
• Automated testing with Selenium, PyTest, JUnit
• API testing with Postman
• Manual and integration testing
• Bug tracking and documentation

**Achievements:**
• Created 500+ unit and integration tests
• Identified and resolved 50+ critical bugs
• Reduced manual testing time by 60%
• Achieved 100% cross-browser compatibility

<a href="#skills" class="chatbot-link">🧪 Click here to view testing skills</a>"""
    },
    
    # Location
    "location": {
        "keywords": ["where", "location", "address", "live", "based", "from", "residence"],
        "response": """Gabriel is based in:

📍 **Address:** 117 Patnuaby St. Brgy San Agustin, Quezon City, Philippines

He's available for remote work and local opportunities in the Metro Manila area.

<a href="#contact" class="chatbot-link">📍 Click here for full contact information</a>"""
    },
    
    # Availability
    "availability": {
        "keywords": ["available", "hire", "hiring", "job", "opportunity", "open to work", "looking for", "recruiting"],
        "response": """Gabriel is open to new opportunities!

**Available For:**
• Full-time positions
• Part-time projects
• Freelance work
• Internships
• Collaborations

**Interested In:**
• AI/ML Development roles
• Data Analyst positions
• Full-stack development
• Quality Assurance roles

He's always excited to discuss interesting projects and opportunities!

<a href="#contact" class="chatbot-link">💼 Click here to get in touch</a>"""
    },
    
    # Portfolio
    "portfolio": {
        "keywords": ["portfolio", "website", "show me", "work samples", "examples", "demo"],
        "response": """You're currently viewing Gabriel's portfolio! 

This website showcases:
• Professional experience and achievements
• 15+ completed projects with details
• Technical skills and certifications
• Education and activities
• Contact information

Explore the sections above to learn more about his work and accomplishments.

<a href="#projects" class="chatbot-link">🚀 Click here to view projects</a>"""
    },
    
    # Python
    "python": {
        "keywords": ["python", "python programming", "python developer"],
        "response": """Gabriel is highly proficient in Python (90% proficiency):

**Python Expertise:**
• AI/ML development with Python
• Data analysis and processing
• Backend API development
• Automated testing with PyTest
• Scripting and automation

**Projects using Python:**
• TALA Calendar Assistant
• FEU Tech AI Chatbot
• AI Skill Assessment
• AI Tutor
• Data analysis pipelines

<a href="#skills" class="chatbot-link">🐍 Click here to view all Python skills</a>"""
    },
    
    # React
    "react": {
        "keywords": ["react", "react.js", "react developer", "frontend", "reactjs", "react framework"],
        "response": """Gabriel has strong React.js skills (80% proficiency):

**React Expertise:**
• Component-based development
• State management
• API integration
• Responsive UI design
• Modern React hooks

**Projects using React:**
• FEU Tech AI Chatbot (React.js frontend)
• AI Tutor (React.js interface)
• This portfolio website!

<a href="#projects" class="chatbot-link">⚛️ Click here to view React projects</a>"""
    },
    
    # JavaScript
    "javascript": {
        "keywords": ["javascript", "js", "javascript developer", "ecmascript", "es6"],
        "response": """Gabriel is proficient in JavaScript (85% proficiency):

**JavaScript Expertise:**
• ES6+ features and modern syntax
• Async/await and promises
• DOM manipulation
• API integration
• Frontend and backend development

**Used in:**
• React.js applications
• Node.js backend services
• API development
• Full-stack projects

<a href="#skills" class="chatbot-link">💻 Click here to view all JavaScript skills</a>"""
    },
    
    # Node.js
    "nodejs": {
        "keywords": ["node.js", "nodejs", "node", "backend", "server"],
        "response": """Gabriel has strong Node.js skills (85% proficiency):

**Node.js Expertise:**
• RESTful API development
• Express.js framework
• Server-side development
• Database integration (MongoDB)
• Real-time applications

**Projects using Node.js:**
• FEU Tech AI Chatbot backend
• AI Skill Assessment system
• Multiple API services

<a href="#projects" class="chatbot-link">🟢 Click here to view Node.js projects</a>"""
    },
    
    # MongoDB
    "mongodb": {
        "keywords": ["mongodb", "mongo", "database", "nosql", "db"],
        "response": """Gabriel is skilled in MongoDB (80% proficiency):

**MongoDB Expertise:**
• Database design and schema
• Query optimization
• Data modeling
• Aggregation pipelines
• Integration with Node.js

**Used in:**
• FEU Tech AI Chatbot
• AI Skill Assessment
• Data analytics projects

<a href="#skills" class="chatbot-link">🍃 Click here to view database skills</a>"""
    },
    
    # Java
    "java": {
        "keywords": ["java", "java programming", "java developer"],
        "response": """Gabriel is proficient in Java (80% proficiency):

**Java Expertise:**
• Object-oriented programming
• Application development
• Testing with JUnit
• Backend services
• Enterprise applications

**Projects using Java:**
• TALA Calendar Assistant
• Web development projects
• Testing frameworks

<a href="#projects" class="chatbot-link">☕ Click here to view Java projects</a>"""
    },
    
    # Testing Tools
    "testing_tools": {
        "keywords": ["postman", "selenium", "pytest", "junit", "test automation", "automation testing"],
        "response": """Gabriel is expert in testing tools:

**Testing Tools:**
• **Postman** (90%) - API testing and automation
• **PyTest** (90%) - Python testing framework
• **Selenium** (85%) - Web automation testing
• **JUnit** (75%) - Java unit testing

**Achievements:**
• Created 500+ automated tests
• Achieved 95%+ test coverage
• Reduced testing time by 60%

<a href="#skills" class="chatbot-link">🧪 Click here to view testing expertise</a>"""
    },
    
    # AWS
    "aws": {
        "keywords": ["aws", "amazon web services", "cloud", "cloud computing"],
        "response": """Gabriel has AWS experience (70% proficiency):

**AWS Knowledge:**
• Cloud services deployment
• Infrastructure management
• Service integration
• Scalable solutions

**Used for:**
• Project deployments
• Cloud-based applications
• Scalable infrastructure

<a href="#skills" class="chatbot-link">☁️ Click here to view cloud skills</a>"""
    },
    
    # Specific Projects
    "tala_project": {
        "keywords": ["tala", "calendar assistant", "calendar app", "scheduling"],
        "response": """**TALA: AI-Powered Calendar Assistant** is Gabriel's capstone project:

**Features:**
• AI-driven scheduling
• Conflict detection and resolution
• Calendar API integration
• Cross-platform compatibility

**Achievements:**
• 95%+ test coverage
• 80% reduction in scheduling conflicts
• 200+ test cases created
• Real-time synchronization

**Technologies:** Python, Java

<a href="#projects" class="chatbot-link">📅 Click here to view all project details</a>"""
    },
    
    "feu_chatbot": {
        "keywords": ["feu chatbot", "feu tech chatbot", "chatbot project"],
        "response": """**FEU Tech AI Chatbot** is a major AI project:

**Features:**
• GPT-4 powered responses
• LangChain integration
• Semantic search
• Real-time responses

**Achievements:**
• 98%+ response accuracy
• 68% response time improvement (2.5s → 0.8s)
• 1000+ daily queries handled
• 99.9% uptime

**Technologies:** GPT-4, LangChain, MongoDB, Node.js, Express.js, React.js

<a href="#projects" class="chatbot-link">🤖 Click here to view all AI projects</a>"""
    },
    
    # Education Details
    "feu": {
        "keywords": ["feu", "far eastern university", "institute of technology", "school", "university"],
        "response": """Gabriel studies at **FEU Institute of Technology**:

**Degree:** Bachelor of Science in Computer Science (In Progress)

**Relevant Coursework:**
• Software Quality Assurance
• Software Engineering
• Database Management
• Artificial Intelligence
• Networking Fundamentals

**Activities:**
• Organizer - CS Expo 2024
• Organizer - The Grand Cyber League
• Participant - Multiple tech events

<a href="#education" class="chatbot-link">🎓 Click here to view full education</a>"""
    },
    
    # Certifications Details
    "cisco_cert": {
        "keywords": ["cisco", "ccna", "devnet", "networking certification"],
        "response": """Gabriel holds Cisco certifications:

**Cisco Certifications:**
• **Cisco DevNet Associate** (Dec 2023)
• **CCNA: Introduction to Networks** (Jul 2023)

These certifications demonstrate expertise in networking fundamentals and network automation.

<a href="#education" class="chatbot-link">🎓 Click here to view all certifications</a>"""
    },
    
    "google_cert": {
        "keywords": ["google certification", "google ai", "google course"],
        "response": """Gabriel has multiple Google certifications (2025):

**Google Certifications:**
• Accelerate Your Job Search with AI
• Discover the Art of Prompting
• Introduction to AI

These demonstrate his commitment to AI and professional development.

<a href="#education" class="chatbot-link">🎓 Click here to view all certifications</a>"""
    },
    
    # Contact Details
    "email": {
        "keywords": ["email", "email address", "gmail", "contact email"],
        "response": """Gabriel's email address:

📧 **gabrielparasabiog@gmail.com**

He's responsive and always open to discussing opportunities, projects, or collaborations!

<a href="#contact" class="chatbot-link">📞 Click here for full contact information</a>"""
    },
    
    "website": {
        "keywords": ["website", "portfolio website", "personal website", "site"],
        "response": """Gabriel's website:

🌐 **www.reallygreatsite.com**

You're currently viewing his portfolio website which showcases all his work, projects, and achievements!

<a href="#contact" class="chatbot-link">🌐 Click here for contact details</a>"""
    },
    
    # Skills Details
    "programming_languages": {
        "keywords": ["programming languages", "languages", "what languages", "coding languages"],
        "response": """Gabriel is proficient in multiple programming languages:

**Primary Languages:**
• **Python** (90%) - AI/ML, data analysis, automation
• **JavaScript** (85%) - Full-stack development
• **Java** (80%) - Application development
• **C++** (75%) - System programming

**Usage:**
• Python for AI/ML projects and data analysis
• JavaScript for web development (React, Node.js)
• Java for enterprise applications
• C++ for system-level programming

<a href="#skills" class="chatbot-link">💻 Click here to view all technical skills</a>"""
    },
    
    "full_stack": {
        "keywords": ["full stack", "fullstack", "full-stack developer", "full stack developer"],
        "response": """Gabriel is a **Full-Stack Developer**:

**Frontend:**
• React.js, HTML, CSS
• Responsive design
• Modern UI/UX

**Backend:**
• Node.js, Express.js
• REST APIs
• Database integration

**Full-Stack Projects:**
• FEU Tech AI Chatbot (React + Node.js)
• AI Tutor (React + Python backend)
• This portfolio website

<a href="#projects" class="chatbot-link">🚀 Click here to view full-stack projects</a>"""
    },
    
    # Experience Details
    "internship": {
        "keywords": ["intern", "internship", "intern position", "current position"],
        "response": """Gabriel is currently an **AI Developer Intern (Fullstack)** at FEU Institute of Technology:

**Duration:** Dec 2024 – Jul 2025 (3 months)

**Key Achievements:**
• Improved chatbot accuracy by 15%
• Reduced API response time by 40%
• Created 500+ unit and integration tests
• Achieved 95%+ test coverage

**Responsibilities:**
• AI chatbot feature development
• API testing and optimization
• Bug tracking and documentation
• Frontend-backend collaboration

<a href="#experience" class="chatbot-link">💼 Click here to view full experience</a>"""
    },
    
    "teleperformance": {
        "keywords": ["teleperformance", "customer service", "csr", "call center"],
        "response": """Gabriel worked as **Customer Service Representative** at Teleperformance, Manila:

**Duration:** 2 years

**Key Achievements:**
• 95%+ customer satisfaction rate
• Zero compliance violations
• Top 10% performance rating
• Trained 15+ new team members

**Responsibilities:**
• Supported 1000+ healthcare and financial clients
• Maintained 100% HIPAA/financial compliance
• Handled 50+ calls daily
• First-call resolution rate: 95%+

<a href="#experience" class="chatbot-link">💼 Click here to view full experience</a>"""
    },
    
    # Achievements Details
    "test_coverage": {
        "keywords": ["test coverage", "coverage", "testing percentage", "how much test"],
        "response": """Gabriel maintains **95%+ test coverage** across all projects:

**Testing Excellence:**
• 500+ unit and integration tests created
• Automated testing pipelines
• Comprehensive test cases
• Continuous testing integration

**Tools Used:**
• PyTest for Python projects
• JUnit for Java projects
• Selenium for web automation
• Postman for API testing

**Results:**
• Reduced bugs by 70%
• Improved code quality
• Faster deployment confidence

<a href="#stats" class="chatbot-link">📊 Click here to view all achievements</a>"""
    },
    
    "projects_count": {
        "keywords": ["how many projects", "number of projects", "projects completed", "total projects"],
        "response": """Gabriel has completed **15+ projects**:

**Project Categories:**
• 4 Major AI/ML Projects
• Multiple web applications
• Data analysis projects
• Testing and QA projects
• Full-stack applications

**Featured Projects:**
• TALA Calendar Assistant
• FEU Tech AI Chatbot
• AI Skill Assessment
• AI Tutor
• And 11+ more projects!

<a href="#projects" class="chatbot-link">🚀 Click here to view all projects</a>"""
    },
    
    # Methodology & Approach
    "methodology": {
        "keywords": ["methodology", "approach", "how do you work", "work style", "process"],
        "response": """Gabriel follows best practices and methodologies:

**Development Approach:**
• Agile/Scrum methodologies
• Test-driven development (TDD)
• Continuous integration
• Code reviews and collaboration

**Quality Assurance:**
• Comprehensive testing (95%+ coverage)
• Bug tracking and documentation
• Performance optimization
• User experience focus

**Project Management:**
• Organized and structured approach
• Clear documentation
• Team collaboration
• Timely delivery

<a href="#experience" class="chatbot-link">💼 Click here to learn more</a>"""
    },
    
    # Goals & Objectives
    "goals": {
        "keywords": ["goals", "objectives", "future plans", "career goals", "aspirations"],
        "response": """Gabriel's goals and aspirations:

**Career Goals:**
• Continue growing as an AI/ML developer
• Contribute to innovative tech solutions
• Lead impactful projects
• Mentor and share knowledge

**Focus Areas:**
• Advanced AI/ML technologies
• Full-stack development excellence
• Quality assurance leadership
• Data-driven solutions

**Values:**
• Continuous learning
• Quality and excellence
• Innovation and creativity
• Collaboration and teamwork

<a href="#about" class="chatbot-link">📖 Click here to learn more about Gabriel</a>"""
    },
    
    # Team Work
    "teamwork": {
        "keywords": ["team", "teamwork", "collaboration", "team player", "work with others"],
        "response": """Gabriel is an excellent team collaborator:

**Team Experience:**
• 5+ successful team collaborations
• Cross-functional team work
• Agile team environments
• Remote collaboration

**Collaboration Skills:**
• Clear communication
• Active participation
• Knowledge sharing
• Conflict resolution

**Team Projects:**
• IEMELIF Church Website (Team of 4)
• CS Expo 2024 (Event organization)
• Multiple academic projects

<a href="#experience" class="chatbot-link">👥 Click here to view team projects</a>"""
    },
    
    # Challenges & Problem Solving
    "challenges": {
        "keywords": ["challenge", "challenges", "problems", "difficulties", "obstacles"],
        "response": """Gabriel has overcome various challenges:

**Technical Challenges:**
• Optimized API response time by 68%
• Reduced scheduling conflicts by 80%
• Achieved 100% cross-browser compatibility
• Processed 100,000+ data points efficiently

**Problem-Solving Approach:**
• Analytical thinking
• Systematic debugging
• Research and learning
• Collaborative solutions

**Results:**
• Improved system performance
• Enhanced user experience
• Reliable solutions
• Measurable improvements

<a href="#projects" class="chatbot-link">🚀 Click here to see problem-solving in action</a>"""
    },
    
    # Timeline & Schedule
    "timeline": {
        "keywords": ["when", "timeline", "schedule", "availability", "when available", "start date"],
        "response": """Gabriel's availability and timeline:

**Current Status:**
• AI Developer Intern until Jul 2025
• Available for new opportunities
• Open to discussions

**Availability:**
• Full-time positions
• Part-time projects
• Freelance work
• Remote or local (Metro Manila)

**Response Time:**
• Quick response to inquiries
• Flexible scheduling
• Professional communication

<a href="#contact" class="chatbot-link">📞 Click here to get in touch</a>"""
    },
    
    # Salary & Rates (Professional)
    "compensation": {
        "keywords": ["salary", "rate", "compensation", "pay", "fee", "price", "cost"],
        "response": """For compensation and rates:

Gabriel is open to discussing compensation based on:
• Project scope and complexity
• Time commitment required
• Role and responsibilities
• Market standards

**Best to discuss:**
• Via email for detailed discussion
• Based on specific project needs
• Mutually beneficial arrangements

Please reach out to discuss opportunities and we can discuss compensation details!

<a href="#contact" class="chatbot-link">📧 Click here to contact Gabriel</a>"""
    },
    
    # Hobbies & Interests
    "hobbies": {
        "keywords": ["hobby", "hobbies", "interests", "what do you like", "free time", "passion"],
        "response": """Gabriel's interests and passions:

**Professional Interests:**
• AI and Machine Learning
• Data Analysis
• Software Development
• Quality Assurance
• Emerging Technologies

**Activities:**
• Organizing tech events (CS Expo 2024)
• Participating in tech conferences
• Continuous learning and upskilling
• Contributing to projects

**Values:**
• Innovation and creativity
• Quality and excellence
• Knowledge sharing
• Professional growth

<a href="#about" class="chatbot-link">📖 Click here to learn more</a>"""
    },
    
    # Remote Work
    "remote": {
        "keywords": ["remote", "remote work", "work from home", "wfh", "remote position"],
        "response": """Gabriel is open to remote work:

**Remote Work Experience:**
• Comfortable with remote collaboration
• Effective communication skills
• Self-motivated and organized
• Time management expertise

**Remote Capabilities:**
• Video conferencing
• Project management tools
• Version control (Git)
• Cloud-based development

**Available For:**
• Fully remote positions
• Hybrid arrangements
• Remote-first companies

<a href="#contact" class="chatbot-link">💼 Click here to discuss remote opportunities</a>"""
    },
    
    # Languages (Spoken)
    "spoken_languages": {
        "keywords": ["language", "languages", "speak", "fluent", "bilingual", "english", "tagalog", "filipino"],
        "response": """Gabriel's language skills:

**Languages:**
• **English** - Fluent (Professional)
• **Filipino/Tagalog** - Native

**Communication:**
• Professional English communication
• Technical documentation
• Client interactions
• Team collaboration

**Experience:**
• 2 years customer service (English)
• International client support
• Technical presentations

<a href="#contact" class="chatbot-link">💬 Click here to get in touch</a>"""
    },
    
    # References
    "references": {
        "keywords": ["reference", "references", "recommendation", "recommendations", "testimonial"],
        "response": """For references and recommendations:

Gabriel can provide professional references from:
• FEU Institute of Technology (Current employer)
• Previous employers
• Project collaborators
• Academic advisors

**Best Practice:**
Contact Gabriel directly via email to request references. He's happy to provide professional recommendations based on your needs.

<a href="#contact" class="chatbot-link">📧 Click here to request references</a>"""
    },
    
    # Portfolio Details
    "portfolio_details": {
        "keywords": ["portfolio details", "portfolio info", "what's in portfolio", "portfolio content"],
        "response": """This portfolio includes:

**Sections:**
• **About** - Introduction and background
• **Stats** - Key achievements and metrics
• **Skills** - Technical and professional skills
• **Experience** - Work history and roles
• **Projects** - 15+ completed projects
• **Education** - Academic background and certifications
• **Contact** - Ways to reach Gabriel

**Features:**
• Interactive chatbot (you're using it!)
• Dark/Light mode
• Responsive design
• 3D animations
• Detailed project information

Explore the sections above to learn more!

<a href="#projects" class="chatbot-link">🚀 Start exploring the portfolio</a>"""
    },
    
    # Help
    "help": {
        "keywords": ["help", "what can you do", "what questions", "how to use", "commands", "assistance"],
        "response": """I can help you learn about Gabriel! Here's what you can ask:

**About Gabriel:**
• "Who is Gabriel?"
• "Tell me about yourself"
• "What do you do?"

**Experience & Work:**
• "What's your experience?"
• "Where do you work?"
• "Tell me about your jobs"

**Projects:**
• "What projects have you done?"
• "Show me your work"
• "Tell me about TALA"

**Skills & Tech:**
• "What technologies do you use?"
• "What are your skills?"
• "Do you know Python/React?"

**Contact:**
• "How can I contact you?"
• "What's your email?"
• "Are you available for work?"

**Just ask naturally - I understand many ways to ask questions!**"""
    },
    
    # Greetings
    "greetings": {
        "keywords": ["hello", "hi", "hey", "greetings", "good morning", "good afternoon", "good evening"],
        "response": """Hello! 👋 

I'm here to help you learn about Gabriel Paras Abiog, an AI Developer and Data Analyst.

**You can ask me:**
• Who is Gabriel?
• About his experience and projects
• His skills and technologies
• How to contact him
• And much more!

What would you like to know? 😊"""
    },
    
    # Thanks
    "thanks": {
        "keywords": ["thank", "thanks", "thank you", "appreciate", "grateful"],
        "response": """You're welcome! 😊

I'm glad I could help you learn about Gabriel. If you have any more questions, feel free to ask!

**You might also want to:**
• View his projects
• Check out his skills
• See his achievements
• Get in touch

Is there anything else you'd like to know?"""
    },
    
    # Goodbye
    "goodbye": {
        "keywords": ["bye", "goodbye", "see you", "farewell", "later"],
        "response": """Goodbye! 👋

Thanks for visiting Gabriel's portfolio. Feel free to come back anytime if you have more questions!

**Don't forget to:**
• Check out his projects
• View his contact information
• Explore the portfolio sections

Have a great day! 😊"""
    },
    
    # Default response
    "default": {
        "keywords": [],
        "response": """Hello! I'm here to help you learn about Gabriel Paras Abiog, an AI Developer and Data Analyst.

**Popular Questions:**
• "Who is Gabriel?" - Introduction
• "Tell me about your projects" - See his work
• "What technologies do you use?" - Tech stack
• "What are your achievements?" - Metrics and stats
• "What is your experience?" - Work history
• "How can I contact you?" - Contact info

**You can also ask about:**
• Specific projects (TALA, FEU Chatbot, etc.)
• Specific technologies (Python, React, Node.js, etc.)
• Education and certifications
• Testing and QA expertise
• AI/ML projects
• Availability for work
• Location and contact details
• Team work and collaboration
• And much more!

**Just ask naturally - I understand many ways to phrase questions!**

<a href="#about" class="chatbot-link">📖 Or explore the portfolio sections above</a>"""
    }
}

def find_best_match(user_message):
    """Find the best matching Q&A pair based on keywords"""
    user_message_lower = user_message.lower()
    
    # Count keyword matches for each category
    match_scores = {}
    for category, data in qa_pairs.items():
        if category == "default":
            continue
        score = sum(1 for keyword in data["keywords"] if keyword in user_message_lower)
        if score > 0:
            match_scores[category] = score
    
    # Return the category with the highest score
    if match_scores:
        best_match = max(match_scores, key=match_scores.get)
        return qa_pairs[best_match]["response"]
    
    # If no match, try to provide a helpful default response
    return qa_pairs["default"]["response"]

@app.route('/api/chat', methods=['POST'])
@rate_limit
def chat():
    try:
        # Validate request
        if not request.is_json:
            return jsonify({'response': 'Invalid request format.'}), 400
        
        data = request.json
        if not data or 'message' not in data:
            return jsonify({'response': 'Message is required.'}), 400
        
        user_message = str(data.get('message', '')).strip()
        user_language = data.get('language', 'en')  # Get language from request
        
        # Validate and sanitize input
        if not user_message:
            return jsonify({'response': 'Please send a message!'}), 400
        
        if not validate_input(user_message):
            return jsonify({'response': 'Invalid input detected. Please use only text.'}), 400
        
        user_message = sanitize_input(user_message)
        
        # Additional length check
        if len(user_message) > 500:
            return jsonify({'response': 'Message too long. Maximum 500 characters.'}), 400
        
        # Get response based on keyword matching
        response = find_best_match(user_message)
        
        # Sanitize response (only allow safe HTML tags)
        response = sanitize_response(response)
        
        # Return response with HTML support for links
        return jsonify({
            'response': response,
            'hasLinks': '<a href=' in response
        })
    
    except Exception as e:
        # Don't expose internal errors
        return jsonify({'response': 'Sorry, I encountered an error. Please try again later.'}), 500

def sanitize_response(text):
    """Sanitize response but allow safe HTML tags"""
    # Allow only specific safe tags
    allowed_tags = ['a', 'strong', 'em', 'p', 'br', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']
    allowed_attrs = {'a': ['href', 'class']}
    
    # Remove dangerous tags but keep safe ones
    text = re.sub(r'<(?!\/?(?:' + '|'.join(allowed_tags) + ')\b)[^>]+>', '', text, flags=re.IGNORECASE)
    
    # Remove dangerous attributes
    for tag in allowed_tags:
        if tag in allowed_attrs:
            allowed = '|'.join(allowed_attrs[tag])
            text = re.sub(
                rf'<{tag}\s+((?!({allowed})=)[^>]*?)({allowed})=',
                rf'<{tag} \3=',
                text,
                flags=re.IGNORECASE
            )
    
    return text

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'}), 200

if __name__ == '__main__':
    import os

    # Render/Railway/etc provide PORT. Locally this falls back to 5000.
    port = int(os.environ.get('PORT', '5000'))
    debug = os.environ.get('FLASK_DEBUG', '').lower() in ('1', 'true', 'yes')

    # Bind to all interfaces for cloud hosting.
    app.run(host='0.0.0.0', port=port, debug=debug)

