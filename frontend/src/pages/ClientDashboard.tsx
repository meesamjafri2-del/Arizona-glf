import React, { useState, useEffect } from 'react';

interface Shipment {
  id: string;
  origin: string;
  destination: string;
  status: string;
  estimatedDelivery: string;
  trackingNumber: string;
}

const ClientDashboard: React.FC = () => {
  const [shipments, setShipments] = useState<Shipment[]>([
    {
      id: '1',
      origin: 'Phoenix, AZ',
      destination: 'Los Angeles, CA',
      status: 'In Transit',
      estimatedDelivery: '2024-01-20',
      trackingNumber: 'GLF123456789'
    },
    {
      id: '2',
      origin: 'Tucson, AZ',
      destination: 'Denver, CO',
      status: 'Delivered',
      estimatedDelivery: '2024-01-18',
      trackingNumber: 'GLF987654321'
    }
  ]);

  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingResult, setTrackingResult] = useState<Shipment | null>(null);

  const handleTrackShipment = (e: React.FormEvent) => {
    e.preventDefault();
    const shipment = shipments.find(s => s.trackingNumber === trackingNumber);
    setTrackingResult(shipment || null);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'in transit':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Client Dashboard</h1>
          <p className="text-gray-600 mt-2">Track your shipments and manage your logistics</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-brandBlue">12</div>
              <div className="text-gray-600 text-sm">Active Shipments</div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">8</div>
              <div className="text-gray-600 text-sm">Delivered This Month</div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-500">3</div>
              <div className="text-gray-600 text-sm">Pending Pickup</div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-brandBlue">98%</div>
              <div className="text-gray-600 text-sm">On-Time Delivery</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Track Shipment */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Track Shipment</h2>
              <form onSubmit={handleTrackShipment} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tracking Number
                  </label>
                  <div className="flex gap-4">
                    <input
                      type="text"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      placeholder="Enter tracking number (e.g., GLF123456789)"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandBlue focus:border-transparent"
                    />
                    <button
                      type="submit"
                      className="bg-brandBlue text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Track
                    </button>
                  </div>
                </div>
              </form>

              {trackingResult && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Tracking Result</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Origin:</span>
                      <div className="font-medium">{trackingResult.origin}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Destination:</span>
                      <div className="font-medium">{trackingResult.destination}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Status:</span>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(trackingResult.status)}`}>
                        {trackingResult.status}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Est. Delivery:</span>
                      <div className="font-medium">{trackingResult.estimatedDelivery}</div>
                    </div>
                  </div>
                </div>
              )}

              {trackingNumber && !trackingResult && trackingNumber.length > 0 && (
                <div className="mt-6 p-4 bg-red-50 rounded-lg">
                  <p className="text-red-700">No shipment found with tracking number: {trackingNumber}</p>
                </div>
              )}
            </div>

            {/* Recent Shipments */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Recent Shipments</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tracking #
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Route
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Est. Delivery
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {shipments.map((shipment) => (
                      <tr key={shipment.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {shipment.trackingNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {shipment.origin} → {shipment.destination}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(shipment.status)}`}>
                            {shipment.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {shipment.estimatedDelivery}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-brandBlue text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  Schedule Pickup
                </button>
                <button className="w-full border border-brandBlue text-brandBlue py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors">
                  Get Quote
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                  Contact Support
                </button>
              </div>
            </div>

            {/* Account Info */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-600">Company:</span>
                  <div className="font-medium">Your Company Name</div>
                </div>
                <div>
                  <span className="text-gray-600">Account Manager:</span>
                  <div className="font-medium">Sarah Johnson</div>
                </div>
                <div>
                  <span className="text-gray-600">Phone:</span>
                  <div className="font-medium">(602) 555-0123</div>
                </div>
                <div>
                  <span className="text-gray-600">Email:</span>
                  <div className="font-medium">sarah.johnson@arizonaglf.com</div>
                </div>
              </div>
            </div>

            {/* Support */}
            <div className="bg-brandBlue rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
              <p className="text-sm mb-4 opacity-90">
                Our customer support team is available 24/7 to assist you.
              </p>
              <button className="bg-white text-brandBlue py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;