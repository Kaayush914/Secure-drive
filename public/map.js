// Global variables
let map, heat
let currentFilter = "all"
const stateFilter = "all"
let recentAccidents = []
let statsData = {}

// Initialize the map when the page loads
document.addEventListener("DOMContentLoaded", () => {
  initMap()
  loadAccidentData()

  // Set up polling for real-time updates
  setInterval(checkForUpdates, 30000) // Check every 30 seconds
})

// Create the map
function initMap() {
  // Center coordinates for India
  const center = [20.5937, 78.9629] // Center of India

  // Create map
  map = L.map("map").setView(center, 5)

  // Add OpenStreetMap tiles
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
  }).addTo(map)

  // Add info box
  addInfoBox()

  // Add legend
  addLegend()

  // Add filter controls
  addControls()

  // Add stats panel
  addStatsPanel()

  // Add recent accidents panel
  addRecentAccidentsPanel()
}

// Load accident data from JSON file
async function loadAccidentData() {
  fetch("AccidentsBig.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      return response.json()
    })
    .then((data) => {
      processAccidentData(data)
    })
    .catch((error) => {
      console.error("Error loading accident data:", error)
      alert("Failed to load accident data. Please check if AccidentsBig.json exists in the same folder.")

      // Fallback to default data if file doesn't exist
      const fallbackData = getFallbackData()
      processAccidentData(fallbackData)
    })
}

// Process and display the accident data
function processAccidentData(data) {
  // Store the original data
  window.accidentData = data

  // Sort by date (newest first) and take the most recent 5 for the recent panel
  const sortedData = [...data].sort((a, b) => {
    // Convert DD-MM-YYYY to YYYY-MM-DD for proper date comparison
    const dateA = new Date(a.Date.split("-").reverse().join("-") + "T" + a.Time)
    const dateB = new Date(b.Date.split("-").reverse().join("-") + "T" + b.Time)
    return dateB - dateA
  })

  recentAccidents = sortedData.slice(0, 5)

  // Update stats
  calculateStats(data)

  // Format data for heatmap
  updateHeatmap(data)

  // Update the recent accidents panel
  updateRecentAccidentsPanel()

  // Fit map to data bounds
  fitMapToBounds(data)
}

// Update the heatmap with filtered data
function updateHeatmap(data) {
  // Format data for heatmap
  const heatData = data.map((point) => [
    Number.parseFloat(point.latitude),
    Number.parseFloat(point.longitude),
    0.5, // Default intensity
  ])

  // Remove existing heatmap if it exists
  if (heat) {
    map.removeLayer(heat)
  }

  // Create and add heatmap layer
  heat = L.heatLayer(heatData, {
    radius: 20,
    blur: 15,
    maxZoom: 17,
    gradient: {
      0.2: "blue",
      0.4: "cyan",
      0.6: "lime",
      0.8: "yellow",
      1.0: "red",
    },
  }).addTo(map)

  // Add markers with popups for accident details
  addAccidentMarkers(data)
}

// Add markers with popups for each accident
function addAccidentMarkers(data) {
  // Remove existing markers if any
  if (window.markersLayer) {
    map.removeLayer(window.markersLayer)
  }

  window.markersLayer = L.layerGroup().addTo(map)

  data.forEach((accident, index) => {
    const marker = L.circleMarker([Number.parseFloat(accident.latitude), Number.parseFloat(accident.longitude)], {
      radius: 3,
      fillColor: "#d32f2f",
      color: "#000",
      weight: 0.5,
      opacity: 0.6,
      fillOpacity: 0.4,
    })

    const popup = `
            <div style="font-family: Arial, sans-serif; line-height: 1.5;">
                <h3 style="margin: 0 0 8px 0; color: #d32f2f;">Accident #${index + 1}</h3>
                <p><strong>Date & Time:</strong> ${accident.Date} at ${accident.Time}</p>
                <p><strong>Vehicles:</strong> ${accident.Number_of_Vehicles}</p>
                <p><strong>Location:</strong> [${accident.latitude}, ${accident.longitude}]</p>
            </div>
        `

    marker.bindPopup(popup)
    marker.addTo(window.markersLayer)
  })
}

// Add info box to the map
function addInfoBox() {
  const info = L.control()

  info.onAdd = function () {
    this._div = L.DomUtil.create("div", "info")
    this.update()
    return this._div
  }

  info.update = function () {
    this._div.innerHTML = `
            <h4>India Road Accident Map</h4>
            <p>Darker red areas indicate higher accident frequencies</p>
            <p><i>Click on markers for details</i></p>
        `
  }

  info.addTo(map)
}

// Add legend to the map
function addLegend() {
  const legend = L.control({ position: "bottomright" })

  legend.onAdd = () => {
    const div = L.DomUtil.create("div", "info legend")
    const grades = [0.2, 0.4, 0.6, 0.8, 1.0]
    const labels = ["Low", "Medium-Low", "Medium", "Medium-High", "High"]
    const colors = ["blue", "cyan", "lime", "yellow", "red"]

    div.innerHTML = "<h4>Accident Density</h4>"

    // Loop through density intervals and generate a label with colored square for each
    for (let i = 0; i < grades.length; i++) {
      div.innerHTML += '<i style="background:' + colors[i] + '"></i> ' + labels[i] + "<br>"
    }

    return div
  }

  legend.addTo(map)
}

