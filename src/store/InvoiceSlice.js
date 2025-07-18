import { createSlice } from "@reduxjs/toolkit";
import { addDays, format } from "date-fns";
import { Mars } from "lucide-react";


const loadState = () => {
  try {
    const serializedState = localStorage.getItem('invoices');
    if (serializedState === null) {    
      return {
        invoices: [],
        filter: 'all',    
        isFormOpen: false,
        selectedInvoice: null,
      };
    } 
    return JSON.parse(serializedState);
  } catch (e) { 
    console.error("Could not load state", e);
     return {
        invoices: [],
        filter: 'all',    
        isFormOpen: false,
        selectedInvoice: null,
      };
  }
};

const initialState = loadState();

const SaveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('invoices', serializedState);
  } catch (e) {
    console.error("Could not save state", e);
  }
};

const calculateAmount = (items) => {
  return items.reduce((acc, item) => {
    return acc + (item.price * item.quantity);
  }, 0);
};

const invoiceSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    addInvoice: (state, action) => {
      const newInvoice = {
        ...action.payload,
        amount: calculateAmount(action.payload.items),
        status: action.payload.status || 'pending',
        dueDate: action.payload.dueDate || format(addDays(new Date(), 30), "yyyy-MM-dd"),
      };
      state.invoices.push(newInvoice);
      SaveState(state);
      state.isFormOpen = false;
    },

    setFilter: (state, action) => {
      state.filter = action.payload;
    },

    toggleForm: (state) => {
      state.isFormOpen = !state.isFormOpen;
      if (!state.isFormOpen) {
        state.selectedInvoice = null;
      }
    },

    setSelectedInvoice: (state, action) => {
      state.selectedInvoice = action.payload;
      state.isFormOpen = false;
    },

    marksAsPaid: (state, action) => {
      const invoice = state.invoices.find((inv) => inv.id === action.payload);
      if (invoice) {
        invoice.status = 'paid';
        state.selectedInvoice = null;
        state.isFormOpen = false;
        SaveState(state);
      }
    },

    deleteInvoice: (state, action) => {
      state.invoices = state.invoices.filter((inv) => inv.id !== action.payload);
      state.selectedInvoice = null;
      state.isFormOpen = false;
      SaveState(state);
    },

    updateInvoice: (state, action)=> {
      const updateInvoice = {...action.payload , 
        amount: calculateAmount(action.payload.items),
      };

      const index = state.invoices.findIndex((inv) => inv.id === updateInvoice.id);
      if (index !== -1) {
        state.invoices[index] = updateInvoice;
    }
      state.selectedInvoice = null;
      state.isFormOpen = false;
      SaveState(state);
  },
  },
});

export const { toggleForm, addInvoice, setFilter, setSelectedInvoice, marksAsPaid,  deleteInvoice, updateInvoice } = invoiceSlice.actions;
export default invoiceSlice.reducer;