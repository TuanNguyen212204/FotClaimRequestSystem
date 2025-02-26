import React, { useState } from "react"; 
import styles from "@components/ui/user/UserInfoComponent.module.css";
import Notification from "@components/common/Notification/Notification"; 

type Experience = {
  title: string;
  company: string;
  description: string;
};

type User = {
  avatar?: string;
  bio?: string;
  projects?: string[];
  experiences?: Experience[];
};

export const UserInfoComponent: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [staffInfo, setStaffInfo] = useState<User>({
    avatar: "https://static-cse.canva.com/blob/1806764/1600w-_q--r1GW6_E.jpg",
    bio: "I'm Abigail Scott, a passionate UI developer...",
    projects: ["Blog", "Chat", "Email", "Empty", "FAQs", "File Manager", "Invoice"],
    experiences: [
      {
        title: "Web Developer",
        company: "FPT Software",
        description: "As a Web Developer, you will design, build...",
      },
    ],
  });
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'warning' | 'info' } | null>(null);

  console.log("Notification state:", notification); // Debug: Kiểm tra giá trị notification

  const showNotification = (message: string, type: 'success' | 'error' | 'warning' | 'info') => {
    console.log("Showing notification due to:", {
      message,
      type,
      stack: new Error().stack, // Xác định nơi gọi hàm
      staffInfo: staffInfo, // Kiểm tra state hiện tại
    });
    setNotification({ message, type });
  };

  const handleSave = () => {
    setIsEditing(false);
    showNotification("Profile saved successfully!", "success");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setStaffInfo({ ...staffInfo, avatar: event.target.result as string });
          showNotification("Avatar updated successfully!", "success");
        }
      };
      reader.readAsDataURL(file);
    } else {
      showNotification("Failed to upload image. Please try again.", "error");
    }
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <div className={styles.avatarSection}>
          <img
            src={staffInfo.avatar || "https://static-cse.canva.com/blob/1806764/1600w-_q--r1GW6_E.jpg"}
            alt="Avatar"
            className={styles.profileAvatar}
          />
          <button onClick={() => { setIsEditing(true); console.log("Editing mode activated:", true); }} className={styles.editButton}>
            ✏️
          </button>
        </div>

        <div className={styles.profileInfo}>
          <h1>Tuan Nguyen</h1>
          <p className={styles.position}>Chief Executive Officer (C.E.O)</p>
          <p className={styles.company}>© FPT Software.</p>

          <div className={styles.statsContainer}>
            <div className={styles.statItem}>
              <h3>113</h3>
              <span>Projects</span>
            </div>
            <div className={styles.statItem}>
              <h3>23.86%</h3>
              <span>Success Rate</span>
            </div>
            <div className={styles.statItem}>
              <h3>512.6K</h3>
              <span>Earning</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.profileContent}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Personal Bio</h2>
          {isEditing ? (
            <textarea
              className={styles.inputField}
              value={staffInfo.bio}
              onChange={(e) => setStaffInfo({ ...staffInfo, bio: e.target.value })}
            />
          ) : (
            <p className={styles.bioText}>{staffInfo.bio}</p>
          )}
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Projects</h2>
          <div className={styles.projectsGrid}>
            {staffInfo.projects?.map((project) => (
              <div key={project} className={styles.projectCard}>
                {project}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Experience</h2>
          {staffInfo.experiences?.map((exp, index) => (
            <div key={index} className={styles.experienceItem}>
              <h3>{exp.title}</h3>
              <p className={styles.companyName}>{exp.company}</p>
              <p className={styles.experienceDesc}>{exp.description}</p>
            </div>
          ))}
        </div>
      </div>

      {isEditing && (
        <div className={styles.editModal}>
          <div className={styles.modalContent}>
            <h2>Edit Profile</h2>
            
            {/* Phần Avatar */}
            <div className={styles.avatarUploadSection}>
              <img
                src={staffInfo.avatar}
                alt="Avatar Preview"
                className={styles.avatarPreview}
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                id="avatarUpload"
                className={styles.hiddenInput}
              />
              <label htmlFor="avatarUpload" className={styles.uploadButton}>
                Change Avatar
              </label>
            </div>

            {/* Phần Bio */}
            <div className={styles.formSection}>
              <label>Bio</label>
              <textarea
                value={staffInfo.bio}
                onChange={(e) => setStaffInfo({ ...staffInfo, bio: e.target.value })}
              />
            </div>

            {/* Phần Projects */}
            <div className={styles.formSection}>
              <label>Projects</label>
              {staffInfo.projects?.map((project, index) => (
                <div key={index} className={styles.arrayItem}>
                  <input
                    value={project}
                    onChange={(e) => {
                      const newProjects = [...staffInfo.projects!];
                      newProjects[index] = e.target.value;
                      setStaffInfo({ ...staffInfo, projects: newProjects });
                    }}
                  />
                  <button
                    onClick={() => {
                      const newProjects = staffInfo.projects?.filter((_, i) => i !== index);
                      setStaffInfo({ ...staffInfo, projects: newProjects });
                    }}
                    className={styles.removeButton}
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                onClick={() => 
                  setStaffInfo({ 
                    ...staffInfo, 
                    projects: [...(staffInfo.projects || []), ""] 
                  })
                }
                className={styles.addButton}
              >
                Add Project
              </button>
            </div>

            {/* Phần Experience */}
            <div className={styles.formSection}>
              <label>Experiences</label>
              {staffInfo.experiences?.map((exp, index) => (
                <div key={index} className={styles.arrayItem}>
                  <input
                    placeholder="Title"
                    value={exp.title}
                    onChange={(e) => {
                      const newExperiences = [...staffInfo.experiences!];
                      newExperiences[index].title = e.target.value;
                      setStaffInfo({ ...staffInfo, experiences: newExperiences });
                    }}
                  />
                  <input
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e) => {
                      const newExperiences = [...staffInfo.experiences!];
                      newExperiences[index].company = e.target.value;
                      setStaffInfo({ ...staffInfo, experiences: newExperiences });
                    }}
                  />
                  <textarea
                    placeholder="Description"
                    value={exp.description}
                    onChange={(e) => {
                      const newExperiences = [...staffInfo.experiences!];
                      newExperiences[index].description = e.target.value;
                      setStaffInfo({ ...staffInfo, experiences: newExperiences });
                    }}
                  />
                  <button
                    onClick={() => {
                      const newExperiences = staffInfo.experiences?.filter((_, i) => i !== index);
                      setStaffInfo({ ...staffInfo, experiences: newExperiences });
                    }}
                    className={styles.removeButton}
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                onClick={() => 
                  setStaffInfo({
                    ...staffInfo,
                    experiences: [
                      ...(staffInfo.experiences || []), 
                      { title: "", company: "", description: "" }
                    ]
                  })
                }
                className={styles.addButton}
              >
                Add Experience
              </button>
            </div>

            {/* Nút điều khiển */}
            <div className={styles.buttonGroup}>
              <button className={styles.saveButton} onClick={handleSave}>
                Save
              </button>
              <button className={styles.cancelButton} onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hiển thị Notification */}
      <Notification
        message={notification?.message || ""}
        type={notification?.type || "info"}
        duration={10000}
        onClose={() => setNotification(null)}
      />
    </div>
  );
};