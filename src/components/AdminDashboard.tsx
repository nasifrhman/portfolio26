import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Project, Publication, NewsItem, PublicationStatus } from '../types/portfolio';
import {
  Lock,
  Key,
  Eye,
  EyeOff,
  LogOut,
  Globe,
  Save,
  Plus,
  Trash2,
  Edit3,
  Check,
  Copy,
  Download,
  Upload,
  RotateCcw,
  BookOpen,
  Briefcase,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  X,
  ExternalLink,
  Layers,
  ArrowLeft
} from 'lucide-react';

const AUTH_KEY = 'portfolio_admin_auth';
const CREDS_KEY = 'portfolio_admin_creds';

interface AdminCreds {
  username: string;
  passwordHash: string; // Stored as plain or btoa for simplicity
}

const DEFAULT_CREDS: AdminCreds = {
  username: 'admin',
  passwordHash: 'admin2026'
};

function getStoredCreds(): AdminCreds {
  try {
    const raw = localStorage.getItem(CREDS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }
  return DEFAULT_CREDS;
}

export const AdminDashboard: React.FC = () => {
  const portfolio = usePortfolio();

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return (
      sessionStorage.getItem(AUTH_KEY) === 'true' ||
      localStorage.getItem(AUTH_KEY) === 'true'
    );
  });

  // Login form state
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    'profile' | 'projects' | 'publications' | 'news' | 'experience' | 'backup'
  >('profile');

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  };

  // Form states for profile
  const [profileForm, setProfileForm] = useState(portfolio.profile);

  useEffect(() => {
    setProfileForm(portfolio.profile);
  }, [portfolio.profile]);

  // Project editing state
  const [editingProjectIdx, setEditingProjectIdx] = useState<number | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [projectForm, setProjectForm] = useState<Project>({
    title: '',
    description: '',
    stack: '',
    github: '',
    live: '',
    ios: '',
    android: ''
  });

  // Publication editing state
  const [editingPubIdx, setEditingPubIdx] = useState<number | null>(null);
  const [isAddingPub, setIsAddingPub] = useState(false);
  const [pubForm, setPubForm] = useState<Publication>({
    title: '',
    authors: ['Md. Nasifur Rahman'],
    venue: '',
    year: '2025',
    status: 'published' as PublicationStatus,
    theme: '',
    position: 1,
    url: ''
  });
  const [authorsInput, setAuthorsInput] = useState('Md. Nasifur Rahman');

  // News editing state
  const [editingNewsIdx, setEditingNewsIdx] = useState<number | null>(null);
  const [isAddingNews, setIsAddingNews] = useState(false);
  const [newsForm, setNewsForm] = useState<NewsItem>({
    date: new Date().getFullYear().toString(),
    category: 'Milestone',
    title: '',
    description: '',
    url: ''
  });

  // Creds management state
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsSubmitting(true);

    setTimeout(() => {
      const creds = getStoredCreds();
      if (
        usernameInput.trim() === creds.username &&
        passwordInput.trim() === creds.passwordHash
      ) {
        if (rememberMe) {
          localStorage.setItem(AUTH_KEY, 'true');
        } else {
          sessionStorage.setItem(AUTH_KEY, 'true');
        }
        setIsAuthenticated(true);
        setLoginError('');
        showToast('Authenticated successfully. Welcome back!');
      } else {
        setLoginError('Invalid username or password. Check default credentials.');
      }
      setIsSubmitting(false);
    }, 300);
  };

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
    setUsernameInput('');
    setPasswordInput('');
    showToast('Logged out of Admin Dashboard.');
  };

  const handleReturnToSite = () => {
    if (window.location.pathname.includes('/admin')) {
      window.location.href = '/';
    } else {
      window.location.hash = '#home';
    }
  };

  const handleFillDemoCreds = () => {
    const creds = getStoredCreds();
    setUsernameInput(creds.username);
    setPasswordInput(creds.passwordHash);
  };

  // --- Profile handlers ---
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    portfolio.updateProfile(profileForm);
    showToast('Profile information updated live!');
  };

  const handleAvatarFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPG, JPEG, WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const rawData = event.target?.result as string;
      const img = new Image();
      img.onload = () => {
        // Resize to max 480x480 to keep storage compact & ultra-fast
        const maxDim = 480;
        let width = img.width;
        let height = img.height;

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const optimizedDataUrl = canvas.toDataURL('image/jpeg', 0.88);
          setProfileForm((prev) => ({ ...prev, avatarUrl: optimizedDataUrl }));
          showToast('Image uploaded! Click "Save Profile Changes" to publish live.');
        } else {
          setProfileForm((prev) => ({ ...prev, avatarUrl: rawData }));
          showToast('Image uploaded! Click "Save Profile Changes" to publish live.');
        }
      };
      img.onerror = () => {
        setProfileForm((prev) => ({ ...prev, avatarUrl: rawData }));
        showToast('Image uploaded! Click "Save Profile Changes" to publish live.');
      };
      img.src = rawData;
    };
    reader.readAsDataURL(file);
  };

  // --- Project handlers ---
  const handleStartAddProject = () => {
    setProjectForm({
      title: '',
      description: '',
      stack: '',
      github: '',
      live: '',
      ios: '',
      android: ''
    });
    setEditingProjectIdx(null);
    setIsAddingProject(true);
  };

  const handleStartEditProject = (index: number) => {
    setProjectForm({ ...portfolio.projects[index] });
    setEditingProjectIdx(index);
    setIsAddingProject(false);
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title.trim()) return;

    if (isAddingProject) {
      portfolio.addProject(projectForm);
      showToast(`Added project "${projectForm.title}"`);
    } else if (editingProjectIdx !== null) {
      portfolio.editProject(editingProjectIdx, projectForm);
      showToast(`Updated project "${projectForm.title}"`);
    }
    setIsAddingProject(false);
    setEditingProjectIdx(null);
  };

  const handleDeleteProject = (index: number, title: string) => {
    if (window.confirm(`Delete project "${title}"?`)) {
      portfolio.deleteProject(index);
      showToast(`Deleted project "${title}"`);
    }
  };

  // --- Publication handlers ---
  const handleStartAddPub = () => {
    setPubForm({
      title: '',
      authors: ['Md. Nasifur Rahman'],
      venue: '',
      year: '2025',
      status: 'published',
      theme: 'Machine Learning',
      position: 1,
      url: ''
    });
    setAuthorsInput('Md. Nasifur Rahman');
    setEditingPubIdx(null);
    setIsAddingPub(true);
  };

  const handleStartEditPub = (index: number) => {
    const pub = portfolio.publications[index];
    setPubForm({ ...pub });
    setAuthorsInput(pub.authors.join(', '));
    setEditingPubIdx(index);
    setIsAddingPub(false);
  };

  const handleSavePub = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pubForm.title.trim()) return;

    const parsedAuthors = authorsInput
      .split(',')
      .map((a) => a.trim())
      .filter(Boolean);

    const readyPub: Publication = {
      ...pubForm,
      authors: parsedAuthors.length > 0 ? parsedAuthors : ['Md. Nasifur Rahman']
    };

    if (isAddingPub) {
      portfolio.addPublication(readyPub);
      showToast(`Added publication "${readyPub.title}"`);
    } else if (editingPubIdx !== null) {
      portfolio.editPublication(editingPubIdx, readyPub);
      showToast(`Updated publication "${readyPub.title}"`);
    }
    setIsAddingPub(false);
    setEditingPubIdx(null);
  };

  const handleDeletePub = (index: number, title: string) => {
    if (window.confirm(`Delete publication "${title}"?`)) {
      portfolio.deletePublication(index);
      showToast(`Deleted publication "${title}"`);
    }
  };

  // --- News handlers ---
  const handleStartAddNews = () => {
    setNewsForm({
      date: new Date().getFullYear().toString(),
      category: 'Milestone',
      title: '',
      description: '',
      url: ''
    });
    setEditingNewsIdx(null);
    setIsAddingNews(true);
  };

  const handleStartEditNews = (index: number) => {
    setNewsForm({ ...portfolio.news[index] });
    setEditingNewsIdx(index);
    setIsAddingNews(false);
  };

  const handleSaveNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsForm.title.trim()) return;

    if (isAddingNews) {
      portfolio.addNews(newsForm);
      showToast(`Added milestone "${newsForm.title}"`);
    } else if (editingNewsIdx !== null) {
      portfolio.editNews(editingNewsIdx, newsForm);
      showToast(`Updated milestone "${newsForm.title}"`);
    }
    setIsAddingNews(false);
    setEditingNewsIdx(null);
  };

  const handleDeleteNews = (index: number, title: string) => {
    if (window.confirm(`Delete milestone "${title}"?`)) {
      portfolio.deleteNews(index);
      showToast(`Deleted milestone "${title}"`);
    }
  };

  // --- Backup & Code handlers ---
  const handleExportJson = () => {
    const jsonStr = portfolio.exportDataJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-data-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Backup JSON downloaded!');
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = portfolio.importDataJson(content);
      if (success) {
        showToast('Data imported successfully!');
      } else {
        alert('Invalid JSON file format. Could not import.');
      }
    };
    reader.readAsText(file);
  };

  const handleCopyCode = () => {
    const code = portfolio.generateTypeScriptCode();
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    showToast('TypeScript code copied to clipboard!');
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleResetDefaults = () => {
    if (
      window.confirm(
        'Are you sure you want to reset all portfolio data to factory defaults? All custom changes will be restored to the initial code.'
      )
    ) {
      portfolio.resetToDefaults();
      showToast('Reset all data to defaults.');
    }
  };

  const handleUpdateCreds = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername.trim() || !newPassword.trim()) {
      alert('Please provide both username and password.');
      return;
    }
    const updated: AdminCreds = {
      username: newUsername.trim(),
      passwordHash: newPassword.trim()
    };
    localStorage.setItem(CREDS_KEY, JSON.stringify(updated));
    setNewUsername('');
    setNewPassword('');
    showToast('Admin login credentials updated successfully!');
  };

  // ==========================================
  // UN-AUTHENTICATED: LOGIN SCREEN
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="admin-login-screen">
        <div className="admin-login-card">
          <div className="admin-login-badge mono">
            <Lock size={13} className="admin-icon-pulse" />
            <span>AUTHENTICATION REQUIRED</span>
          </div>

          <div className="admin-login-header">
            <h1 className="admin-login-title serif">Portfolio Admin</h1>
            <p className="admin-login-subtitle">
              Secure control center to manage profile, projects, research, and timeline data.
            </p>
          </div>

          {loginError && (
            <div className="admin-alert error" role="alert">
              <AlertCircle size={16} />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="admin-login-form">
            <div className="admin-field">
              <label htmlFor="admin-username" className="mono">
                Username
              </label>
              <input
                id="admin-username"
                type="text"
                autoComplete="username"
                required
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="e.g. admin"
                className="admin-input"
              />
            </div>

            <div className="admin-field">
              <label htmlFor="admin-password" className="mono">
                Password
              </label>
              <div className="admin-password-wrap">
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••••••"
                  className="admin-input"
                />
                <button
                  type="button"
                  className="admin-eye-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="admin-remember-row">
              <label className="admin-checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me on this browser</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="admin-btn admin-btn-primary admin-btn-block"
            >
              {isSubmitting ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <Key size={15} />
                  <span>Access Dashboard</span>
                </>
              )}
            </button>
          </form>

          <div className="admin-login-footer">
            <div className="admin-demo-hint">
              <span className="mono">Default credentials:</span>
              <code>admin</code> / <code>admin2026</code>
              <button
                type="button"
                onClick={handleFillDemoCreds}
                className="admin-text-action mono"
              >
                Autofill demo
              </button>
            </div>

            <button
              type="button"
              onClick={handleReturnToSite}
              className="admin-return-btn mono"
            >
              <ArrowLeft size={13} />
              <span>Back to public website</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // AUTHENTICATED: ADMIN DASHBOARD
  // ==========================================
  return (
    <div className="admin-dashboard-root">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="admin-toast" role="status">
          <Check size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar */}
      <header className="admin-topbar">
        <div className="admin-topbar-left">
          <div className="admin-brand">
            <span className="admin-brand-icon">⌘</span>
            <span className="admin-brand-name">ADMIN CONTROL</span>
          </div>
          <span className="admin-sync-badge mono">
            <span className="pulse-dot"></span>
            LIVE SYNC ACTIVE
          </span>
        </div>

        <div className="admin-topbar-actions">
          <button
            type="button"
            onClick={handleReturnToSite}
            className="admin-topbar-btn"
            title="Open Public Website"
          >
            <Globe size={14} />
            <span>View Live Site</span>
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="admin-topbar-btn admin-logout-btn"
            title="Log out of admin session"
          >
            <LogOut size={14} />
            <span>Log Out</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="admin-container">
        {/* Navigation Tabs */}
        <nav className="admin-tabs" aria-label="Admin Sections">
          <button
            className={`admin-tab ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <Sparkles size={15} />
            <span>Profile &amp; Bio</span>
          </button>
          <button
            className={`admin-tab ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            <Layers size={15} />
            <span>Projects ({portfolio.projects.length})</span>
          </button>
          <button
            className={`admin-tab ${activeTab === 'publications' ? 'active' : ''}`}
            onClick={() => setActiveTab('publications')}
          >
            <BookOpen size={15} />
            <span>Publications ({portfolio.publications.length})</span>
          </button>
          <button
            className={`admin-tab ${activeTab === 'news' ? 'active' : ''}`}
            onClick={() => setActiveTab('news')}
          >
            <Briefcase size={15} />
            <span>Milestones &amp; News ({portfolio.news.length})</span>
          </button>
          <button
            className={`admin-tab ${activeTab === 'experience' ? 'active' : ''}`}
            onClick={() => setActiveTab('experience')}
          >
            <GraduationCap size={15} />
            <span>Experience &amp; Education</span>
          </button>
          <button
            className={`admin-tab ${activeTab === 'backup' ? 'active' : ''}`}
            onClick={() => setActiveTab('backup')}
          >
            <ShieldCheck size={15} />
            <span>Backup &amp; Code</span>
          </button>
        </nav>

        {/* Tab Content */}
        <div className="admin-content">
          {/* TAB 1: PROFILE */}
          {activeTab === 'profile' && (
            <div className="admin-pane">
              <div className="admin-pane-header">
                <div>
                  <h2 className="admin-pane-title">Personal Profile &amp; Contact Details</h2>
                  <p className="admin-pane-desc">
                    Edits made here update the Hero section, Navbar, Contact ribbon, and Footer in real time.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSaveProfile} className="admin-form-grid">
                <div className="admin-field">
                  <label className="mono">Full Legal Name</label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="admin-input"
                  />
                </div>

                <div className="admin-field">
                  <label className="mono">Display Brand Name</label>
                  <input
                    type="text"
                    value={profileForm.displayName}
                    onChange={(e) => setProfileForm({ ...profileForm, displayName: e.target.value })}
                    className="admin-input"
                  />
                </div>

                <div className="admin-field">
                  <label className="mono">Primary Email</label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="admin-input"
                  />
                </div>

                <div className="admin-field">
                  <label className="mono">Phone Number</label>
                  <input
                    type="text"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    className="admin-input"
                  />
                </div>

                <div className="admin-field">
                  <label className="mono">WhatsApp Link or Number</label>
                  <input
                    type="text"
                    value={profileForm.whatsapp}
                    onChange={(e) => setProfileForm({ ...profileForm, whatsapp: e.target.value })}
                    className="admin-input"
                  />
                </div>

                <div className="admin-field">
                  <label className="mono">Current Location</label>
                  <input
                    type="text"
                    value={profileForm.location}
                    onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                    className="admin-input"
                  />
                </div>

                <div className="admin-field full-width">
                  <label className="mono">Hero Headline / Specialization</label>
                  <input
                    type="text"
                    value={profileForm.heroTagline}
                    onChange={(e) => setProfileForm({ ...profileForm, heroTagline: e.target.value })}
                    className="admin-input"
                  />
                </div>

                <div className="admin-field full-width">
                  <label className="mono">Short Bio Summary</label>
                  <textarea
                    rows={3}
                    value={profileForm.bioSummary}
                    onChange={(e) => setProfileForm({ ...profileForm, bioSummary: e.target.value })}
                    className="admin-input"
                  />
                </div>

                <div className="admin-field full-width admin-avatar-field">
                  <label className="mono">Avatar Profile Photo</label>
                  <div className="admin-avatar-card">
                    <div className="admin-avatar-preview-box">
                      <img
                        src={profileForm.avatarUrl || '/avatar.png'}
                        alt="Profile Avatar Preview"
                        className="admin-avatar-preview-img"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = '/avatar.png';
                        }}
                      />
                    </div>

                    <div className="admin-avatar-upload-content">
                      <div className="admin-avatar-btn-row">
                        <label className="admin-btn admin-btn-primary admin-avatar-file-label">
                          <Upload size={14} />
                          <span>Upload Image File</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarFileUpload}
                            style={{ display: 'none' }}
                          />
                        </label>

                        {profileForm.avatarUrl && profileForm.avatarUrl !== '/avatar.png' && (
                          <button
                            type="button"
                            onClick={() => {
                              setProfileForm((prev) => ({ ...prev, avatarUrl: '/avatar.png' }));
                              showToast('Avatar reset to /avatar.png');
                            }}
                            className="admin-btn admin-btn-secondary"
                            title="Reset avatar to default /avatar.png"
                          >
                            <RotateCcw size={13} />
                            <span>Reset to Default</span>
                          </button>
                        )}
                      </div>

                      <div className="admin-avatar-input-subrow">
                        <span className="mono admin-avatar-hint">
                          Or enter direct image path / URL:
                        </span>
                        <input
                          type="text"
                          value={profileForm.avatarUrl}
                          onChange={(e) => setProfileForm({ ...profileForm, avatarUrl: e.target.value })}
                          placeholder="e.g. /avatar.png or https://..."
                          className="admin-input"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="admin-form-actions full-width">
                  <button type="submit" className="admin-btn admin-btn-primary">
                    <Save size={15} />
                    <span>Save Profile Changes</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 2: PROJECTS */}
          {activeTab === 'projects' && (
            <div className="admin-pane">
              <div className="admin-pane-header">
                <div>
                  <h2 className="admin-pane-title">Portfolio Projects</h2>
                  <p className="admin-pane-desc">
                    Manage client platforms, mobile applications, and backend systems.
                  </p>
                </div>
                {!isAddingProject && editingProjectIdx === null && (
                  <button
                    type="button"
                    onClick={handleStartAddProject}
                    className="admin-btn admin-btn-primary"
                  >
                    <Plus size={15} />
                    <span>Add New Project</span>
                  </button>
                )}
              </div>

              {/* Add / Edit Project Form */}
              {(isAddingProject || editingProjectIdx !== null) && (
                <div className="admin-form-card">
                  <div className="admin-card-head">
                    <h3 className="admin-card-title">
                      {isAddingProject ? 'Add New Project' : `Edit Project: ${projectForm.title}`}
                    </h3>
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingProject(false);
                        setEditingProjectIdx(null);
                      }}
                      className="admin-close-btn"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <form onSubmit={handleSaveProject} className="admin-form-grid">
                    <div className="admin-field full-width">
                      <label className="mono">Project Title</label>
                      <input
                        type="text"
                        required
                        value={projectForm.title}
                        onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                        placeholder="e.g. Deenyah – Umrah Badal Platform"
                        className="admin-input"
                      />
                    </div>

                    <div className="admin-field full-width">
                      <label className="mono">Description</label>
                      <textarea
                        rows={3}
                        required
                        value={projectForm.description}
                        onChange={(e) =>
                          setProjectForm({ ...projectForm, description: e.target.value })
                        }
                        placeholder="Overview of the system, architectural details, and impact..."
                        className="admin-input"
                      />
                    </div>

                    <div className="admin-field full-width">
                      <label className="mono">Tech Stack</label>
                      <input
                        type="text"
                        required
                        value={projectForm.stack}
                        onChange={(e) => setProjectForm({ ...projectForm, stack: e.target.value })}
                        placeholder="e.g. Node.js · Express.js · React.js · MongoDB · AWS"
                        className="admin-input"
                      />
                    </div>

                    <div className="admin-field">
                      <label className="mono">Live Website URL</label>
                      <input
                        type="url"
                        value={projectForm.live || ''}
                        onChange={(e) => setProjectForm({ ...projectForm, live: e.target.value })}
                        placeholder="https://..."
                        className="admin-input"
                      />
                    </div>

                    <div className="admin-field">
                      <label className="mono">GitHub Repository</label>
                      <input
                        type="url"
                        value={projectForm.github || ''}
                        onChange={(e) => setProjectForm({ ...projectForm, github: e.target.value })}
                        placeholder="https://github.com/..."
                        className="admin-input"
                      />
                    </div>

                    <div className="admin-field">
                      <label className="mono">iOS App Store URL (Optional)</label>
                      <input
                        type="url"
                        value={projectForm.ios || ''}
                        onChange={(e) => setProjectForm({ ...projectForm, ios: e.target.value })}
                        placeholder="https://apps.apple.com/..."
                        className="admin-input"
                      />
                    </div>

                    <div className="admin-field">
                      <label className="mono">Google Play Store URL (Optional)</label>
                      <input
                        type="url"
                        value={projectForm.android || ''}
                        onChange={(e) =>
                          setProjectForm({ ...projectForm, android: e.target.value })
                        }
                        placeholder="https://play.google.com/..."
                        className="admin-input"
                      />
                    </div>

                    <div className="admin-form-actions full-width">
                      <button type="submit" className="admin-btn admin-btn-primary">
                        <Save size={15} />
                        <span>{isAddingProject ? 'Create Project' : 'Save Changes'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingProject(false);
                          setEditingProjectIdx(null);
                        }}
                        className="admin-btn admin-btn-secondary"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Projects List */}
              <div className="admin-item-list">
                {portfolio.projects.map((project, idx) => (
                  <div key={idx} className="admin-item-card">
                    <div className="admin-item-info">
                      <div className="admin-item-index mono">0{idx + 1}</div>
                      <div>
                        <h3 className="admin-item-title">{project.title}</h3>
                        <p className="admin-item-stack mono">{project.stack}</p>
                        <p className="admin-item-desc">{project.description}</p>
                        <div className="admin-item-links mono">
                          {project.live && (
                            <a href={project.live} target="_blank" rel="noopener noreferrer">
                              Live <ExternalLink size={11} />
                            </a>
                          )}
                          {project.github && (
                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                              GitHub <ExternalLink size={11} />
                            </a>
                          )}
                          {project.ios && <span>iOS App</span>}
                          {project.android && <span>Android App</span>}
                        </div>
                      </div>
                    </div>
                    <div className="admin-item-actions">
                      <button
                        type="button"
                        onClick={() => handleStartEditProject(idx)}
                        className="admin-btn-icon"
                        title="Edit Project"
                      >
                        <Edit3 size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteProject(idx, project.title)}
                        className="admin-btn-icon danger"
                        title="Delete Project"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: PUBLICATIONS */}
          {activeTab === 'publications' && (
            <div className="admin-pane">
              <div className="admin-pane-header">
                <div>
                  <h2 className="admin-pane-title">Research Publications</h2>
                  <p className="admin-pane-desc">
                    Manage peer-reviewed articles, journal publications, and manuscripts.
                  </p>
                </div>
                {!isAddingPub && editingPubIdx === null && (
                  <button
                    type="button"
                    onClick={handleStartAddPub}
                    className="admin-btn admin-btn-primary"
                  >
                    <Plus size={15} />
                    <span>Add Publication</span>
                  </button>
                )}
              </div>

              {/* Add / Edit Publication Form */}
              {(isAddingPub || editingPubIdx !== null) && (
                <div className="admin-form-card">
                  <div className="admin-card-head">
                    <h3 className="admin-card-title">
                      {isAddingPub ? 'Add New Publication' : `Edit Publication: ${pubForm.title}`}
                    </h3>
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingPub(false);
                        setEditingPubIdx(null);
                      }}
                      className="admin-close-btn"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <form onSubmit={handleSavePub} className="admin-form-grid">
                    <div className="admin-field full-width">
                      <label className="mono">Paper Title</label>
                      <input
                        type="text"
                        required
                        value={pubForm.title}
                        onChange={(e) => setPubForm({ ...pubForm, title: e.target.value })}
                        placeholder="e.g. Accelerating model averaging with cluster-based approach..."
                        className="admin-input"
                      />
                    </div>

                    <div className="admin-field full-width">
                      <label className="mono">Authors (separated by commas)</label>
                      <input
                        type="text"
                        required
                        value={authorsInput}
                        onChange={(e) => setAuthorsInput(e.target.value)}
                        placeholder="Md. Nasifur Rahman, A. S. E. Elahi, S. Khanam..."
                        className="admin-input"
                      />
                    </div>

                    <div className="admin-field">
                      <label className="mono">Venue / Journal</label>
                      <input
                        type="text"
                        required
                        value={pubForm.venue}
                        onChange={(e) => setPubForm({ ...pubForm, venue: e.target.value })}
                        placeholder="Springer Neural Computing and Applications"
                        className="admin-input"
                      />
                    </div>

                    <div className="admin-field">
                      <label className="mono">Publication Year</label>
                      <input
                        type="text"
                        value={pubForm.year || '2025'}
                        onChange={(e) => setPubForm({ ...pubForm, year: e.target.value })}
                        className="admin-input"
                      />
                    </div>

                    <div className="admin-field">
                      <label className="mono">Status</label>
                      <select
                        value={pubForm.status}
                        onChange={(e) =>
                          setPubForm({
                            ...pubForm,
                            status: e.target.value as PublicationStatus
                          })
                        }
                        className="admin-input"
                      >
                        <option value="published">Published</option>
                        <option value="accepted">Accepted</option>
                        <option value="review">Under Review</option>
                        <option value="preparation">In Preparation</option>
                      </select>
                    </div>

                    <div className="admin-field">
                      <label className="mono">Research Theme / Area</label>
                      <input
                        type="text"
                        value={pubForm.theme}
                        onChange={(e) => setPubForm({ ...pubForm, theme: e.target.value })}
                        placeholder="Machine Learning & Neural Computing"
                        className="admin-input"
                      />
                    </div>

                    <div className="admin-field full-width">
                      <label className="mono">Paper DOI / URL</label>
                      <input
                        type="url"
                        value={pubForm.url || ''}
                        onChange={(e) => setPubForm({ ...pubForm, url: e.target.value })}
                        placeholder="https://link.springer.com/..."
                        className="admin-input"
                      />
                    </div>

                    <div className="admin-form-actions full-width">
                      <button type="submit" className="admin-btn admin-btn-primary">
                        <Save size={15} />
                        <span>{isAddingPub ? 'Add Publication' : 'Save Changes'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingPub(false);
                          setEditingPubIdx(null);
                        }}
                        className="admin-btn admin-btn-secondary"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Publications List */}
              <div className="admin-item-list">
                {portfolio.publications.map((pub, idx) => (
                  <div key={idx} className="admin-item-card">
                    <div className="admin-item-info">
                      <div className="admin-item-index mono">{pub.year || '—'}</div>
                      <div>
                        <div className="admin-badge-row">
                          <span className={`admin-status-badge ${pub.status}`}>
                            {pub.status.toUpperCase()}
                          </span>
                          <span className="mono admin-item-theme">{pub.theme}</span>
                        </div>
                        <h3 className="admin-item-title">{pub.title}</h3>
                        <p className="admin-item-authors mono">{pub.authors.join(', ')}</p>
                        <p className="admin-item-venue">{pub.venue}</p>
                        {pub.url && (
                          <div className="admin-item-links mono">
                            <a href={pub.url} target="_blank" rel="noopener noreferrer">
                              Open Article ↗
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="admin-item-actions">
                      <button
                        type="button"
                        onClick={() => handleStartEditPub(idx)}
                        className="admin-btn-icon"
                        title="Edit Publication"
                      >
                        <Edit3 size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeletePub(idx, pub.title)}
                        className="admin-btn-icon danger"
                        title="Delete Publication"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: MILESTONES & NEWS */}
          {activeTab === 'news' && (
            <div className="admin-pane">
              <div className="admin-pane-header">
                <div>
                  <h2 className="admin-pane-title">Timeline Milestones &amp; News</h2>
                  <p className="admin-pane-desc">
                    Manage career promotions, paper acceptances, degree graduations, and awards.
                  </p>
                </div>
                {!isAddingNews && editingNewsIdx === null && (
                  <button
                    type="button"
                    onClick={handleStartAddNews}
                    className="admin-btn admin-btn-primary"
                  >
                    <Plus size={15} />
                    <span>Add Milestone</span>
                  </button>
                )}
              </div>

              {/* Add / Edit News Form */}
              {(isAddingNews || editingNewsIdx !== null) && (
                <div className="admin-form-card">
                  <div className="admin-card-head">
                    <h3 className="admin-card-title">
                      {isAddingNews ? 'Add Milestone' : `Edit Milestone: ${newsForm.title}`}
                    </h3>
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingNews(false);
                        setEditingNewsIdx(null);
                      }}
                      className="admin-close-btn"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <form onSubmit={handleSaveNews} className="admin-form-grid">
                    <div className="admin-field">
                      <label className="mono">Date / Year</label>
                      <input
                        type="text"
                        required
                        value={newsForm.date}
                        onChange={(e) => setNewsForm({ ...newsForm, date: e.target.value })}
                        placeholder="e.g. Jul 2025 or 2025"
                        className="admin-input"
                      />
                    </div>

                    <div className="admin-field">
                      <label className="mono">Category</label>
                      <input
                        type="text"
                        required
                        value={newsForm.category}
                        onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value })}
                        placeholder="Career Milestone, Paper Publication..."
                        className="admin-input"
                      />
                    </div>

                    <div className="admin-field full-width">
                      <label className="mono">Title</label>
                      <input
                        type="text"
                        required
                        value={newsForm.title}
                        onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                        placeholder="e.g. Promoted to Back-End Developer at Sparktech Agency"
                        className="admin-input"
                      />
                    </div>

                    <div className="admin-field full-width">
                      <label className="mono">Description</label>
                      <textarea
                        rows={3}
                        required
                        value={newsForm.description}
                        onChange={(e) => setNewsForm({ ...newsForm, description: e.target.value })}
                        placeholder="Context and details..."
                        className="admin-input"
                      />
                    </div>

                    <div className="admin-field full-width">
                      <label className="mono">Link URL (Optional)</label>
                      <input
                        type="url"
                        value={newsForm.url || ''}
                        onChange={(e) => setNewsForm({ ...newsForm, url: e.target.value })}
                        placeholder="https://..."
                        className="admin-input"
                      />
                    </div>

                    <div className="admin-form-actions full-width">
                      <button type="submit" className="admin-btn admin-btn-primary">
                        <Save size={15} />
                        <span>{isAddingNews ? 'Add Milestone' : 'Save Changes'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingNews(false);
                          setEditingNewsIdx(null);
                        }}
                        className="admin-btn admin-btn-secondary"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* News List */}
              <div className="admin-item-list">
                {portfolio.news.map((item, idx) => (
                  <div key={idx} className="admin-item-card">
                    <div className="admin-item-info">
                      <div className="admin-item-index mono">{item.date}</div>
                      <div>
                        <div className="admin-badge-row">
                          <span className="admin-status-badge news mono">{item.category}</span>
                        </div>
                        <h3 className="admin-item-title">{item.title}</h3>
                        <p className="admin-item-desc">{item.description}</p>
                        {item.url && (
                          <div className="admin-item-links mono">
                            <a href={item.url} target="_blank" rel="noopener noreferrer">
                              Read More ↗
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="admin-item-actions">
                      <button
                        type="button"
                        onClick={() => handleStartEditNews(idx)}
                        className="admin-btn-icon"
                        title="Edit Milestone"
                      >
                        <Edit3 size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteNews(idx, item.title)}
                        className="admin-btn-icon danger"
                        title="Delete Milestone"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: EXPERIENCE & EDUCATION */}
          {activeTab === 'experience' && (
            <div className="admin-pane">
              <div className="admin-pane-header">
                <div>
                  <h2 className="admin-pane-title">Industry &amp; Academic Experience</h2>
                  <p className="admin-pane-desc">
                    Manage roles at Sparktech Agency, academic positions at AIUB, and degrees.
                  </p>
                </div>
              </div>

              {/* Industry section */}
              <div className="admin-subhead">
                <h3>Industry Roles</h3>
              </div>
              <div className="admin-item-list">
                {portfolio.industryExperience.map((item, idx) => (
                  <div key={idx} className="admin-item-card">
                    <div className="admin-item-info">
                      <div className="admin-item-index mono">{item.period}</div>
                      <div>
                        <h3 className="admin-item-title">{item.title}</h3>
                        <p className="admin-item-stack mono">{item.organization}</p>
                        <p className="admin-item-desc">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Education section */}
              <div className="admin-subhead" style={{ marginTop: '2.5rem' }}>
                <h3>Academic Degrees</h3>
              </div>
              <div className="admin-item-list">
                {portfolio.education.map((item, idx) => (
                  <div key={idx} className="admin-item-card">
                    <div className="admin-item-info">
                      <div className="admin-item-index mono">{item.period}</div>
                      <div>
                        <h3 className="admin-item-title">{item.title}</h3>
                        <p className="admin-item-stack mono">{item.organization}</p>
                        <p className="admin-item-desc">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: BACKUP, CREDENTIALS & CODE */}
          {activeTab === 'backup' && (
            <div className="admin-pane">
              <div className="admin-pane-header">
                <div>
                  <h2 className="admin-pane-title">Data Backup, Credentials &amp; Code Sync</h2>
                  <p className="admin-pane-desc">
                    Export your changes, change login credentials, or copy code for permanent Git commits.
                  </p>
                </div>
              </div>

              <div className="admin-backup-grid">
                {/* JSON Backup & Restore Card */}
                <div className="admin-tool-card">
                  <div className="admin-tool-icon">
                    <Download size={20} />
                  </div>
                  <h3>Export &amp; Import JSON</h3>
                  <p>
                    Download a full JSON snapshot of your website data or import an existing backup file to restore.
                  </p>
                  <div className="admin-btn-group">
                    <button
                      type="button"
                      onClick={handleExportJson}
                      className="admin-btn admin-btn-primary"
                    >
                      <Download size={14} />
                      <span>Download JSON</span>
                    </button>
                    <label className="admin-btn admin-btn-secondary admin-file-label">
                      <Upload size={14} />
                      <span>Import JSON</span>
                      <input
                        type="file"
                        accept=".json"
                        onChange={handleImportJson}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>
                </div>

                {/* Git Code Generator */}
                <div className="admin-tool-card">
                  <div className="admin-tool-icon">
                    <Copy size={20} />
                  </div>
                  <h3>Sync to Codebase (Git)</h3>
                  <p>
                    Generate updated TypeScript code for <code>src/data/portfolioData.ts</code> to permanently commit to your GitHub repository.
                  </p>
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="admin-btn admin-btn-primary"
                  >
                    {copiedCode ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copiedCode ? 'Copied to Clipboard!' : 'Copy portfolioData.ts Code'}</span>
                  </button>
                </div>

                {/* Update Admin Credentials */}
                <div className="admin-tool-card full-width">
                  <div className="admin-tool-icon">
                    <Key size={20} />
                  </div>
                  <h3>Change Admin Login Credentials</h3>
                  <p>
                    Update the username and password required to enter <code>domain/admin</code>.
                  </p>
                  <form onSubmit={handleUpdateCreds} className="admin-creds-form">
                    <div className="admin-field">
                      <label className="mono">New Username</label>
                      <input
                        type="text"
                        required
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        placeholder="e.g. nasif"
                        className="admin-input"
                      />
                    </div>
                    <div className="admin-field">
                      <label className="mono">New Password</label>
                      <input
                        type="password"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="admin-input"
                      />
                    </div>
                    <button type="submit" className="admin-btn admin-btn-primary">
                      <Save size={14} />
                      <span>Update Credentials</span>
                    </button>
                  </form>
                </div>

                {/* Factory Reset */}
                <div className="admin-tool-card danger full-width">
                  <div className="admin-tool-icon danger">
                    <RotateCcw size={20} />
                  </div>
                  <h3>Reset to Initial Code Defaults</h3>
                  <p>
                    Clear all browser-cached customizations and restore original data from <code>portfolioData.ts</code>.
                  </p>
                  <button
                    type="button"
                    onClick={handleResetDefaults}
                    className="admin-btn admin-btn-danger"
                  >
                    <RotateCcw size={14} />
                    <span>Restore Factory Defaults</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
