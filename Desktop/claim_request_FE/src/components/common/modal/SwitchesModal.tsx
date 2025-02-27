import  { useState } from "react";
import { Bell } from "lucide-react";
import { Users } from "lucide-react";
import Modal from "@components/common/modal/Modal";
import styles from "@components/common/modal/Modal.module.css";

const SwitchesModal = () => {
  const [open, setOpen] = useState(false);
  const [switches, setSwitches] = useState([
    {
      switchIcon: <Bell />,
      switchTitle: "Account Activity",
      switchText:
        "Get important notifications about you or activity you've missed",
      value: false,
      onChange: (val: boolean) => {},
    },
    {
      switchIcon: <Users />,
      switchTitle: "Meetups Near You",
      switchText:
        "Get important notifications about you or activity you've missed",
      label: "Option B",
      value: true,
      onChange: (val: boolean) => {},
    },
  ]);

  const handleToggle = (index: number, newValue: boolean) => {
    const newSwitches = [...switches];
    newSwitches[index].value = newValue;
    newSwitches[index].onChange(newValue);
    setSwitches(newSwitches);
  };

  return (
    <div>
      <button className={styles.btn} onClick={() => setOpen(true)}>
        Open Switches Modal
      </button>
      <Modal
        open={open}
        title="Notifications"
        switches={switches.map((sw, i) => ({
          ...sw,
          onChange: (val: boolean) => handleToggle(i, val),
        }))}
        onCancel={() => setOpen(false)}
        onOk={() => {
          alert("Switch values: " + JSON.stringify(switches));
          setOpen(false);
        }}
        buttonOk="Update Notifications"
      >
        <p>Get notified of activity at FOT</p>
      </Modal>
    </div>
  );
};

export default SwitchesModal;
