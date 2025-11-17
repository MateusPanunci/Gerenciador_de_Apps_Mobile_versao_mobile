import { useState } from 'react'
import './App.css'

function App() {
  const [apps, setApps] = useState([
    { id: 1, name: 'WhatsApp', category: 'Social', size: '45 MB', installed: true },
    { id: 2, name: 'Instagram', category: 'Social', size: '78 MB', installed: true },
    { id: 3, name: 'Spotify', category: 'Music', size: '120 MB', installed: false },
    { id: 4, name: 'Netflix', category: 'Entertainment', size: '156 MB', installed: true },
    { id: 5, name: 'Gmail', category: 'Productivity', size: '32 MB', installed: true },
  ])

  const [filter, setFilter] = useState('all')

  const toggleInstall = (id) => {
    setApps(apps.map(app => 
      app.id === id ? { ...app, installed: !app.installed } : app
    ))
  }

  const filteredApps = apps.filter(app => {
    if (filter === 'installed') return app.installed
    if (filter === 'not-installed') return !app.installed
    return true
  })

  return (
    <div className="app-manager">
      <div className="container">
        <header className="header">
          <h1>📱 Mobile App Manager</h1>
          <p>Manage your mobile applications</p>
        </header>

        <div className="filters">
          <button 
            className={filter === 'all' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter('all')}
          >
            All Apps
          </button>
          <button 
            className={filter === 'installed' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter('installed')}
          >
            Installed
          </button>
          <button 
            className={filter === 'not-installed' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter('not-installed')}
          >
            Not Installed
          </button>
        </div>

        <div className="app-grid">
          {filteredApps.map(app => (
            <div key={app.id} className="app-card">
              <div className="app-info">
                <h3>{app.name}</h3>
                <div className="app-details">
                  <span className="category">{app.category}</span>
                  <span className="size">{app.size}</span>
                </div>
              </div>
              <button 
                className={app.installed ? 'btn btn-uninstall' : 'btn btn-install'}
                onClick={() => toggleInstall(app.id)}
              >
                {app.installed ? 'Uninstall' : 'Install'}
              </button>
            </div>
          ))}
        </div>

        {filteredApps.length === 0 && (
          <div className="empty-state">
            <p>No apps found with the selected filter.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
