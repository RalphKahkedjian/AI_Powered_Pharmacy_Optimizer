import { useEffect, useState } from "react";
import type { Profile } from "../models/Profile";

export default function ProfileSection() {

  const [profileDetails, setProfileDetails] = useState<Profile>({
    username: "",
    email: "",
    password: "",
    age: ""
  })

  useEffect(()=> {
    setProfileDetails({
      username: localStorage.getItem("USER_USERNAME") || "",
      email: localStorage.getItem("USER_EMAIL") || "",
      age: localStorage.getItem("USER_AGE") || "",
      password: localStorage.getItem("USER_PASSWORD") || "",
    })
  }, [])

  return (
    <div
      style={{
        maxWidth: "100%",
        margin: "40px auto",
        padding: "30px",
        backgroundColor: "#DBD7C9",
        borderRadius: "20px",
        boxShadow: "5px 15px 5px 4px #4C4B43",
        fontFamily: "Montserrat, sans-serif",
      }}
    >
      <h1
        style={{
          textAlign: "start",
          color: "#4C4B43",
          marginBottom: "50px",
          fontSize: "28px",
          letterSpacing: "1px",
        }}
      >
        My Profile
      </h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "22px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label
            style={{
              fontSize: "16px",
              fontWeight: "600",
              color: "#4C4B43",
              marginBottom: "8px",
            }}
          >
            Username
          </label>
          <input
            type="text"
            value={profileDetails.username}
            readOnly
            style={{
              padding: "14px",
              borderRadius: "10px",
              border: "2px solid #4C4B43",
              backgroundColor: "#fff",
              color: "#4C4B43",
              fontSize: "16px",
              outline: "none",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label
            style={{
              fontSize: "16px",
              fontWeight: "600",
              color: "#4C4B43",
              marginBottom: "8px",
            }}
          >
            Email
          </label>
          <input
            type="email"
            value={profileDetails.email}
            readOnly
            style={{
              padding: "14px",
              borderRadius: "10px",
              border: "2px solid #4C4B43",
              backgroundColor: "#fff",
              color: "#4C4B43",
              fontSize: "16px",
              outline: "none",
            }}
          />
        </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
          <label
            style={{
              fontSize: "16px",
              fontWeight: "600",
              color: "#4C4B43",
              marginBottom: "8px",
            }}
          >
            Password
          </label>
          <input
            type="password"
            value={"12345678"}
            readOnly
            style={{
              padding: "14px",
              borderRadius: "10px",
              border: "2px solid #4C4B43",
              backgroundColor: "#fff",
              color: "#4C4B43",
              fontSize: "16px",
              outline: "none",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label
            style={{
              fontSize: "16px",
              fontWeight: "600",
              color: "#4C4B43",
              marginBottom: "8px",
            }}
          >
            Age
          </label>
          <input
            type="text"
            value={profileDetails.age}
            readOnly
            style={{
              padding: "14px",
              borderRadius: "10px",
              border: "2px solid #4C4B43",
              backgroundColor: "#fff",
              color: "#4C4B43",
              fontSize: "16px",
              outline: "none",
            }}
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "start",
          marginTop: "40px",
          gap:"15px"
        }}
      >
        <button
          style={{
            backgroundColor: "#4C4B43",
            color: "#DBD7C9",
            border: "none",
            padding: "14px 30px",
            borderRadius: "12px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "600",
            letterSpacing: "0.5px",
            transition: "0.3s ease",
          }}
          onMouseOver={(e) =>
            ((e.target as HTMLButtonElement).style.backgroundColor = "#3e3d36")
          }
          onMouseOut={(e) =>
            ((e.target as HTMLButtonElement).style.backgroundColor = "#4C4B43")
          }
        >
          Edit Profile
        </button>
        <button
          style={{
            backgroundColor: "#4C4B43",
            color: "#DBD7C9",
            border: "none",
            padding: "14px 30px",
            borderRadius: "12px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "600",
            letterSpacing: "0.5px",
            transition: "0.3s ease",
          }}
          onMouseOver={(e) =>
            ((e.target as HTMLButtonElement).style.backgroundColor = "#3e3d36")
          }
          onMouseOut={(e) =>
            ((e.target as HTMLButtonElement).style.backgroundColor = "#4C4B43")
          }
        >
          Delete Profile
        </button>
      </div>
    </div>
  );
}
