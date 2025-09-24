import React from 'react';

const About = ({ onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal about-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">About Task Management System</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="modal-body about-content">
          {/* App Overview */}
          <section className="about-section">
            <h3><strong>Overview</strong></h3>
            <p>
              A <strong>modern, full-stack task management application</strong> designed to help you organize, 
              track, and manage your tasks efficiently. Built with cutting-edge technologies 
              and best practices for optimal performance and user experience.
            </p>
          </section>

          {/* Technical Stack */}
          <section className="about-section">
            <h3><strong>Technical Stack</strong></h3>
            
            <div className="tech-stack">
              <div className="tech-category">
                <h4><strong>Frontend</strong></h4>
                <ul>
                  <li><strong>React 18</strong> - Modern component-based UI library</li>
                  <li><strong>JavaScript (ES6+)</strong> - Latest JavaScript features</li>
                  <li><strong>Axios</strong> - HTTP client for API communication</li>
                  <li><strong>CSS3</strong> - Advanced styling with modern techniques</li>
                  <li><strong>Responsive Design</strong> - Mobile-first approach</li>
                </ul>
              </div>

              <div className="tech-category">
                <h4><strong>Backend</strong></h4>
                <ul>
                  <li><strong>Flask</strong> - Lightweight Python web framework</li>
                  <li><strong>SQLAlchemy</strong> - Powerful ORM for database operations</li>
                  <li><strong>SQLite</strong> - Lightweight, serverless database</li>
                  <li><strong>Flask-CORS</strong> - Cross-Origin Resource Sharing support</li>
                  <li><strong>RESTful API</strong> - Clean, standard API architecture</li>
                </ul>
              </div>

              <div className="tech-category">
                <h4><strong>Architecture</strong></h4>
                <ul>
                  <li><strong>MVC Pattern</strong> - Clean separation of concerns</li>
                  <li><strong>Component-Based</strong> - Reusable React components</li>
                  <li><strong>RESTful Services</strong> - Standard HTTP methods</li>
                  <li><strong>Real-time Updates</strong> - Dynamic state management</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="about-section">
            <h3><strong>Key Features</strong></h3>
            <div className="features-grid">
              <div className="feature-item">
                <div>
                  <h4><strong>Task Management</strong></h4>
                  <p>Create, edit, delete, and organize tasks with ease</p>
                </div>
              </div>
              <div className="feature-item">
                <div>
                  <h4><strong>Priority System</strong></h4>
                  <p>Set task priorities (High, Medium, Low) for better organization</p>
                </div>
              </div>
              <div className="feature-item">
                <div>
                  <h4><strong>Status Tracking</strong></h4>
                  <p>Monitor task progress (Pending, In Progress, Completed)</p>
                </div>
              </div>
              <div className="feature-item">
                <div>
                  <h4><strong>Comments System</strong></h4>
                  <p>Add comments and notes to tasks for better collaboration</p>
                </div>
              </div>
              <div className="feature-item">
                <div>
                  <h4><strong>Advanced Filtering</strong></h4>
                  <p>Filter tasks by status and priority for quick access</p>
                </div>
              </div>
              <div className="feature-item">
                <div>
                  <h4><strong>Responsive Design</strong></h4>
                  <p>Seamless experience across desktop, tablet, and mobile</p>
                </div>
              </div>
            </div>
          </section>

          {/* Developer Credit */}
          <section className="about-section developer-section">
            <div className="developer-credit">
              <div className="developer-avatar">
                <span className="avatar-initials">YS</span>
              </div>
              <div className="developer-info">
                <h3><strong>Built and Deployed by Yash Shinde</strong></h3>
                <p className="developer-tagline">
                  <em>"Crafting digital solutions that transform ideas into reality, 
                  one line of code at a time."</em>
                </p>
                <div className="developer-badges">
                  <span className="badge">Full-Stack Developer</span>
                  <span className="badge">Problem Solver</span>
                  <span className="badge">Innovation Driven</span>
                </div>
                <div className="developer-links">
                  <a href="https://github.com/yashh21nd" target="_blank" rel="noopener noreferrer" className="social-link">
                    <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                    GitHub
                  </a>
                  <a href="https://www.linkedin.com/in/yash-shinde-dev" target="_blank" rel="noopener noreferrer" className="social-link">
                    <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                </div>
                <div className="developer-description">
                  <p>
                    This application showcases <strong>modern web development practices</strong>, 
                    combining elegant user interface design with robust backend architecture. 
                    Built with passion for creating <strong>intuitive, scalable, and maintainable solutions</strong>.
                  </p>
                </div>
              </div>
            </div>
          </section>


        </div>

        <div className="modal-footer">
          <button className="btn btn-primary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;