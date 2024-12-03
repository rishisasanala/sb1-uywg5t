import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Vendor } from './types/vendor';
import { VendorForm } from './components/VendorForm';
import { VendorList } from './components/VendorList';
import { generateVendorId } from './utils/vendors';

function App() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingVendor, setEditingVendor] = useState<Vendor | undefined>();

  const handleAddVendor = (vendorData: Omit<Vendor, 'id'>) => {
    const newVendor = { ...vendorData, id: generateVendorId() };
    setVendors([...vendors, newVendor]);
    setIsFormOpen(false);
  };

  const handleUpdateVendor = (vendorData: Omit<Vendor, 'id'>) => {
    if (!editingVendor) return;
    const updatedVendors = vendors.map((vendor) =>
      vendor.id === editingVendor.id ? { ...vendorData, id: vendor.id } : vendor
    );
    setVendors(updatedVendors);
    setEditingVendor(undefined);
  };

  const handleDeleteVendor = (id: string) => {
    if (window.confirm('Are you sure you want to delete this vendor?')) {
      setVendors(vendors.filter((vendor) => vendor.id !== id));
    }
  };

  const handleEdit = (vendor: Vendor) => {
    setEditingVendor(vendor);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingVendor(undefined);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Vendor Management</h1>
            <button
              onClick={() => setIsFormOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="mr-2" size={20} />
              Add Vendor
            </button>
          </div>

          {(isFormOpen || editingVendor) && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
              <div className="max-w-md w-full">
                <VendorForm
                  vendor={editingVendor}
                  onSubmit={editingVendor ? handleUpdateVendor : handleAddVendor}
                  onCancel={handleCloseForm}
                />
              </div>
            </div>
          )}

          <div className="bg-white shadow rounded-lg">
            <VendorList
              vendors={vendors}
              onEdit={handleEdit}
              onDelete={handleDeleteVendor}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;