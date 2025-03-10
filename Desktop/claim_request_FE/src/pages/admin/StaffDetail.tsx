import { useState } from "react";
import { Modal, Form, Input, Row, Col, Button, Spin } from "antd";
import styles from "./StaffDetail.module.css";

interface StaffDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  staff: any;
  loading: boolean;
}

const StaffDetails = ({ isOpen, onClose, staff, loading }: StaffDetailsProps) => {
  const [form] = Form.useForm();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const values = form.getFieldsValue();
      console.log("Saving data:", values);
      // Push sau
      setTimeout(() => {
        setIsSaving(false);
        onClose();
      }, 1000); 
    } catch (error) {
      console.error("Error saving staff details:", error);
    }
  };

  return (
    <Modal
      title="Staff Details"
      open={isOpen}
      onCancel={onClose}
      footer={null}
      className={styles.modal}
    >
      {loading ? (
        <Spin size="large" />
      ) : (
        staff && (
          <Form form={form} layout="vertical" initialValues={staff}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="User ID" name="user_id">
                  <Input disabled />
                </Form.Item>
                <Form.Item label="Username" name="username">
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
                <Form.Item label="Full Name" name="full_name">
                  <Input disabled />
                </Form.Item>
                <Form.Item label="Job Rank" name="job_rank">
                  <Input disabled />
                </Form.Item>
                <Form.Item label="Salary" name="salary">
                  <Input disabled />
                </Form.Item>
                <Form.Item label="User Status" name="user_status">
                  <Input disabled />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="Role Name" name="role_name">
              <Input value={staff.user_status === 1 ? "Active" : "Inactive"} disabled />
            </Form.Item>

            <div className={styles.buttonContainer}>
              <Button type="primary" loading={isSaving} onClick={handleSave}>
                Save
              </Button>
              <Button onClick={onClose} className={styles.cancelButton}>
                Cancel
              </Button>
            </div>
          </Form>
        )
      )}
    </Modal>
  );
};

export default StaffDetails;
