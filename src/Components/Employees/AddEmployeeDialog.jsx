import React, { useState, useEffect, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { useAddEmployee } from "../../Hooks/Query/EmployeeQuery";
import { Toast } from "primereact/toast";
import { avatars } from "../../../Utils/HelperData";
import { generateRandomPassword } from "../../../Utils/HelperFunctions";
import { SelectButton } from "primereact/selectbutton";

const AddEmployeeDialog = ({ visible, setVisible }) => {
  const { mutate, isPending, isError, error } = useAddEmployee();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [role, setRole] = useState("Collector");
  const [formvalid, setFormValid] = useState(false);
  const [showAvatarDialog, setShowAvatarDialog] = useState(false);
  const toast = useRef(null);

  useEffect(() => {
    if (name !== "" && email !== "" && password !== "" && avatar !== null) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [name, email, password, avatar]);

  useEffect(() => {
    if (visible) {
      const randomnamegenertor = () => {
        const randomnumber = Math.floor(Math.random() * 10000);
        const randomname = `Employee${randomnumber}`;
        const email =
          randomname.toLowerCase().replace(/\s/g, "") + "@gmail.com";
        return {
          name: randomname,
          email: email,
        };
      };
      const { name: randomname, email: randomemail } = randomnamegenertor();
      setName(randomname);
      setEmail(randomemail);
      setPassword(generateRandomPassword());
      setAvatar(avatars[0]);
    }
  }, [visible]);

  const clearform = () => {
    setName("");
    setEmail("");
    setPassword("");
    setRole("Collector");
    setAvatar(null);
    setVisible(false);
  };

  const handleCreateEmployee = () => {
    if (!formvalid) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Please fill all the fields correctly",
        life: 2000,
      });
      return;
    }
    const formdata = {
      name: name,
      email: email,
      password: password,
      profileImage: avatar,
      role: role,
    };

    mutate(
      { data: formdata },
      {
        onSuccess: (data) => {
          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Employee Added Successfully",
            life: 2000,
          });
          clearform();
        },
        onError: (error) => {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "Something went wrong. Please try again later.",
            life: 2000,
          });
          clearform();
        },
      }
    );
  };

  const footerContent = (
    <div
      style={{
        margin: "10px 10px 20px 10px",
        display: "flex",
        justifyContent: "flex-end",
        gap: "10px",
      }}
    >
      <Button
        label="Cancel"
        disabled={isPending}
        icon="pi pi-times"
        onClick={() => {
          clearform();
          setVisible(false);
        }}
        className="p-button-text"
      />

      <Button
        label="Add"
        disabled={!formvalid}
        loading={isPending}
        icon="pi pi-check"
        onClick={handleCreateEmployee}
        className="p-button-success"
      />
    </div>
  );

  const avatarDialogFooter = (
    <div>
      <Button
        label="Cancel"
        icon="pi pi-times"
        onClick={() => setShowAvatarDialog(false)}
        className="p-button-text"
      />
    </div>
  );

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        header="Add New Employee"
        visible={visible}
        style={{ width: "30rem" }}
        footer={footerContent}
        onHide={() => setVisible(false)}
      >
        <div
          className="p-fluid p-formgrid p-grid"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            padding: "10px",
          }}
        >
          <div className="p-field p-col-12">
            <label htmlFor="name">Name</label>
            <InputText
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Employee Name"
            />
          </div>
          <div className="p-field p-col-12">
            <label htmlFor="email">Email</label>
            <InputText
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Employee Email"
            />
          </div>
          <div className="p-field p-col-12">
            <label htmlFor="role">Role</label>
            <SelectButton
              value={role}
              options={[
                { label: "Analyst", value: "Analyst" },
                { label: "Collector", value: "Collector" },
              ]}
              onChange={(e) => setRole(e.value)}
            />
          </div>
          <div className="p-field p-col-12">
            <label htmlFor="password">Password</label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Password
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                toggleMask
              />
              <Button
                icon="pi pi-refresh"
                className="p-button-text"
                onClick={() => setPassword(generateRandomPassword())}
              />
            </div>

            <span
              style={{
                fontSize: "0.8rem",
                color: "var(--text-color-secondary)",
                marginLeft: "10px",
              }}
            >
              Password will be auto-generated
            </span>
          </div>

          <div className="p-field p-col-12">
            <label htmlFor="avatar">Avatar</label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              {avatar && (
                <img
                  src={avatar}
                  alt="Avatar"
                  style={{ width: "50px", height: "50px", marginRight: "50px" }}
                />
              )}
              <Button
                label="Select Avatar"
                icon="pi pi-image"
                onClick={() => setShowAvatarDialog(true)}
              />
            </div>
          </div>
        </div>
      </Dialog>
      <Dialog
        header="Select Avatar"
        visible={showAvatarDialog}
        style={{ width: "30rem" }}
        footer={avatarDialogFooter}
        onHide={() => setShowAvatarDialog(false)}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "10px",
          }}
        >
          {avatars.map((avatarUrl, index) => (
            <img
              key={index}
              src={avatarUrl}
              alt="Avatar"
              style={{ width: "50px", height: "50px", cursor: "pointer" }}
              onClick={() => {
                setAvatar(avatarUrl);
                setShowAvatarDialog(false);
              }}
            />
          ))}
        </div>
      </Dialog>
    </>
  );
};

export default AddEmployeeDialog;