// Add filter controls
function addControls() {
  const controls = L.control({ position: "topright" })

  controls.onAdd = () => {
    const div = L.DomUtil.create("div", "controls")
    div.innerHTML = `
            <h4>Filter Options</h4>
            <button class="active" onclick="filterData('all')">All Accidents</button>
            <button onclick="filterData('recent')">Last 30 Days</button>
            <button onclick="filterData('multi')">Multiple Vehicles</button>
            <button onclick="filterData('single')">Single Vehicle</button>
           <button onclick="showMyLocation()" style="background-color: #3498db; color: white;">My Location</button>
        `
    return div
  }

  controls.addTo(map)
}

// Add stats panel
function addStatsPanel() {
  const statsPanel = document.createElement("div")
  statsPanel.className = "stats"
  statsPanel.id = "statsPanel"
  statsPanel.innerHTML = '<h4>Accident Statistics</h4><div id="statsContent">Loading...</div>'
  document.body.appendChild(statsPanel)
}

// Add recent accidents panel
function addRecentAccidentsPanel() {
  const recentPanel = document.createElement("div")
  recentPanel.className = "recent-list"
  recentPanel.id = "recentPanel"
  recentPanel.innerHTML = '<h4>Recent Accidents</h4><div id="recentList">Loading...</div>'
  document.body.appendChild(recentPanel)
}

// Update the recent accidents panel
function updateRecentAccidentsPanel() {
  const recentList = document.getElementById("recentList")
  if (!recentList) return

  let html = ""

  if (recentAccidents.length === 0) {
    html = "<p>No recent accidents to display.</p>"
  } else {
    recentAccidents.forEach((accident) => {
      html += `
                <div class="recent-item">
                    <div><strong>Location: [${accident.latitude.substring(0, 6)}, ${accident.longitude.substring(0, 6)}]</strong></div>
                    <div>Vehicles involved: ${accident.Number_of_Vehicles}</div>
                    <div class="time-stamp">${accident.Date} at ${accident.Time}</div>
                </div>
            `
    })
  }

  recentList.innerHTML = html
}

// Calculate statistics from accident data
function calculateStats(data) {
  const totalAccidents = data.length

  // Count accidents by number of vehicles
  const singleVehicleAccidents = data.filter((a) => a.Number_of_Vehicles === "1").length
  const multiVehicleAccidents = data.filter((a) => Number.parseInt(a.Number_of_Vehicles) > 1).length

  // Update stats display
  const statsContent = document.getElementById("statsContent")
  if (statsContent) {
    statsContent.innerHTML = `
            <div><strong>Total Accidents:</strong> ${totalAccidents}</div>
            <div><strong>Single Vehicle:</strong> ${singleVehicleAccidents}</div>
            <div><strong>Multiple Vehicles:</strong> ${multiVehicleAccidents}</div>
        `
  }

  // Store stats for later use
  statsData = {
    totalAccidents,
    singleVehicleAccidents,
    multiVehicleAccidents,
  }
}

// Filter data based on selected criteria
window.filterData = (filter) => {
  // Set active button
  document.querySelectorAll(".controls button").forEach((btn) => {
    if (btn.getAttribute("onclick").includes(filter)) {
      btn.classList.add("active")
    } else {
      btn.classList.remove("active")
    }
  })

  currentFilter = filter

  // Apply filters
  applyFilters()
}

// Apply all active filters
function applyFilters() {
  let filteredData = [...window.accidentData]

  // Apply filter
  if (currentFilter === "recent") {
    // Convert string dates to Date objects for comparison
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    filteredData = filteredData.filter((accident) => {
      const accidentDate = new Date(accident.Date.split("-").reverse().join("-"))
      return accidentDate >= thirtyDaysAgo
    })
  } else if (currentFilter === "multi") {
    filteredData = filteredData.filter((accident) => Number.parseInt(accident.Number_of_Vehicles) > 1)
  } else if (currentFilter === "single") {
    filteredData = filteredData.filter((accident) => accident.Number_of_Vehicles === "1")
  }

  // Update heatmap
  updateHeatmap(filteredData)

  // Fit map to filtered data bounds
  fitMapToBounds(filteredData)
}

// Fit map bounds to display all accidents
function fitMapToBounds(data) {
  if (data.length > 0) {
    const bounds = L.latLngBounds()

    data.forEach((point) => {
      bounds.extend([Number.parseFloat(point.latitude), Number.parseFloat(point.longitude)])
    })

    map.fitBounds(bounds, {
      padding: [50, 50],
    })
  }
}

// Check for new accident data (simulating real-time updates)
function checkForUpdates() {
  // In a real implementation, this would check an API endpoint
  // For demonstration, we'll use a simulated update file
  fetch("accident-updates.json")
    .then((response) => {
      if (!response.ok) {
        // File might not exist, which is fine
        return { accidents: [] }
      }
      return response.json()
    })
    .then((data) => {
      if (data.accidents && data.accidents.length > 0) {
        handleNewAccidents(data.accidents)
      }
    })
    .catch((error) => {
      console.log("No updates available or error fetching updates.")
    })
}

// Handle new accident data
function handleNewAccidents(newAccidents) {
  // Add new accidents to the dataset
  let newCount = 0

  newAccidents.forEach((accident) => {
    // Check if accident already exists (using position as unique identifier)
    const exists = window.accidentData.some(
      (a) =>
        a.latitude === accident.latitude &&
        a.longitude === accident.longitude &&
        a.Date === accident.Date &&
        a.Time === accident.Time,
    )

    if (!exists) {
      window.accidentData.push(accident)
      newCount++

      // Add to recent accidents
      recentAccidents.unshift(accident)
      // Keep only the most recent 5
      if (recentAccidents.length > 5) {
        recentAccidents.pop()
      }
    }
  })

  if (newCount > 0) {
    // Update stats
    calculateStats(window.accidentData)

    // Update visualization with filtered data
    applyFilters()

    // Update recent accidents panel
    updateRecentAccidentsPanel()

    // Show notification
    showNotification(`${newCount} new accident${newCount > 1 ? "s" : ""} reported`)
  }
}

