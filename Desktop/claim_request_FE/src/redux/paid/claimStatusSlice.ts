import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ClaimStatus {
  claimId: string;
  projectName: string;
  duration: string;
  staffName: string;
  projectId: string;
  date: string; 
  hours: string; 
  paid: string; 
  status: string; 
}

interface ClaimStatusState {
  claimStatuses: ClaimStatus[];
}

const initialState: ClaimStatusState = {
  claimStatuses: [
    {
      claimId: '001',
      projectName: 'A Night To Remember',
      duration: 'From: 1/1/2025 To: 1/15/2025',
      staffName: 'Ben',
      projectId: 'P001',
      date: '1/5/2025',
      hours: '100 hours',
      paid: '250.000.000 VND',
      status: 'Paid',
    },
    {
      claimId: '002',
      projectName: 'Dreamer',
      duration: 'From: 1/1/2025 To: 1/15/2025',
      staffName: 'Tyler',
      projectId: 'P002',
      date: '1/6/2025',
      hours: '100 hours',
      paid: '250.000.000 VND',
      status: 'Paid',
    },
    {
      claimId: '003',
      projectName: 'Sunshine Project',
      duration: 'From: 2/1/2025 To: 2/28/2025',
      staffName: 'Emma',
      projectId: 'P003',
      date: '2/15/2025',
      hours: '160 hours',
      paid: '400.000.000 VND',
      status: 'Paid',
    },
    {
      claimId: '004',
      projectName: 'Digital Transform',
      duration: 'From: 3/1/2025 To: 3/15/2025',
      staffName: 'Michael',
      projectId: 'P004',
      date: '3/7/2025',
      hours: '80 hours',
      paid: '200.000.000 VND',
      status: 'Pending', // Trạng thái chưa thanh toán
    },
    {
      claimId: '005',
      projectName: 'Cloud Migration',
      duration: 'From: 4/1/2025 To: 4/30/2025',
      staffName: 'Sophie',
      projectId: 'P005',
      date: '4/15/2025',
      hours: '200 hours',
      paid: '500.000.000 VND',
      status: 'Pending', // Trạng thái chưa thanh toán
    },
  ],
};

const claimStatusSlice = createSlice({
  name: 'claimStatus',
  initialState,
  reducers: {
    saveClaim: (state, action: PayloadAction<ClaimStatus>) => {
      const index = state.claimStatuses.findIndex(claim => claim.claimId === action.payload.claimId);
      if (index !== -1) {
        state.claimStatuses[index] = action.payload; // Update existing claim
      } else {
        state.claimStatuses.push(action.payload); // Add new claim
      }

    },
  },
});

// Selector để lấy claim statuses
export const selectClaimStatuses = (state: { claimStatus: ClaimStatusState }) => state.claimStatus.claimStatuses;
export const { saveClaim } = claimStatusSlice.actions;
export default claimStatusSlice.reducer;
