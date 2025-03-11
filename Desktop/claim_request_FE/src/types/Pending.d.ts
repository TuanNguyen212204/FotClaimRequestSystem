export interface claimPending {
    claim_id: string;
    user_id: string;
    project_id: string;
    total_working_hours: number;
    submitted_date: Date;
    claim_status: string;
    project_name: string;
}