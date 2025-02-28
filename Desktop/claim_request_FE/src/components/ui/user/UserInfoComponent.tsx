import React, { useState } from "react";
import styles from "@components/ui/user/UserInfoComponent.module.css";

import { User } from "@types/User.type";
import RadioGroup from "@components/common/RadioGroup/RadioGroup";

export const UserInfoComponent: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
    const [selectedValue, setSelectedValue] = useState("option1");
  
    const radioOptions = [
      { label: "Male", value: "option1" },
      { label: "Female", value: "option2" },
      { label: "Other", value: "option3", disabled: true},
    ];

  
 

  const [staffInfo, setStaffInfo] = useState<User | null>({
    gender: "Male",
    name: {
      title: "Mr",
      first: "Tuan",
      last: "Nguyen",
    },
    location: {
      street: {
        number: 17,
        name: "Nguyen Thai Hoc",
      },
      city: "Vung Tau",
      state: "",
      country: "",
      postcode: 78200,
      coordinates: {
        latitude: "34.0039",
        longitude: "-118.4324",
      },
      timezone: {
        offset: "-8:00",
        description: "Pacific Time (US & Canada)",
      },
    },
    email: "tuan51463@gmail.com",
    login: {
      uuid: "user1",
      username: "tuan",
      password: "12345",
      salt: "string",
      md5: "string",
      sha1: "string",
      sha256: "string",
    },
    dob: {
      date: "1990-01-01T00:00:00.000",
      age: 21,
    },
    registered: {
      date: "2015-05-15T00:00:00.000Z",
      age: 8,
    },
    phone: "0789357788",
    cell: "string",
    id: {
      name: "SE",
      value: "183262",
    },
    picture: {
      large:
        "https://i.pinimg.com/736x/63/f0/0d/63f00d6ebe2c93b945be3c39135503c2.jpg",
      medium:
        "https://i.pinimg.com/736x/63/f0/0d/63f00d6ebe2c93b945be3c39135503c2.jpg",
      thumbnail:
        "https://i.pinimg.com/736x/63/f0/0d/63f00d6ebe2c93b945be3c39135503c2.jpg",
    },
    nat: "VietNam",
  });
 

  //   const fetchUserInfo = async () => {
  //     try {
  //       const response = await axios.get("");
  //       setUser(response.data);
  //     } catch (error) {
  //       toast.error(
  //         error.response?.data?.message || "Failed to fetch user data!"
  //       );
  //     }
  //   };

  //   useEffect(() => {
  //     fetchUserInfo();
  //   }, []);

  // const staffInfo: User = {
  //   name: "Nguyễn Ngọc Tuấn",
  //   id: "SE123456",
  //   email: "obcxyz@rpt.vn",
  //   department: "Ho Chi Minh City",
  // };

  // const staffInfo: User = {
  //   gender: "Male",
  //   name: {
  //     title: "Mr",
  //     first: "Tuan",
  //     last: "Nguyen",
  //   },
  //   location: {
  //     street: {
  //       number: 17,
  //       name: "Nguyen Thai Hoc",
  //     },
  //     city: "Vung Tau",
  //     state: "",
  //     country: "",
  //     postcode: 78200,
  //     coordinates: {
  //       latitude: "34.0039",
  //       longitude: "-118.4324",
  //     },
  //     timezone: {
  //       offset: "-8:00",
  //       description: "Pacific Time (US & Canada)",
  //     },
  //   },
  //   email: "tuan51463@gmail.com",
  //   login: {
  //     uuid: "user1",
  //     username: "tuan",
  //     password: "12345",
  //     salt: "string",
  //     md5: "string",
  //     sha1: "string",
  //     sha256: "string",
  //   },
  //   dob: {
  //     date: "1990-01-01T00:00:00.000",
  //     age: 21,
  //   },
  //   registered: {
  //     date: "2015-05-15T00:00:00.000Z",
  //     age: 8,
  //   },
  //   phone: "0789357788",
  //   cell: "string",
  //   id: {
  //     name: "SE",
  //     value: "183262",
  //   },
  //   picture: {
  //     large:
  //       "https://i.pinimg.com/736x/a8/ee/99/a8ee991141c6bc4c81e7eadfb4e2b4b5.jpg",
  //     medium:
  //       "https://i.pinimg.com/736x/a8/ee/99/a8ee991141c6bc4c81e7eadfb4e2b4b5.jpg",
  //     thumbnail:
  //       "https://i.pinimg.com/736x/a8/ee/99/a8ee991141c6bc4c81e7eadfb4e2b4b5.jpg",
  //   },
  //   nat: "VietNam",
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedValue(e.target.value);

    setStaffInfo((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        email: name === "email" ? value : prev.email,
        name: {
          ...prev.name,
          first: name === "firstName" ? value : prev.name?.first ?? "",
          last: name === "lastName" ? value : prev.name?.last ?? "",
        },
        location: {
          ...prev.location,
          city: name === "city" ? value : prev.location?.city ?? "",
        },
        gender: prev.gender ?? "", // Đảm bảo gender không bị undefined
      };
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setStaffInfo((prev) => ({
        ...prev!,
        picture: {
          ...prev!.picture,
          large: imageUrl,
          medium: imageUrl,
          thumbnail: imageUrl,
        },
      }));
    }
  };
  const handleSave = async () => {
    // TODO: Sau này khi có API, hãy mở comment phần này
    /*
      try {
        const formData = new FormData();
        formData.append("name", staffInfo.name);
        formData.append("email", staffInfo.email);
        formData.append("department", staffInfo.department);
        formData.append("avatar", file); // Gửi ảnh lên server

        await axios.put("/api/staff/update", formData);
        toast.success("Profile updated successfully!");
      } catch (error) {
        toast.error("Failed to update profile.");
      }
      */
    setIsEditing(false);
  };
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <label htmlFor="avatarUpload">
          <img
            src={
              staffInfo?.picture?.thumbnail ||
              "https://static-cse.canva.com/blob/1806764/1600w-_q--r1GW6_E.jpg"
            }
            alt="Avatar"
            className={styles.avatar}
          />
        </label>
        {isEditing && (
          <input
            type="file"
            id="avatarUpload"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          ></input>
        )}
        {isEditing ? (
          <div className={styles.editContainer}>
            <input
              type="text"
              name="firstName"
              value={staffInfo?.name.first}
              onChange={handleChange}
            />
            <input
              type="text"
              name="lastName"
              value={staffInfo?.name.last}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              value={staffInfo?.email}
              onChange={handleChange}
              placeholder="Enter Email"
            />
            <input
              type="text"
              name="streetName"
              value={staffInfo?.location.street.name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="city"
              value={staffInfo?.location.city}
              onChange={handleChange}
            />
            <RadioGroup
              options={radioOptions}
              name="exampleRadioGroup"
              selectedValue={selectedValue}
              onChange={handleChange}
            />
            <button
              onClick={handleSave}
              className={`${styles.saveBtn} ${styles.userInfoBtn}`}
            >
              💾 Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className={`${styles.cancelBtn} ${styles.userInfoBtn}`}
            >
              ❌ Cancel
            </button>
          </div>
        ) : (
          <>
            <button
              className={`${styles.editBtn} ${styles.userInfoBtn}`}
              onClick={() => setIsEditing(true)}
            >
              ✎ Edit Profile
            </button>
            <div className={styles.info}>
              <div className={styles.row}>
                <p>
                  <span className={styles.icon}>👤</span>
                  <strong>Staff Name:</strong>
                  {`${staffInfo?.name.title} ${staffInfo?.name.first} ${staffInfo?.name.last}`}
                </p>
                <p>
                  <span className={styles.icon}>🆔</span>
                  <strong>Staff ID:</strong>
                  {`${staffInfo?.id.name} ${staffInfo?.id.value}`}
                </p>
              </div>
              <p>
                <span className={styles.icon}>📧</span>
                <strong>Staff Email:</strong> {staffInfo?.email}
              </p>
              <p>
                <span className={styles.icon}>🏢</span>
                <strong>Staff Department:</strong>
                {`${staffInfo?.location.street.number} ${staffInfo?.location.street.name} , ${staffInfo?.location.city}`}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
