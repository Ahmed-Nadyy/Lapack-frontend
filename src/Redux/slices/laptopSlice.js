import { createSlice } from '@reduxjs/toolkit';
import { laptopService } from '../../api/services';

const initialState = {
  laptops: [],
  selectedLaptop: null,
  loading: false,
  error: null,
};

const laptopSlice = createSlice({
  name: 'laptops',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLaptops: (state, action) => {
      state.laptops = action.payload;
    },
    setSelectedLaptop: (state, action) => {
      state.selectedLaptop = action.payload;
    },
    addLaptop: (state, action) => {
      state.laptops.push(action.payload);
    },
    updateLaptop: (state, action) => {
      const index = state.laptops.findIndex(laptop => laptop._id === action.payload._id);
      if (index !== -1) {
        state.laptops[index] = action.payload;
      }
    },
    deleteLaptop: (state, action) => {
      state.laptops = state.laptops.filter(laptop => laptop._id !== action.payload);
    },
  },
});

export const {
  setLoading,
  setError,
  setLaptops,
  setSelectedLaptop,
  addLaptop,
  updateLaptop,
  deleteLaptop,
} = laptopSlice.actions;

// Async actions
export const fetchLaptops = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await laptopService.getAllLaptops();
    dispatch(setLaptops(response.data.data.laptops));
    //console.log(response.data.data.laptops); // Log the laptop
    dispatch(setError(null));
    return response.data.data.laptops;
  } catch (error) {
    dispatch(setError(error.response?.data?.message || 'Failed to fetch laptops'));
    return [];
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchLaptopById = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await laptopService.getLaptopById(id);
    dispatch(setSelectedLaptop(response.data));
    dispatch(setError(null));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || 'Failed to fetch laptop'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const createNewLaptop = (laptopData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await laptopService.createLaptop(laptopData);
    dispatch(addLaptop(response.data));
    dispatch(setError(null));
    return response.data;
  } catch (error) {
    dispatch(setError(error.response?.data?.message || 'Failed to create laptop'));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateExistingLaptop = (id, laptopData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await laptopService.updateLaptop(id, laptopData);
    dispatch(updateLaptop(response.data));
    dispatch(setError(null));
    return response.data;
  } catch (error) {
    dispatch(setError(error.response?.data?.message || 'Failed to update laptop'));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const removeExistingLaptop = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await laptopService.deleteLaptop(id);
    dispatch(deleteLaptop(id));
    dispatch(setError(null));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || 'Failed to delete laptop'));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export default laptopSlice.reducer;