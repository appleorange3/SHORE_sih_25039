'use client';

import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { Icon, divIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Ocean-related hazard data only
const hazardData = [
  {
    id: 1,
    lat: 19.0760,
    lng: 72.8777,
    location: "Mumbai",
    type: "Flood Warning",
    severity: "high",
    description: "Heavy rainfall causing waterlogging in multiple coastal areas",
    timestamp: "1 hour ago",
    affectedPeople: 2500000
  },
  {
    id: 2,
    lat: 22.5726,
    lng: 88.3639,
    location: "Kolkata",
    type: "Cyclone Alert",
    severity: "critical",
    description: "Cyclone approaching coastal regions. Evacuation advised.",
    timestamp: "4 hours ago",
    affectedPeople: 320000
  },
  {
    id: 3,
    lat: 12.2958,
    lng: 76.6394,
    location: "Mysore",
    type: "Tsunami Warning",
    severity: "high",
    description: "Tsunami detected in nearby coastal areas. Stay away from shorelines.",
    timestamp: "6 hours ago",
    affectedPeople: 180000
  }
];

// Severity configuration
const severityConfig = {
  low: {
    color: '#10b981', // green
    bgColor: 'bg-green-500',
    textColor: 'text-green-700',
    radius: 15000
  },
  medium: {
    color: '#f59e0b', // yellow
    bgColor: 'bg-yellow-500',
    textColor: 'text-yellow-700',
    radius: 25000
  },
  high: {
    color: '#ef4444', // red
    bgColor: 'bg-red-500',
    textColor: 'text-red-700',
    radius: 35000
  },
  critical: {
    color: '#7c3aed', // purple
    bgColor: 'bg-purple-700',
    textColor: 'text-purple-700',
    radius: 50000
  }
};

// Custom marker icon based on severity
const createCustomIcon = (severity: string) => {
  const config = severityConfig[severity as keyof typeof severityConfig];
  
  return divIcon({
    html: `
      <div class="relative">
        <div class="w-6 h-6 rounded-full ${config.bgColor} border-2 border-white shadow-lg animate-pulse"></div>
        <div class="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-white"></div>
      </div>
    `,
    className: 'custom-div-icon',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

export default function OceanHazardMap() {
  return (
    <div className="w-full h-[600px] rounded-xl overflow-hidden shadow-lg relative">
      <MapContainer
        center={[20.5937, 78.9629]} // Center of India
        zoom={5}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {hazardData.map((hazard) => {
          const config = severityConfig[hazard.severity as keyof typeof severityConfig];
          
          return (
            <div key={hazard.id}>
              <Circle
                center={[hazard.lat, hazard.lng]}
                radius={config.radius}
                pathOptions={{
                  color: config.color,
                  fillColor: config.color,
                  fillOpacity: 0.1,
                  weight: 2,
                  opacity: 0.6
                }}
              />
              
              <Marker
                position={[hazard.lat, hazard.lng]}
                icon={createCustomIcon(hazard.severity)}
              >
                <Popup className="custom-popup" maxWidth={300}>
                  <div className="p-2">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-lg">{hazard.type}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${config.textColor} ${config.bgColor} bg-opacity-20`}>
                        {hazard.severity.toUpperCase()}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-2">{hazard.description}</p>
                    
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium">Location:</span>
                        <span>{hazard.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Affected:</span>
                        <span>{hazard.affectedPeople.toLocaleString()} people</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Updated:</span>
                        <span>{hazard.timestamp}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-2 border-t">
                      <button className="w-full bg-blue-500 text-white py-1 px-3 rounded text-sm hover:bg-blue-600 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                </Popup>
              </Marker>
            </div>
          );
        })}
      </MapContainer>

      {/* Legend overlay */}
      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-lg text-sm z-10">
        <h3 className="font-bold mb-3 text-gray-800">Ocean Disaster Severity</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="w-4 h-4 rounded-full bg-green-500 border border-white shadow"></span>
            <span className="text-gray-700">Low Risk</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-4 h-4 rounded-full bg-yellow-500 border border-white shadow"></span>
            <span className="text-gray-700">Medium Risk</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-4 h-4 rounded-full bg-red-500 border border-white shadow"></span>
            <span className="text-gray-700">High Risk</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-4 h-4 rounded-full bg-purple-700 border border-white shadow"></span>
            <span className="text-gray-700">Critical</span>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Click markers for details
          </p>
        </div>
      </div>

      {/* Stats overlay */}
      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-lg text-sm z-10">
        <h3 className="font-bold mb-2 text-gray-800">Live Stats</h3>
        <div className="space-y-1">
          <div className="flex justify-between gap-4">
            <span className="text-gray-600">Active Alerts:</span>
            <span className="font-semibold text-red-600">{hazardData.length}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-gray-600">People Affected:</span>
            <span className="font-semibold text-orange-600">
              {hazardData.reduce((sum, h) => sum + h.affectedPeople, 0).toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-gray-600">Critical:</span>
            <span className="font-semibold text-purple-600">
              {hazardData.filter(h => h.severity === 'critical').length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
