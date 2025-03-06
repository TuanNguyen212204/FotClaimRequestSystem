import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Claim {
  claimId: string;
  projectName: string;
  duration: string;
  staffName: string;
  projectId: string;
}

interface ClaimsState {
  claims: Claim[];
}

const initialState: ClaimsState = {
  claims: [
    {
      claimId: '001',
      projectName: 'A Night To Remember',
      duration: 'From: 1/1/2025 To: 1/15/2025',
      staffName: 'Ben',
      projectId: 'P001',
    },
    {
      claimId: '002',
      projectName: 'Dreamer',
      duration: 'From: 1/1/2025 To: 1/15/2025',
      staffName: 'Tyler',
      projectId: 'P002',
    },
    {
      claimId: '003',
      projectName: 'Sunshine Project',
      duration: 'From: 2/1/2025 To: 2/28/2025',
      staffName: 'Emma',
      projectId: 'P003',
    },
    {
      claimId: '004',
      projectName: 'Digital Transform',
      duration: 'From: 3/1/2025 To: 3/15/2025',
      staffName: 'Michael',
      projectId: 'P004',
    },
    {
      claimId: '005',
      projectName: 'Cloud Migration',
      duration: 'From: 4/1/2025 To: 4/30/2025',
      staffName: 'Sophie',
      projectId: 'P005',
    },
  ],
};

const claimsSlice = createSlice({
  name: 'claims',
  initialState,
  reducers: {
    // Add any reducers if needed
  },
});

export const selectClaims = (state: { claims: ClaimsState }) => state.claims.claims;
export default claimsSlice.reducer;