// Show notification for new accidents
function showNotification(message) {
  // Create notification element if it doesn't exist
  let notification = document.getElementById("notification")
  if (!notification) {
    notification = document.createElement("div")
    notification.id = "notification"
    notification.className = "notification"
    notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(209, 47, 47, 0.9);
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 2000;
            display: none;
        `
    document.body.appendChild(notification)
  }

  notification.textContent = message
  notification.style.display = "block"

  // Hide after 5 seconds
  setTimeout(() => {
    notification.style.display = "none"
  }, 5000)
}

// Global variable for user location marker
let userLocationMarker = null

// Function to get and show user's current location
window.showMyLocation = () => {
  if (navigator.geolocation) {
    // Show a loading indicator in the notification area
    showNotification("Getting your location...")

    navigator.geolocation.getCurrentPosition(
      // Success callback
      (position) => {
        const userLat = position.coords.latitude
        const userLng = position.coords.longitude

        // Remove previous marker if exists
        if (userLocationMarker) {
          map.removeLayer(userLocationMarker)
        }

        // Create a special marker for user location
        userLocationMarker = L.marker([userLat, userLng], {
          icon: L.divIcon({
            className: "user-location-marker",
            html: `<div style="background-color: #3498db; width: 15px; height: 15px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.5);"></div>`,
            iconSize: [15, 15],
            iconAnchor: [7.5, 7.5],
          }),
        }).addTo(map)

        // Add a popup with user location information
        userLocationMarker.bindPopup(`
                    <div style="text-align: center;">
                        <strong>Your Location</strong><br>
                        Lat: ${userLat.toFixed(6)}<br>
                        Lng: ${userLng.toFixed(6)}
                    </div>
                `)

        // Center the map on user location
        map.setView([userLat, userLng], 15)

        // Check if user is near accident-prone areas
        checkProximityToAccidents(userLat, userLng)

        // Show the nearest accident
        showNearestAccident(userLat, userLng)

        // Show success notification
        showNotification("Location found!")
      },
      // Error callback
      (error) => {
        let errorMessage = "Unable to retrieve your location. "

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage += "Please allow location access."
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage += "Location information unavailable."
            break
          case error.TIMEOUT:
            errorMessage += "Location request timed out."
            break
          case error.UNKNOWN_ERROR:
            errorMessage += "Unknown error occurred."
            break
        }

        showNotification(errorMessage)
      },
      // Options
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    )
  } else {
    showNotification("Geolocation is not supported by this browser.")
  }
}

// Function to check if user is near accident-prone areas
function checkProximityToAccidents(userLat, userLng) {
  if (!window.accidentData) return

  const proximityThreshold = 0.01 // Roughly 1km at the equator
  let nearbyCount = 0

  window.accidentData.forEach((accident) => {
    const accLat = Number.parseFloat(accident.latitude)
    const accLng = Number.parseFloat(accident.longitude)

    // Simple distance calculation (Euclidean)
    const distance = Math.sqrt(Math.pow(userLat - accLat, 2) + Math.pow(userLng - accLng, 2))

    if (distance < proximityThreshold) {
      nearbyCount++
    }
  })

  if (nearbyCount > 0) {
    showNotification(`Warning: You are near ${nearbyCount} accident-prone area${nearbyCount > 1 ? "s" : ""}.`)
  }
}

// Global variable for tracking ID
let locationTrackingId = null

// Function to start continuous location tracking
window.startLocationTracking = () => {
  if (navigator.geolocation) {
    // If already tracking, stop it first
    if (locationTrackingId) {
      window.stopLocationTracking()
    }

    showNotification("Starting location tracking...")

    locationTrackingId = navigator.geolocation.watchPosition(
      // Success callback
      (position) => {
        const userLat = position.coords.latitude
        const userLng = position.coords.longitude

        // Update marker position
        if (userLocationMarker) {
          userLocationMarker.setLatLng([userLat, userLng])
        } else {
          // Create marker if it doesn't exist
          window.showMyLocation()
        }

        // Check for nearby accidents
        checkProximityToAccidents(userLat, userLng)

        // Update nearest accident information
        showNearestAccident(userLat, userLng)
      },
      // Error callback
      (error) => {
        showNotification("Error tracking location: " + error.message)
        window.stopLocationTracking()
      },
      // Options
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    )

    // Add stop tracking button if not already present
    if (!document.getElementById("stopTrackingBtn")) {
      const controls = document.querySelector(".controls")
      const stopBtn = document.createElement("button")
      stopBtn.id = "stopTrackingBtn"
      stopBtn.innerHTML = "Stop Tracking"
      stopBtn.style.backgroundColor = "#e74c3c"
      stopBtn.style.color = "white"
      stopBtn.onclick = window.stopLocationTracking
      controls.appendChild(stopBtn)
    }
  } else {
    showNotification("Geolocation is not supported by this browser.")
  }
}

// Function to stop location tracking
window.stopLocationTracking = () => {
  if (locationTrackingId !== null) {
    navigator.geolocation.clearWatch(locationTrackingId)
    locationTrackingId = null
    showNotification("Location tracking stopped")

    // Remove the stop button
    const stopBtn = document.getElementById("stopTrackingBtn")
    if (stopBtn) {
      stopBtn.parentNode.removeChild(stopBtn)
    }
  }
}

// Global variables for the nearest accident feature
let nearestAccidentLine = null

// Function to show nearest accident (to be called from showMyLocation)
function showNearestAccident(userLat, userLng) {
  if (!window.accidentData || window.accidentData.length === 0) return

  let nearestDistance = Number.POSITIVE_INFINITY
  let nearestAccident = null

  // Find the nearest accident
  window.accidentData.forEach((accident) => {
    const accLat = Number.parseFloat(accident.latitude)
    const accLng = Number.parseFloat(accident.longitude)

    // Calculate distance in km using Haversine formula
    const R = 6371 // Earth radius in km
    const dLat = ((accLat - userLat) * Math.PI) / 180
    const dLon = ((accLng - userLng) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((userLat * Math.PI) / 180) * Math.cos((accLat * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = R * c

    if (distance < nearestDistance) {
      nearestDistance = distance
      nearestAccident = accident
    }
  })

  if (nearestAccident) {
    const distanceText =
      nearestDistance < 1 ? `${(nearestDistance * 1000).toFixed(0)} meters` : `${nearestDistance.toFixed(2)} km`

    // Create a line connecting user to nearest accident
    const linePoints = [
      [userLat, userLng],
      [Number.parseFloat(nearestAccident.latitude), Number.parseFloat(nearestAccident.longitude)],
    ]

    // Remove previous line if exists
    if (nearestAccidentLine) {
      map.removeLayer(nearestAccidentLine)
    }

    // Draw line
    nearestAccidentLine = L.polyline(linePoints, {
      color: "#e74c3c",
      weight: 2,
      opacity: 0.7,
      dashArray: "5, 10",
    }).addTo(map)

    // Create marker for nearest accident
    const nearestMarker = L.circleMarker(
      [Number.parseFloat(nearestAccident.latitude), Number.parseFloat(nearestAccident.longitude)],
      {
        radius: 8,
        fillColor: "#e74c3c",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8,
      },
    ).addTo(map)

    nearestMarker
      .bindPopup(`
            <div style="font-family: Arial, sans-serif; line-height: 1.5;">
                <h3 style="margin: 0 0 8px 0; color: #e74c3c;">Nearest Accident</h3>
                <p><strong>Distance from you:</strong> ${distanceText}</p>
                <p><strong>Date & Time:</strong> ${nearestAccident.Date} at ${nearestAccident.Time}</p>
                <p><strong>Vehicles:</strong> ${nearestAccident.Number_of_Vehicles}</p>
            </div>
        `)
      .openPopup()

    // Add info to user marker popup
    if (userLocationMarker) {
      userLocationMarker.bindPopup(`
                <div style="text-align: center;">
                    <strong>Your Location</strong><br>
                    Lat: ${userLat.toFixed(6)}<br>
                    Lng: ${userLng.toFixed(6)}<br>
                    <hr>
                    <strong>Nearest accident:</strong> ${distanceText} away<br>
                    Date: ${nearestAccident.Date} at ${nearestAccident.Time}
                </div>
            `)
    }

    // Show notification about nearest accident
    showNotification(`Nearest accident is ${distanceText} away. Use caution in this area.`)

    // Add the nearest accident to the route bounds
    const bounds = L.latLngBounds([
      [userLat, userLng],
      [Number.parseFloat(nearestAccident.latitude), Number.parseFloat(nearestAccident.longitude)],
    ])

    map.fitBounds(bounds, {
      padding: [50, 50],
    })
  }
}

// Fallback data if JSON file is not available
function getFallbackData() {
  return [
      {
          "latitude": "14.72402585",
          "longitude": "78.61039332",
          "Number_of_Vehicles": "1",
          "Time": "17:42",
          "Date": "04-01-2018"
      },
      {
          "latitude": "14.76235346",
          "longitude": "78.53404158",
          "Number_of_Vehicles": "1",
          "Time": "17:36",
          "Date": "05-01-2018"
      },
      {
          "latitude": "14.74560635",
          "longitude": "78.47087739",
          "Number_of_Vehicles": "2",
          "Time": "00:15",
          "Date": "06-01-2018"
      },
      {
          "latitude": "14.72402585",
          "longitude": "78.61039332",
          "Number_of_Vehicles": "1",
          "Time": "17:42",
          "Date": "04-01-2018"
      },
      {
          "latitude": "14.76235346",
          "longitude": "78.53404158",
          "Number_of_Vehicles": "1",
          "Time": "17:36",
          "Date": "05-01-2018"
      },
      {
          "latitude": "14.74560635",
          "longitude": "78.47087739",
          "Number_of_Vehicles": "2",
          "Time": "00:15",
          "Date": "06-01-2018"
      },
      {
          "latitude": "28.61393383",
          "longitude": "77.20902299",
          "Number_of_Vehicles": "3",
          "Time": "08:15",
          "Date": "10-01-2018"
      },
      {
          "latitude": "28.56271839",
          "longitude": "77.27382712",
          "Number_of_Vehicles": "2",
          "Time": "09:30",
          "Date": "12-01-2018"
      },
      {
          "latitude": "28.53824933",
          "longitude": "77.15937012",
          "Number_of_Vehicles": "1",
          "Time": "12:45",
          "Date": "15-01-2018"
      },
      {
          "latitude": "18.94026223",
          "longitude": "72.82624308",
          "Number_of_Vehicles": "4",
          "Time": "18:20",
          "Date": "17-01-2018"
      },
      {
          "latitude": "18.92552314",
          "longitude": "72.83283543",
          "Number_of_Vehicles": "1",
          "Time": "07:10",
          "Date": "20-01-2018"
      },
      {
          "latitude": "18.97128947",
          "longitude": "72.80984537",
          "Number_of_Vehicles": "2",
          "Time": "22:05",
          "Date": "22-01-2018"
      },
      {
          "latitude": "12.97657421",
          "longitude": "77.59348724",
          "Number_of_Vehicles": "3",
          "Time": "10:30",
          "Date": "25-01-2018"
      },
      {
          "latitude": "12.92783612",
          "longitude": "77.62735412",
          "Number_of_Vehicles": "2",
          "Time": "16:15",
          "Date": "28-01-2018"
      },
      {
          "latitude": "13.01284562",
          "longitude": "77.57198625",
          "Number_of_Vehicles": "1",
          "Time": "14:50",
          "Date": "30-01-2018"
      },
      {
          "latitude": "22.57256121",
          "longitude": "88.35698732",
          "Number_of_Vehicles": "3",
          "Time": "09:25",
          "Date": "02-02-2018"
      },
      {
          "latitude": "22.51283642",
          "longitude": "88.34192758",
          "Number_of_Vehicles": "1",
          "Time": "11:40",
          "Date": "05-02-2018"
      },
      {
          "latitude": "22.54796124",
          "longitude": "88.37291847",
          "Number_of_Vehicles": "2",
          "Time": "19:05",
          "Date": "08-02-2018"
      },
      {
          "latitude": "17.42316452",
          "longitude": "78.47328954",
          "Number_of_Vehicles": "2",
          "Time": "13:20",
          "Date": "10-02-2018"
      },
      {
          "latitude": "17.38741283",
          "longitude": "78.45619372",
          "Number_of_Vehicles": "3",
          "Time": "15:35",
          "Date": "13-02-2018"
      },
      {
          "latitude": "17.44928175",
          "longitude": "78.43709283",
          "Number_of_Vehicles": "1",
          "Time": "21:50",
          "Date": "15-02-2018"
      },
      {
          "latitude": "21.16428361",
          "longitude": "72.83173649",
          "Number_of_Vehicles": "1",
          "Time": "06:45",
          "Date": "18-02-2018"
      },
      {
          "latitude": "21.18972345",
          "longitude": "72.80917256",
          "Number_of_Vehicles": "2",
          "Time": "14:30",
          "Date": "21-02-2018"
      },
      {
          "latitude": "21.14628493",
          "longitude": "72.85723614",
          "Number_of_Vehicles": "3",
          "Time": "18:55",
          "Date": "23-02-2018"
      },
      {
          "latitude": "26.84562317",
          "longitude": "80.94618273",
          "Number_of_Vehicles": "2",
          "Time": "08:10",
          "Date": "25-02-2018"
      },
      {
          "latitude": "26.87319427",
          "longitude": "80.92174536",
          "Number_of_Vehicles": "1",
          "Time": "10:25",
          "Date": "28-02-2018"
      },
      {
          "latitude": "26.82741985",
          "longitude": "80.97298172",
          "Number_of_Vehicles": "2",
          "Time": "16:40",
          "Date": "03-03-2018"
      },
      {
          "latitude": "13.07931627",
          "longitude": "80.27125634",
          "Number_of_Vehicles": "3",
          "Time": "07:55",
          "Date": "05-03-2018"
      },
      {
          "latitude": "13.04286531",
          "longitude": "80.25719482",
          "Number_of_Vehicles": "2",
          "Time": "12:05",
          "Date": "08-03-2018"
      },
      {
          "latitude": "13.09784625",
          "longitude": "80.29381742",
          "Number_of_Vehicles": "1",
          "Time": "19:20",
          "Date": "10-03-2018"
      },
      {
          "latitude": "23.03218745",
          "longitude": "72.58479132",
          "Number_of_Vehicles": "2",
          "Time": "05:35",
          "Date": "13-03-2018"
      },
      {
          "latitude": "23.06194835",
          "longitude": "72.56329817",
          "Number_of_Vehicles": "3",
          "Time": "11:50",
          "Date": "15-03-2018"
      },
      {
          "latitude": "23.01723648",
          "longitude": "72.60128354",
          "Number_of_Vehicles": "1",
          "Time": "17:05",
          "Date": "18-03-2018"
      },
      {
          "latitude": "19.12847563",
          "longitude": "72.90156734",
          "Number_of_Vehicles": "2",
          "Time": "06:20",
          "Date": "20-03-2018"
      },
      {
          "latitude": "19.09123674",
          "longitude": "72.88423518",
          "Number_of_Vehicles": "1",
          "Time": "13:35",
          "Date": "23-03-2018"
      },
      {
          "latitude": "19.14629518",
          "longitude": "72.92371528",
          "Number_of_Vehicles": "3",
          "Time": "20:50",
          "Date": "25-03-2018"
      },
      {
          "latitude": "17.73184562",
          "longitude": "83.30417582",
          "Number_of_Vehicles": "2",
          "Time": "07:05",
          "Date": "28-03-2018"
      },
      {
          "latitude": "17.70365128",
          "longitude": "83.27983416",
          "Number_of_Vehicles": "1",
          "Time": "09:20",
          "Date": "30-03-2018"
      },
      {
          "latitude": "17.75421835",
          "longitude": "83.32815643",
          "Number_of_Vehicles": "2",
          "Time": "15:35",
          "Date": "02-04-2018"
      },
      {
          "latitude": "25.60723154",
          "longitude": "85.12346751",
          "Number_of_Vehicles": "3",
          "Time": "11:50",
          "Date": "04-04-2018"
      },
      {
          "latitude": "25.58142863",
          "longitude": "85.14982631",
          "Number_of_Vehicles": "1",
          "Time": "14:05",
          "Date": "07-04-2018"
      },
      {
          "latitude": "25.62935174",
          "longitude": "85.10128437",
          "Number_of_Vehicles": "2",
          "Time": "18:20",
          "Date": "09-04-2018"
      },
      {
          "latitude": "30.73145628",
          "longitude": "76.78291436",
          "Number_of_Vehicles": "1",
          "Time": "08:35",
          "Date": "12-04-2018"
      },
      {
          "latitude": "30.75623814",
          "longitude": "76.76485219",
          "Number_of_Vehicles": "2",
          "Time": "14:50",
          "Date": "14-04-2018"
      },
      {
          "latitude": "30.71284563",
          "longitude": "76.80129384",
          "Number_of_Vehicles": "3",
          "Time": "21:05",
          "Date": "17-04-2018"
      },
      {
          "latitude": "11.01473825",
          "longitude": "76.95612348",
          "Number_of_Vehicles": "2",
          "Time": "07:20",
          "Date": "19-04-2018"
      },
      {
          "latitude": "11.04128356",
          "longitude": "76.93845217",
          "Number_of_Vehicles": "1",
          "Time": "10:35",
          "Date": "22-04-2018"
      },
      {
          "latitude": "10.99328156",
          "longitude": "76.97128534",
          "Number_of_Vehicles": "2",
          "Time": "16:50",
          "Date": "24-04-2018"
      },
      {
          "latitude": "26.45781245",
          "longitude": "80.32145628",
          "Number_of_Vehicles": "3",
          "Time": "09:05",
          "Date": "27-04-2018"
      },
      {
          "latitude": "26.42936451",
          "longitude": "80.34812573",
          "Number_of_Vehicles": "2",
          "Time": "12:20",
          "Date": "29-04-2018"
      },
      {
          "latitude": "26.48127345",
          "longitude": "80.30128456",
          "Number_of_Vehicles": "1",
          "Time": "18:35",
          "Date": "02-05-2018"
      },
      {
          "latitude": "8.49326184",
          "longitude": "76.94812537",
          "Number_of_Vehicles": "2",
          "Time": "07:50",
          "Date": "04-05-2018"
      },
      {
          "latitude": "8.51942617",
          "longitude": "76.92718254",
          "Number_of_Vehicles": "3",
          "Time": "14:05",
          "Date": "07-05-2018"
      },
      {
          "latitude": "8.47128453",
          "longitude": "76.96312458",
          "Number_of_Vehicles": "1",
          "Time": "20:20",
          "Date": "09-05-2018"
      },
      {
          "latitude": "17.03142865",
          "longitude": "81.79134625",
          "Number_of_Vehicles": "2",
          "Time": "06:35",
          "Date": "12-05-2018"
      },
      {
          "latitude": "17.05834621",
          "longitude": "81.77218453",
          "Number_of_Vehicles": "1",
          "Time": "13:50",
          "Date": "14-05-2018"
      },
      {
          "latitude": "17.01235487",
          "longitude": "81.81238456",
          "Number_of_Vehicles": "3",
          "Time": "17:05",
          "Date": "17-05-2018"
      },
      {
          "latitude": "20.93214856",
          "longitude": "77.75618293",
          "Number_of_Vehicles": "2",
          "Time": "08:20",
          "Date": "19-05-2018"
      },
      {
          "latitude": "20.95682314",
          "longitude": "77.73129854",
          "Number_of_Vehicles": "1",
          "Time": "10:35",
          "Date": "22-05-2018"
      },
      {
          "latitude": "20.91385624",
          "longitude": "77.77328156",
          "Number_of_Vehicles": "2",
          "Time": "16:50",
          "Date": "24-05-2018"
      },
      {
          "latitude": "16.49326184",
          "longitude": "80.64218453",
          "Number_of_Vehicles": "3",
          "Time": "09:05",
          "Date": "27-05-2018"
      },
      {
          "latitude": "16.51732148",
          "longitude": "80.62149825",
          "Number_of_Vehicles": "1",
          "Time": "12:20",
          "Date": "29-05-2018"
      },
      {
          "latitude": "16.47128354",
          "longitude": "80.66381742",
          "Number_of_Vehicles": "2",
          "Time": "18:35",
          "Date": "01-06-2018"
      },
      {
          "latitude": "31.63142856",
          "longitude": "74.87325416",
          "Number_of_Vehicles": "1",
          "Time": "07:50",
          "Date": "03-06-2018"
      },
      {
          "latitude": "31.65894217",
          "longitude": "74.85128453",
          "Number_of_Vehicles": "2",
          "Time": "14:05",
          "Date": "06-06-2018"
      },
      {
          "latitude": "31.61238456",
          "longitude": "74.89321875",
          "Number_of_Vehicles": "3",
          "Time": "20:20",
          "Date": "08-06-2018"
      },
      {
          "latitude": "24.57982345",
          "longitude": "73.68512347",
          "Number_of_Vehicles": "2",
          "Time": "06:35",
          "Date": "11-06-2018"
      },
      {
          "latitude": "24.60123485",
          "longitude": "73.66324158",
          "Number_of_Vehicles": "1",
          "Time": "13:50",
          "Date": "13-06-2018"
      },
      {
          "latitude": "24.55812437",
          "longitude": "73.70218456",
          "Number_of_Vehicles": "2",
          "Time": "17:05",
          "Date": "16-06-2018"
      },
      {
          "latitude": "26.92184563",
          "longitude": "75.78215634",
          "Number_of_Vehicles": "3",
          "Time": "09:20",
          "Date": "18-06-2018"
      },
      {
          "latitude": "26.94562378",
          "longitude": "75.76128453",
          "Number_of_Vehicles": "2",
          "Time": "11:35",
          "Date": "21-06-2018"
      },
      {
          "latitude": "26.90128456",
          "longitude": "75.80328156",
          "Number_of_Vehicles": "1",
          "Time": "17:50",
          "Date": "23-06-2018"
      },
      {
          "latitude": "19.93214856",
          "longitude": "73.78215634",
          "Number_of_Vehicles": "2",
          "Time": "08:05",
          "Date": "26-06-2018"
      },
      {
          "latitude": "19.95612348",
          "longitude": "73.76324158",
          "Number_of_Vehicles": "3",
          "Time": "13:20",
          "Date": "28-06-2018"
      },
      {
          "latitude": "19.91328154",
          "longitude": "73.80128456",
          "Number_of_Vehicles": "1",
          "Time": "20:35",
          "Date": "01-07-2018"
      },
      {
          "latitude": "10.78215634",
          "longitude": "79.13214856",
          "Number_of_Vehicles": "2",
          "Time": "06:50",
          "Date": "03-07-2018"
      },
      {
          "latitude": "10.80324158",
          "longitude": "79.11328154",
          "Number_of_Vehicles": "1",
          "Time": "09:05",
          "Date": "06-07-2018"
      },
      {
          "latitude": "10.76128453",
          "longitude": "79.15612348",
          "Number_of_Vehicles": "3",
          "Time": "15:20",
          "Date": "08-07-2018"
      },
      {
          "latitude": "15.48215634",
          "longitude": "78.46732148",
          "Number_of_Vehicles": "2",
          "Time": "10:35",
          "Date": "11-07-2018"
      },
      {
          "latitude": "15.50328156",
          "longitude": "78.44562378",
          "Number_of_Vehicles": "1",
          "Time": "12:50",
          "Date": "13-07-2018"
      },
      {
          "latitude": "15.46128453",
          "longitude": "78.48732184",
          "Number_of_Vehicles": "2",
          "Time": "19:05",
          "Date": "16-07-2018"
      },
      {
          "latitude": "23.17282456",
          "longitude": "77.43214856",
          "Number_of_Vehicles": "3",
          "Time": "07:20",
          "Date": "18-07-2018"
      },
      {
          "latitude": "23.19324158",
          "longitude": "77.41328154",
          "Number_of_Vehicles": "1",
          "Time": "14:35",
          "Date": "21-07-2018"
      },
      {
          "latitude": "23.15128453",
          "longitude": "77.45612348",
          "Number_of_Vehicles": "2",
          "Time": "20:50",
          "Date": "23-07-2018"
      },
      {
          "latitude": "18.46732148",
          "longitude": "73.85612348",
          "Number_of_Vehicles": "1",
          "Time": "06:05",
          "Date": "26-07-2018"
      },
      {
          "latitude": "18.48732184",
          "longitude": "73.83214856",
          "Number_of_Vehicles": "2",
          "Time": "12:20",
          "Date": "28-07-2018"
      },
      {
          "latitude": "18.44562378",
          "longitude": "73.87324158",
          "Number_of_Vehicles": "3",
          "Time": "18:35",
          "Date": "31-07-2018"
      },
      {
          "latitude": "10.08215634",
          "longitude": "78.78215634",
          "Number_of_Vehicles": "2",
          "Time": "08:50",
          "Date": "02-08-2018"
      },
      {
          "latitude": "10.10328156",
          "longitude": "78.76128453",
          "Number_of_Vehicles": "1",
          "Time": "10:05",
          "Date": "05-08-2018"
      },
      {
          "latitude": "10.06324158",
          "longitude": "78.80324158",
          "Number_of_Vehicles": "2",
          "Time": "16:20",
          "Date": "07-08-2018"
      },
      {
          "latitude": "26.06128453",
          "longitude": "91.78215634",
          "Number_of_Vehicles": "3",
          "Time": "09:35",
          "Date": "10-08-2018"
      },
      {
          "latitude": "26.08215634",
          "longitude": "91.76128453",
          "Number_of_Vehicles": "2",
          "Time": "12:50",
          "Date": "12-08-2018"
      },
      {
          "latitude": "26.04562378",
          "longitude": "91.80324158",
          "Number_of_Vehicles": "1",
          "Time": "19:05",
          "Date": "15-08-2018"
      },
      {
          "latitude": "29.95612348",
          "longitude": "78.16324158",
          "Number_of_Vehicles": "2",
          "Time": "06:20",
          "Date": "17-08-2018"
      },
      {
          "latitude": "29.97324158",
          "longitude": "78.14562378",
          "Number_of_Vehicles": "3",
          "Time": "13:35",
          "Date": "20-08-2018"
      },
      {
          "latitude": "29.93214856",
          "longitude": "78.18215634",
          "Number_of_Vehicles": "1",
          "Time": "15:50",
          "Date": "22-08-2018"
      },
      {
          "latitude": "27.17324158",
          "longitude": "78.01328154",
          "Number_of_Vehicles": "2",
          "Time": "08:05",
          "Date": "25-08-2018"
      },
      {
          "latitude": "27.19128453",
          "longitude": "77.99562378",
          "Number_of_Vehicles": "1",
          "Time": "14:20",
          "Date": "27-08-2018"
      },
      {
          "latitude": "27.15612348",
          "longitude": "78.03214856",
          "Number_of_Vehicles": "3",
          "Time": "17:35",
          "Date": "30-08-2018"
      },
      {
          "latitude": "24.57324158",
          "longitude": "72.95612348",
          "Number_of_Vehicles": "2",
          "Time": "09:50",
          "Date": "01-09-2018"
      },
      {
          "latitude": "24.59128453",
          "longitude": "72.93214856",
          "Number_of_Vehicles": "1",
          "Time": "12:05",
          "Date": "04-09-2018"
      },
      {
          "latitude": "24.55612348",
          "longitude": "72.97324158",
          "Number_of_Vehicles": "2",
          "Time": "18:20",
          "Date": "06-09-2018"
      },
      {
          "latitude": "21.67324158",
          "longitude": "73.01328154",
          "Number_of_Vehicles": "3",
          "Time": "07:35",
          "Date": "09-09-2018"
      },
      {
          "latitude": "21.69128453",
          "longitude": "72.99562378",
          "Number_of_Vehicles": "1",
          "Time": "13:50",
          "Date": "11-09-2018"
      },
      {
          "latitude": "21.65612348",
          "longitude": "73.03214856",
          "Number_of_Vehicles": "2",
          "Time": "20:05",
          "Date": "14-09-2018"
      },
      {
          "latitude": "28.47324158",
          "longitude": "77.01328154",
          "Number_of_Vehicles": "1",
          "Time": "06:20",
          "Date": "16-09-2018"
      },
      {
          "latitude": "28.49128453",
          "longitude": "76.99562378",
          "Number_of_Vehicles": "2",
          "Time": "12:35",
          "Date": "19-09-2018"
      },
      {
          "latitude": "28.45612348",
          "longitude": "77.03214856",
          "Number_of_Vehicles": "3",
          "Time": "18:50",
          "Date": "21-09-2018"
      },
      {
          "latitude": "23.87324158",
          "longitude": "91.25612348",
          "Number_of_Vehicles": "2",
          "Time": "08:05",
          "Date": "24-09-2018"
      },
      {
          "latitude": "23.89128453",
          "longitude": "91.23214856",
          "Number_of_Vehicles": "1",
          "Time": "10:20",
          "Date": "26-09-2018"
      },
      {
          "latitude": "23.85612348",
          "longitude": "91.27324158",
          "Number_of_Vehicles": "2",
          "Time": "16:35",
          "Date": "29-09-2018"
      },
      {
          "latitude": "19.17324158",
          "longitude": "72.85612348",
          "Number_of_Vehicles": "3",
          "Time": "09:50",
          "Date": "01-10-2018"
      },
      {
          "latitude": "19.19128453",
          "longitude": "72.83214856",
          "Number_of_Vehicles": "1",
          "Time": "15:05",
          "Date": "04-10-2018"
      },
      {
          "latitude": "19.15612348",
          "longitude": "72.87324158",
          "Number_of_Vehicles": "2",
          "Time": "17:20",
          "Date": "06-10-2018"
      },
      {
          "latitude": "12.97324158",
          "longitude": "80.25612348",
          "Number_of_Vehicles": "1",
          "Time": "07:35",
          "Date": "09-10-2018"
      },
      {
          "latitude": "12.99128453",
          "longitude": "80.23214856",
          "Number_of_Vehicles": "2",
          "Time": "13:50",
          "Date": "11-10-2018"
      },
      {
          "latitude": "12.95612348",
          "longitude": "80.27324158",
          "Number_of_Vehicles": "3",
          "Time": "20:05",
          "Date": "14-10-2018"
      },
      {
          "latitude": "17.37324158",
          "longitude": "78.45612348",
          "Number_of_Vehicles": "2",
          "Time": "08:20",
          "Date": "16-10-2018"
      },
      {
          "latitude": "17.39128453",
          "longitude": "78.43214856",
          "Number_of_Vehicles": "1",
          "Time": "10:35",
          "Date": "19-10-2018"
      },
      {
          "latitude": "17.35612348",
          "longitude": "78.47324158",
          "Number_of_Vehicles": "2",
          "Time": "16:50",
          "Date": "21-10-2018"
      },
      {
          "latitude": "9.57324158",
          "longitude": "76.55612348",
          "Number_of_Vehicles": "3",
          "Time": "07:05",
          "Date": "24-10-2018"
      },
      {
          "latitude": "9.59128453",
          "longitude": "76.53214856",
          "Number_of_Vehicles": "1",
          "Time": "14:20",
          "Date": "26-10-2018"
      },
      {
          "latitude": "9.55612348",
          "longitude": "76.57324158",
          "Number_of_Vehicles": "2",
          "Time": "19:35",
          "Date": "29-10-2018"
      },
      {
          "latitude": "22.57324158",
          "longitude": "75.75612348",
          "Number_of_Vehicles": "1",
          "Time": "08:50",
          "Date": "31-10-2018"
      },
      {
          "latitude": "22.59128453",
          "longitude": "75.73214856",
          "Number_of_Vehicles": "2",
          "Time": "10:05",
          "Date": "03-11-2018"
      }
  ];
}