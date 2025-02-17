import styles from "./UserSetting.module.css";
import { FilePen, Trash2 } from "lucide-react";

const UserSettings = () => {
  return (
    <div>
      <div>
        <div className={styles.container}>
          <div>
            <h1>User Settings</h1>
            <hr />
          </div>
          <div
            style={{
              overflow: "hidden",
              marginTop: "20px",
              boxShadow:
                "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
            }}
          >
            <table className={styles.table}>
              <tr>
                <th className={styles.style_th}>ID</th>
                <th className={styles.style_th}>Email</th>
                <th className={styles.style_th}>Username</th>
                <th className={styles.style_th}>Role</th>
                <th className={styles.style_th}>Status</th>
                <th className={styles.style_th}>Action</th>
              </tr>
              <tr>
                <td className={styles.style_td}>01</td>
                <td className={styles.style_td}>nguyenvana@gmail.com</td>
                <td className={styles.style_td}>nguyenvana</td>
                <td className={styles.style_td}>dev</td>
                <td className={styles.style_td}>Online/Offline</td>
                <td className={styles.style_td}>
                  <FilePen /> <Trash2 />
                </td>
              </tr>
              <tr>
                <td className={styles.style_td}>01</td>
                <td className={styles.style_td}>nguyenvana@gmail.com</td>
                <td className={styles.style_td}>nguyenvana</td>
                <td className={styles.style_td}>dev</td>
                <td className={styles.style_td}>Online/Offline</td>
                <td className={styles.style_td}>
                  <FilePen /> <Trash2 />
                </td>
              </tr>
              <tr>
                <td className={styles.style_td}>01</td>
                <td className={styles.style_td}>nguyenvana@gmail.com</td>
                <td className={styles.style_td}>nguyenvana</td>
                <td className={styles.style_td}>dev</td>
                <td className={styles.style_td}>Online/Offline</td>
                <td className={styles.style_td}>
                  <FilePen />
                  <Trash2 />
                </td>
              </tr>
              <tr>
                <td className={styles.style_td}>01</td>
                <td className={styles.style_td}>nguyenvana@gmail.com</td>
                <td className={styles.style_td}>nguyenvana</td>
                <td className={styles.style_td}>dev</td>
                <td className={styles.style_td}>Online/Offline</td>
                <td className={styles.style_td}>
                  {" "}
                  <FilePen />
                  <Trash2 />
                </td>
              </tr>
              <tr>
                <td className={styles.style_td}>01</td>
                <td className={styles.style_td}>nguyenvana@gmail.com</td>
                <td className={styles.style_td}>nguyenvana</td>
                <td className={styles.style_td}>dev</td>
                <td className={styles.style_td}>Online/Offline</td>
                <td className={styles.style_td}>
                  {" "}
                  <FilePen />
                  <Trash2 />
                </td>
              </tr>
              <tr>
                <td className={styles.style_td}>01</td>
                <td className={styles.style_td}>nguyenvana@gmail.com</td>
                <td className={styles.style_td}>nguyenvana</td>
                <td className={styles.style_td}>dev</td>
                <td className={styles.style_td}>Online/Offline</td>
                <td className={styles.style_td}>
                  {" "}
                  <FilePen />
                  <Trash2 />
                </td>
              </tr>
              <tr>
                <td className={styles.style_td}>01</td>
                <td className={styles.style_td}>nguyenvana@gmail.com</td>
                <td className={styles.style_td}>nguyenvana</td>
                <td className={styles.style_td}>dev</td>
                <td className={styles.style_td}>Online/Offline</td>
                <td className={styles.style_td}>
                  {" "}
                  <FilePen />
                  <Trash2 />
                </td>
              </tr>
              <tr>
                <td className={styles.style_td}>01</td>
                <td className={styles.style_td}>nguyenvana@gmail.com</td>
                <td className={styles.style_td}>nguyenvana</td>
                <td className={styles.style_td}>dev</td>
                <td className={styles.style_td}>Online/Offline</td>
                <td className={styles.style_td}>
                  {" "}
                  <FilePen />
                  <Trash2 />
                </td>
              </tr>
            </table>
          </div>
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button className={styles.button2}>Previous</button>
            <button className={styles.button3} style={{ marginLeft: "10px" }}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
