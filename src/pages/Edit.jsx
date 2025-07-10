import React, { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updateContact } from "../redux/contactReducer";

function Edit() {
  const dispatch = useDispatch();
  const { persistedReducer } = useSelector((state) => state);
  let {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
    setValues,
  } = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      contact: "",
      address: "",
      city: "",
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
    }),

    onSubmit: (vals) => {
      dispatch(updateContact({ id: id, value: vals }));

      // const oldArr = JSON.parse(localStorage.getItem("ContactInfo")) || [];

      // if (oldArr) {
      //   let updatedArr = oldArr.map((item) =>
      //     item.id == id ? { ...item, ...vals } : item
      //   );
      //   localStorage.setItem("ContactInfo", JSON.stringify(updatedArr));
      // }

      navigate("/contact");
    },
  });

  const { id } = useParams();
  let navigate = useNavigate();
  const refInput = useRef(null);
  // const refForm = useRef(null);

  // const [formData, setFormData] = useState({
  //   fullName: "",
  //   email: "",
  //   contact: "",
  //   address: "",
  //   city: "",
  // });

  useEffect(() => {
    const setFlag = localStorage.setItem("updation", JSON.stringify(true));

    // const contactArr = JSON.parse(localStorage.getItem("ContactInfo"));
    const singleObj = persistedReducer.contactReducer.contacts.find(
      (c) => c.id == id
    );
    if (singleObj) {
      setValues(singleObj);
    }

    if (refInput.current) {
      refInput.current.focus();
    }
  }, []);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;

  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  // const handleUpdate = (e) => {
  //   e.preventDefault();

  //   const oldArr = JSON.parse(localStorage.getItem("ContactInfo"));
  //   if (oldArr) {
  //     const filteredArr = oldArr.filter((val) => val.id != id);
  //     if (filteredArr) {
  //       let updatedArr = [...filteredArr, formData];
  //       localStorage.setItem("ContactInfo", JSON.stringify(updatedArr));
  //     }
  //   }

  //   if (oldArr) {
  //     let updatedArr = oldArr.map((item) =>
  //       item.id == id ? { ...item, ...formData } : item
  //     );
  //     localStorage.setItem("ContactInfo", JSON.stringify(updatedArr));
  //   }

  //   setFormData({
  //     fullName: "",
  //     email: "",
  //     contact: "",
  //     address: "",
  //     city: "",
  //   });

  //   navigate("/contact");
  // };

  return (
    <>
      <form
        style={{ marginLeft: "8px", marginTop: "20px" }}
        // ref={refForm}
        onSubmit={handleSubmit}
      >
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
            type="text"
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
          <button type="submit">Update Contact</button>
        </div>
      </form>
    </>
  );
}

export default Edit;
