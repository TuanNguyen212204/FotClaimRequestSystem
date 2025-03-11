import { Modal, Form, Input, Row, Col, Button, Spin, message } from "antd";
import { useEffect, useState } from "react";
import styles from "./StaffInformation.module.css";

interface Staff {
  user_id: string;
  full_name: string;
  email: string;
  department: string;
  job_rank: string;
  salary?: string;
  user_status?: number;
  role_name?: string;
}

interface StaffDetailProps {
  isOpen: boolean;
  onClose: () => void;
  staff: Staff | null;
  loading: boolean;
}

const StaffDetail = ({ isOpen, onClose, staff, loading }: StaffDetailProps) => {
  const [form] = Form.useForm();
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchStaffData();
  }, []);
  
  const fetchStaffData = async () => {
    try {
      const response = await fetch("/api/staff");
      const data = await response.json();
      console.log("Fetched Data:", data);
    } catch (error) {
      console.error("Error fetching staff data:", error);
    }
  };
  

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const values = form.getFieldsValue();
      console.log("Saving data:", values);
      setTimeout(() => {
        setIsSaving(false);
        message.success("Staff details saved successfully!");
        onClose();
      }, 1000);
    } catch (error) {
      console.error("Error saving staff details:", error);
      message.error("Error saving staff details.");
    }
  };

  return (
    <Modal title="Staff Details" open={isOpen} onCancel={onClose} footer={null}>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="User ID" name="user_id">
                <Input disabled />
              </Form.Item>
              <Form.Item label="Full Name" name="full_name">
                <Input disabled />
              </Form.Item>
              <Form.Item label="Email" name="email">
                <Input disabled />
              </Form.Item>
              <Form.Item label="Department" name="department">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Job Rank" name="job_rank">
                <Input disabled />
              </Form.Item>
              <Form.Item label="Salary" name="salary">
                <Input disabled />
              </Form.Item>
              <Form.Item label="User Status" name="user_status">
                <Input value={staff?.user_status === 1 ? "Active" : "Inactive"} disabled />
              </Form.Item>
              <Form.Item label="Role Name" name="role_name">
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>
          <div className={styles.buttonContainer}>
            <Button type="primary" loading={isSaving} onClick={handleSave}>
              Save
            </Button>
            <Button onClick={onClose} className={styles.cancelButton}>
              Cancel
            </Button>
          </div>
        </Form>
      )}
    </Modal>
  );
};

export default StaffDetail;
