import React, { useState, useEffect } from "react";
import styles from "@components/ui/user/UserInfoComponent.module.css";
import Notification from "@components/ui/Notification/Notification";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@redux/index";
import { fetchUserByIdAsync, updateUserAsync } from "@redux/thunk/UserInfo/userInfoThunks";
import { User, Experience } from "@types/User.type.ts";
import Badge from "@/components/ui/Badge/Badge";
import { useNotification } from "@/components/ui/Notification/NotificationContext";

export const UserInfoComponent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedUser = useSelector((state: any) => state.user.selectedUser); 
  const [isEditing, setIsEditing] = useState(false);
  const [staffInfo, setStaffInfo] = useState<User | null>(selectedUser || null);
  const notification = useNotification()

  useEffect(() => {
    dispatch(fetchUserByIdAsync("1")); 
  }, [dispatch]);

  useEffect(() => {
    if (!isEditing) {
      setStaffInfo(selectedUser);
    }
  }, [selectedUser, isEditing]);

  const handleSave = () => {
    if (staffInfo && staffInfo.userID) { 
      dispatch(updateUserAsync({ userId: staffInfo.userID, userData: staffInfo }))
        .unwrap() 
        .then((updatedUser: User) => {
          setIsEditing(false);
          setStaffInfo(updatedUser);
          notification.show({ message: "Profile saved successfully!", type: "success" });
        })
        .catch((error: any) => {
          notification.show({ message: "Failed to save profile: " + error.message, type: "error" })
        });
    } else {
     notification.show({ message: "User ID not found. Cannot save profile.", type: "error" });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && staffInfo) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setStaffInfo({ ...staffInfo, avatar: event.target.result as string });
          notification.show({ message:"Avatar updated successfully!", type: "success"})
        }
      };
      reader.readAsDataURL(file);
    } else {
      notification.show({message:"Failed to upload image. Please try again.", type: "error"})
    }
  };

  if (!staffInfo) {
    return <div>Loading...</div>; 
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <div className={styles.avatarSection}>
          <img
            src={staffInfo.avatar || "https://i.pinimg.com/736x/63/f0/0d/63f00d6ebe2c93b945be3c39135503c2.jpg"}
            alt="Avatar"
            className={styles.profileAvatar}
          />
          <button
            onClick={() => {
              setIsEditing(true);
              console.log("Editing mode activated:", true);
            }}
            className={styles.editButton}
          >
            ✏️
          </button>
        </div>

        <div className={styles.profileInfo}>
          <h1>{staffInfo.fullName || "Tuan Nguyen"}</h1>
          <p className={styles.position}>{staffInfo.jobRank || "Chief Executive Officer (C.E.O)"}</p>
          <p className={styles.company}>© {staffInfo.department || "FPT Software"}.</p>

          <div className={styles.statsContainer}>
            <div className={styles.statItem}>
              <Badge count={staffInfo.projects?.length || 113} color="blue" />
              {/* <h3>{staffInfo.projects?.length || 113}</h3> */}
              <span>Projects</span>
            </div>
            <div className={styles.statItem}>
              <Badge count={24} color="green" />
              {/* <h3>23.86%</h3> */}
              <span>Success Rate</span>
            </div>
            <div className={styles.statItem}>
              <Badge count={513} color="purple" />
              {/* <h3>{staffInfo.salary || 512.6}K</h3> */}
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
              value={staffInfo.bio || ""}
              onChange={(e) => setStaffInfo({ ...staffInfo, bio: e.target.value })}
            />
          ) : (
            <p className={styles.bioText}>{staffInfo.bio || "No bio available"}</p>
          )}
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Projects</h2>
          <div className={styles.projectsGrid}>
            {staffInfo.projects?.map((project) => (
              <div key={project} className={styles.projectCard}>
                {project}
              </div>
            )) || <p>No projects available</p>}
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Experience</h2>
          {isEditing ? (
            staffInfo.experiences?.map((exp, index) => (
              <div key={index} className={styles.arrayItem}>
                <input
                  placeholder="Title"
                  value={exp.title}
                  onChange={(e) => {
                    const newExperiences = [...(staffInfo.experiences || [])];
                    newExperiences[index] = { ...newExperiences[index], title: e.target.value };
                    setStaffInfo({ ...staffInfo, experiences: newExperiences });
                  }}
                />
                <input
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => {
                    const newExperiences = [...(staffInfo.experiences || [])];
                    newExperiences[index] = { ...newExperiences[index], company: e.target.value };
                    setStaffInfo({ ...staffInfo, experiences: newExperiences });
                  }}
                />
                <textarea
                  placeholder="Description"
                  value={exp.description}
                  onChange={(e) => {
                    const newExperiences = [...(staffInfo.experiences || [])];
                    newExperiences[index] = { ...newExperiences[index], description: e.target.value };
                    setStaffInfo({ ...staffInfo, experiences: newExperiences });
                  }}
                />
              </div>
            )) || <p>No experiences available</p>
          ) : (
            staffInfo.experiences?.map((exp, index) => (
              <div key={index} className={styles.experienceItem}>
                <h3>{exp.title}</h3>
                <p className={styles.companyName}>{exp.company}</p>
                <p className={styles.experienceDesc}>{exp.description}</p>
              </div>
            )) || <p>No experiences available</p>
          )}
        </div>
      </div>

      {isEditing && (
        <div className={styles.editModal}>
          <div className={styles.modalContent}>
            <h2>Edit Profile</h2>
            
            {/* Phần Avatar */}
            <div className={styles.avatarUploadSection}>
              <img
                src={staffInfo.avatar || "https://static-cse.canva.com/blob/1806764/1600w-_q--r1GW6_E.jpg"}
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
                value={staffInfo.bio || ""}
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
                      const newProjects = [...(staffInfo.projects || [])];
                      newProjects[index] = e.target.value;
                      setStaffInfo({ ...staffInfo, projects: newProjects });
                    }}
                  />
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
                      const newExperiences = [...(staffInfo.experiences || [])];
                      newExperiences[index] = { ...newExperiences[index], title: e.target.value };
                      setStaffInfo({ ...staffInfo, experiences: newExperiences });
                    }}
                  />
                  <input
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e) => {
                      const newExperiences = [...(staffInfo.experiences || [])];
                      newExperiences[index] = { ...newExperiences[index], company: e.target.value };
                      setStaffInfo({ ...staffInfo, experiences: newExperiences });
                    }}
                  />
                  <textarea
                    placeholder="Description"
                    value={exp.description}
                    onChange={(e) => {
                      const newExperiences = [...(staffInfo.experiences || [])];
                      newExperiences[index] = { ...newExperiences[index], description: e.target.value };
                      setStaffInfo({ ...staffInfo, experiences: newExperiences });
                    }}
                  />
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
    </div>
  );
};