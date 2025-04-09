import { createSlice } from '@reduxjs/toolkit';
import { orderService } from '../../api/services';

const initialState = {
  orders: [],
  selectedOrder: null,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    setSelectedOrder: (state, action) => {
      state.selectedOrder = action.payload;
    },
    addOrder: (state, action) => {
      state.orders.push(action.payload);
    },
    updateOrder: (state, action) => {
      const index = state.orders.findIndex(order => order._id === action.payload._id);
      if (index !== -1) {
        state.orders[index] = action.payload;
      }
    },
  },
});

export const {
  setLoading,
  setError,
  setOrders,
  setSelectedOrder,
  addOrder,
  updateOrder,
} = orderSlice.actions;

// Async actions
export const fetchOrders = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await orderService.getAllOrders();
    dispatch(setOrders(response.data));
    dispatch(setError(null));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || 'Failed to fetch orders'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchOrderById = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await orderService.getOrderById(id);
    dispatch(setSelectedOrder(response.data));
    dispatch(setError(null));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || 'Failed to fetch order'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const createNewOrder = (orderData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await orderService.createOrder(orderData);
    dispatch(addOrder(response.data));
    dispatch(setError(null));
    return response.data;
  } catch (error) {
    dispatch(setError(error.response?.data?.message || 'Failed to create order'));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateOrderStatus = (id, statusData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await orderService.updateOrderStatus(id, statusData);
    dispatch(updateOrder(response.data));
    dispatch(setError(null));
    return response.data;
  } catch (error) {
    dispatch(setError(error.response?.data?.message || 'Failed to update order status'));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const assignOrderToUser = (id, assignData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await orderService.assignOrder(id, assignData);
    dispatch(updateOrder(response.data));
    dispatch(setError(null));
    return response.data;
  } catch (error) {
    dispatch(setError(error.response?.data?.message || 'Failed to assign order'));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export default orderSlice.reducer;