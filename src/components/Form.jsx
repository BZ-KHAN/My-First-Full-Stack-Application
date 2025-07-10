import React, { useState, useRef, useEffect, version } from "react";
import "./form.css";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { BsTrash } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { VscCallOutgoing } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addContact, deleteContact } from "../redux/contactReducer";
import localAvatar from "../assets/avatar.png";

function Form() {
  const dispatch = useDispatch();
  const { persistedReducer } = useSelector((state) => state);

  const fileInputRef = useRef(null); // for resetting file input
  const [selectedFileName, setSelectedFileName] = useState(""); // show file name

  // console.log(contactReducer);

  let {
    handleBlur,
    handleReset,
    handleChange,
    handleSubmit,
    values,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      contact: "",
      address: "",
      city: "",
      avatar: "",
    },
    validationSchema: yup.object({
      fullName: yup
        .string()
        .matches(
          /^[a-zA-Z\s]+$/,
          "fullname must only contain alphabetic characters"
        )
        .min(3, "Please provide atleast 3 characters")
        .max(30, "Please provide 30 characters at max")
        .required("fullname is required"),
      email: yup
        .string()
        .matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          "Invalid email address"
        )
        .required("email is required"),
      contact: yup
        .string()
        .matches(
          /^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/gm,
          "Contact must be a valid number (+92 xxxxxxxxxx)"
        )
        .required("contact is required"),
      address: yup
        .string()
        .matches(
          /^[a-zA-Z0-9\s,.'-]{3,}$/,
          "Address must contain only letters, numbers, spaces, and common punctuation"
        )
        .required("address is required"),
      city: yup
        .string()
        .matches(
          /^[a-zA-Z\s'-]{2,}$/,
          "City name must only contain letters, spaces, hyphens, or apostrophes"
        )
        .required("city is required"),
      avatar: yup
        .string()
        .required("Image is required")
        .test("is-valid-image", "Invalid image format", function (value) {
          if (!value) return false;
          return value.startsWith("data:image/");
        })
        .test("file-size", "Image must be less than 1MB", function (value) {
          if (!value) return false;

          // Calculate Base64 string size
          const stringLength = value.length - "data:image/png;base64,".length;
          const sizeInBytes =
            4 * Math.ceil(stringLength / 3) * 0.5624896334383812;
          return sizeInBytes <= 1 * 1024 * 1024; // 1MB
        }),
    }),
    onSubmit: (vals) => {
      // const existingData =
      //   JSON.parse(localStorage.getItem("ContactInfo")) || [];

      const idFormData = {
        ...vals,
        id: Date.now(),
      };

      dispatch(addContact(idFormData));

      // const updatedData = [...existingData, idFormData];

      // localStorage.setItem("ContactInfo", JSON.stringify(updatedData));

      // setSubmitted((prev) => !prev);
      handleReset();

      setImgPreview(undefined);
      setSelectedFileName("");
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }

      notifySaved();
      if (refInput.current) {
        refInput.current.focus();
      }
    },
  });
  // const [formData, setFormData] = useState({
  //   fullName: "",
  //   email: "",
  //   contact: "",
  //   address: "",
  //   city: "",
  // });

  // const [submitted, setSubmitted] = useState(false);
  // const [con, setCon] = useState([]);
  const refInput = useRef(null);
  // const refForm = useRef(null);

  useEffect(() => {
    const flagRetrieve = JSON.parse(localStorage.getItem("updation"));
    if (flagRetrieve) {
      notifyUpdate();
      setTimeout(() => {
        localStorage.removeItem("updation");
      }, 200);
    }
    // const savedData = JSON.parse(localStorage.getItem("ContactInfo"));
    // if (savedData) {
    //   setCon(savedData);
    // }

    if (refInput.current) {
      refInput.current.focus();
    }
  }, []);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  // prevData is the current state of formData before it is updated.
  // React provides prevData as a parameter when updating state with a function.
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  const notifySaved = () => toast.success("Contact has been saved");
  const notifyUpdate = () => toast.success("Contact has been updated");

  // const handleSubmitOld = (e) => {
  //   e.preventDefault();

  //   const existingData = JSON.parse(localStorage.getItem("ContactInfo")) || [];

  //   const idFormData = {
  //     ...formData,
  //     id: Date.now(),
  //   };

  //   const updatedData = [...existingData, idFormData];

  //   localStorage.setItem("ContactInfo", JSON.stringify(updatedData));

  //   setSubmitted((prev) => !prev);
  //   console.log(formData);
  //   setFormData({
  //     fullName: "",
  //     email: "",
  //     contact: "",
  //     address: "",
  //     city: "",
  //   });

  //   if (refForm.current) {
  //     refForm.current.reset();
  //   }

  //   notifySaved();
  // };

  const notifyDelete = () => toast.warn("Contact has been deleted");

  // const submittedRef = useRef(false);

  const handleDelete = (id) => {
    // console.log(id);

    dispatch(deleteContact(id));

    // const dataGet = JSON.parse(localStorage.getItem("ContactInfo")) || [];

    // const filteredArr = dataGet.filter((data) => data.id != id);

    // console.log(filteredArr);

    // localStorage.setItem("ContactInfo", JSON.stringify(filteredArr));

    // setSubmitted((prev) => !prev);

    notifyDelete();
  };

  const [imgPreview, setImgPreview] = useState(undefined);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      // console.log(event);

      reader.onload = (e) => {
        if (reader.readyState == 2) {
          setImgPreview(reader.result);
          setFieldValue("avatar", reader.result);
          setSelectedFileName(file.name); // show file name
        }
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName">FullName</label>
          <input
            ref={refInput}
            type="text"
            id="fullName"
            name="fullName"
            value={values.fullName}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <p>
            <small className="error-message">
              {touched.fullName && errors.fullName ? errors.fullName : null}
            </small>
          </p>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={values.email}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <p>
            <small className="error-message">
              {touched.email && errors.email ? errors.email : null}
            </small>
          </p>
        </div>
        <div>
          <label htmlFor="contact">Contact</label>
          <input
            type="text"
            id="contact"
            name="contact"
            value={values.contact}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <p>
            <small className="error-message">
              {touched.contact && errors.contact ? errors.contact : null}
            </small>
          </p>
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={values.address}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <p>
            <small className="error-message">
              {touched.address && errors.address ? errors.address : null}
            </small>
          </p>
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={values.city}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <p>
            <small className="error-message">
              {touched.city && errors.city ? errors.city : null}
            </small>
          </p>
        </div>
        <div>
          <label>Image</label>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              style={{ display: "none" }} // hide actual input
            />
            <label
              htmlFor="avatar"
              style={{
                padding: "8px 12px",
                backgroundColor: "green",
                color: "white",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Upload Image
            </label>

            <span style={{ fontSize: "0.9rem", color: "#333" }}>
              {selectedFileName ? selectedFileName : "No file selected"}
            </span>
            <img
              src={imgPreview ? imgPreview : localAvatar}
              alt="Avatar"
              style={{
                width: "60px",
                height: "60px",
                objectFit: "cover",
                borderRadius: "50%",
                border: "1px solid #ccc",
              }}
            />
          </div>
          <p style={{ margin: 0 }}>
            <small className="error-message">
              {touched.avatar && errors.avatar ? errors.avatar : null}
            </small>
          </p>
        </div>

        <div>
          <button type="submit">Add Contact</button>
        </div>
      </form>

      <table
        border="1"
        style={{ width: "100%", textAlign: "left", marginTop: "8px" }}
      >
        <thead>
          <tr>
            <th>Sr No.</th>
            <th>Avatar</th>
            <th>FullName</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Address</th>
            <th>City</th>
            <th>id</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {persistedReducer.contactReducer.contacts.map((val, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>
                  <img
                    src={val.avatar ? val.avatar : localAvatar}
                    alt="Avatar"
                    style={{
                      width: "40px",
                      height: "40px",
                      objectFit: "cover",
                      borderRadius: "50%",
                      border: "1px solid #ccc",
                    }}
                  />
                </td>
                <td>{val.fullName}</td>
                <td>{val.email}</td>
                <td>{val.contact}</td>
                <td>{val.address}</td>
                <td>{val.city}</td>
                <td>{val.id}</td>
                <td style={{ display: "flex", justifyContent: "center" }}>
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    style={{
                      backgroundColor: "red",
                      marginBottom: "12px",
                    }}
                    onClick={() => handleDelete(val.id)}
                  >
                    <BsTrash
                      style={{
                        color: "white",
                        fontSize: "14px",
                        padding: "0 1px",
                      }}
                    />
                  </button>
                  <Link
                    onMouseDown={(e) => e.preventDefault()}
                    style={{
                      backgroundColor: "gold",
                      marginLeft: "12px",
                      marginBottom: "12px",
                      marginTop: "12px",
                      borderRadius: "4px",
                    }}
                    to={`/edit/${val.id}`}
                  >
                    <FaRegEdit
                      style={{
                        color: "black",
                        fontSize: "18px",
                        padding: "8px 10px",
                      }}
                    />
                  </Link>
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    style={{
                      backgroundColor: "green",
                      marginLeft: "12px",
                      marginBottom: "12px",
                    }}
                  >
                    <VscCallOutgoing
                      style={{
                        color: "lightcyan",
                        fontSize: "14px",
                      }}
                    />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default Form;
