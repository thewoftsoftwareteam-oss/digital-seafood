import React, { createContext, useContext, useState, useEffect } from 'react';

const SelectionContext = createContext();

export function SelectionProvider({ children }) {
  // Table number initialization: check URL param ?table=X first, then localStorage, then default to '01'
  const [tableNumber, setTableNumberState] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tableFromUrl = params.get('table');
      if (tableFromUrl) {
        return tableFromUrl;
      }
      return localStorage.getItem('seafood_table_number') || '01';
    }
    return '01';
  });

  const [selectedItems, setSelectedItems] = useState(() => {
    try {
      const saved = localStorage.getItem('seafood_selected_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('seafood_table_number', tableNumber);
  }, [tableNumber]);

  useEffect(() => {
    localStorage.setItem('seafood_selected_items', JSON.stringify(selectedItems));
  }, [selectedItems]);

  const setTableNumber = (num) => {
    setTableNumberState(num);
  };

  /**
   * Adds or updates a dish in the selection list
   */
  const addItem = ({ item, quantity = 1, selectedSpicy = '', selectedCooking = '', selectedSauce = '', specialNotes = '' }) => {
    setSelectedItems(prev => {
      // Find if an identical customization already exists
      const existingIndex = prev.findIndex(entry => 
        entry.item.id === item.id &&
        entry.selectedSpicy === selectedSpicy &&
        entry.selectedCooking === selectedCooking &&
        entry.selectedSauce === selectedSauce &&
        entry.specialNotes === specialNotes
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      const newEntry = {
        selectionId: `${item.id}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        item,
        quantity,
        selectedSpicy,
        selectedCooking,
        selectedSauce,
        specialNotes
      };
      return [...prev, newEntry];
    });
  };

  const updateQuantity = (selectionId, delta) => {
    setSelectedItems(prev => {
      return prev.map(entry => {
        if (entry.selectionId === selectionId) {
          const newQty = entry.quantity + delta;
          return newQty > 0 ? { ...entry, quantity: newQty } : null;
        }
        return entry;
      }).filter(Boolean);
    });
  };

  const removeItem = (selectionId) => {
    setSelectedItems(prev => prev.filter(entry => entry.selectionId !== selectionId));
  };

  const clearSelection = () => {
    setSelectedItems([]);
  };

  // Calculations
  const totalItemCount = selectedItems.reduce((acc, entry) => acc + entry.quantity, 0);
  const totalUsd = selectedItems.reduce((acc, entry) => acc + (entry.item.priceUsd * entry.quantity), 0);

  return (
    <SelectionContext.Provider
      value={{
        tableNumber,
        setTableNumber,
        selectedItems,
        addItem,
        updateQuantity,
        removeItem,
        clearSelection,
        totalItemCount,
        totalUsd
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
}

export function useSelection() {
  return useContext(SelectionContext);
}
