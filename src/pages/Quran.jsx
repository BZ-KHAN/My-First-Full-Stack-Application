import React, { useState } from "react";
import "./Quran.css";
import { useGetCompleteQuranQuery } from "../redux/quranApi";
import {
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} from "../redux/postApi";
import { useFormik } from "formik";
import * as yup from "yup";

function Quran() {
  // const [juzNo, setJuzNo] = useState("");
  const [actionType, setActionType] = useState("");
  const [selectedJuz, setSelectedJuz] = useState("");

  const { data, isLoading, isError, isFetching } = useGetCompleteQuranQuery(
    selectedJuz,
    {
      skip: !selectedJuz || selectedJuz < 1 || selectedJuz > 30,
    }
  );

  const [addPost, { data: response, isLoading: postSending }] =
    useAddPostMutation();
  const [updatePost, { data: result, isLoading: postUpdating }] =
    useUpdatePostMutation();
  const [deletePost, { data: deleteResult, isLoading: postDeleting }] =
    useDeletePostMutation();

  // New post data
  // const [newId, setNewId] = useState("");
  // const [newTitle, setNewTitle] = useState("");
  // const [newBody, setNewBody] = useState("");

  // Update post data
  // const [updateId, setUpdateId] = useState("");
  // const [updateTitle, setUpdateTitle] = useState("");
  // const [updateBody, setUpdateBody] = useState("");

  // Delete post data
  // const [delId, setDelId] = useState("");

  let {
    handleBlur,
    handleChange,
    handleReset,
    handleSubmit,
    touched,
    errors,
    values,
    resetForm,
  } = useFormik({
    initialValues: {
      juzNo: "",
      newId: "",
      newTitle: "",
      newBody: "",
      updateId: "",
      updateTitle: "",
      updateBody: "",
      delId: "",
    },
    enableReinitialize: true,
    validationSchema: () => {
      switch (actionType) {
        case "getQuran":
          return yup.object({
            juzNo: yup
              .number()
              .typeError("Juz must be a number")
              .min(1, "Minimum juz number is 1")
              .max(30, "Maximum juz number is 30")
              .required("Juz number is required"),
          });
        case "addNewPost":
          return yup.object({
            newId: yup
              .number()
              .typeError("ID must be a number")
              .min(1, "Minimum ID is 1")
              .max(30, "Maximum ID is 30")
              .required("ID is required"),
            newTitle: yup
              .string()
              .matches(/^[A-Za-z ]+$/, "Only alphabets are allowed")
              .min(4, "Minimum 4 characters")
              .max(30, "Maximum 30 characters")
              .required("Title is required"),
            newBody: yup
              .string()
              .matches(/^[A-Za-z ]+$/, "Only alphabets are allowed")
              .min(4, "Minimum 4 characters")
              .max(60, "Maximum 60 characters")
              .required("Body is required"),
          });
        case "updatePost":
          return yup.object({
            updateId: yup
              .number()
              .typeError("ID must be a number")
              .min(1, "Minimum ID is 1")
              .max(30, "Maximum ID is 30")
              .required("ID is required"),
            updateTitle: yup
              .string()
              .matches(/^[A-Za-z ]+$/, "Only alphabets are allowed")
              .min(4, "Minimum 4 characters")
              .max(30, "Maximum 30 characters")
              .required("Title is required"),
            updateBody: yup
              .string()
              .matches(/^[A-Za-z ]+$/, "Only alphabets are allowed")
              .min(4, "Minimum 4 characters")
              .max(60, "Maximum 60 characters")
              .required("Body is required"),
          });
        case "deletePost":
          return yup.object({
            delId: yup
              .number()
              .typeError("Delete id must be a number")
              .min(1, "Minimum value is 1")
              .max(30, "Maximum value is 30")
              .required("Delete id is required"),
          });
      }
    },
    
    onSubmit: async (vals) => {
      try {
        if (actionType === "getQuran") {
          setSelectedJuz(vals.juzNo);
          resetForm();
        }
        if (actionType === "addNewPost") {
          await addPost({
            id: vals.newId,
            title: vals.newTitle,
            body: vals.newBody,
          }).unwrap();
          alert("New post added successfully!");
          resetForm();
        }
        if (actionType === "updatePost") {
          await updatePost({
            id: vals.updateId,
            title: vals.updateTitle,
            body: vals.updateBody,
          }).unwrap();
          alert("Post updated successfully!");
          resetForm();
        }
        if (actionType === "deletePost") {
          const confirm = window.confirm(
            "Are you sure you want to delete this post?"
          );
          if (!confirm) return;
          await deletePost(vals.delId).unwrap();
          alert("Post deleted successfully!");
          resetForm();
        }
      } catch (error) {
        alert("Error occured: " + error.message);
      }
    },
  });

  // Get whole quran or a single juz
  const handleGetQuran = (e) => {
    e.preventDefault();
    setSelectedJuz(juzNo);
    setJuzNo("");
  };

  // Creating and sending new post
  const handleNewPost = async (e) => {
    e.preventDefault();
    const newPost = {
      newId,
      newTitle,
      newBody,
    };

    try {
      await addPost(newPost).unwrap();
    } catch (error) {
      console.log("Adding post failed:", error);
    }

    // console.log(response);
  };

  // Updating existing post
  const handleUpdatePost = async (e) => {
    e.preventDefault();
    const updatedPost = {
      updateId,
      updateTitle,
      updateBody,
    };

    try {
      await updatePost(updatedPost);
    } catch (error) {
      console.log("Update Post Failed!", error);
    } finally {
      setId("");
      setTitle("");
      setBody("");
    }
  };

  // Delete existing post
  const handleDeletePost = async (e) => {
    e.preventDefault();

    const confirm = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirm) return;

    try {
      await deletePost(delId);
      alert("Post deleted successfully!");
    } catch (error) {
      console.log("Post deletion failed!", error);
      alert("Error deleting the post");
    } finally {
      setDelId("");
    }
  };
  console.log("data", data);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h3 style={{ color: "purple" }}>Get Quran Data</h3>
        <div>
          <label>Enter Juz Number (1-30):</label>
          <input
            type="text"
            placeholder="Juz No"
            name="juzNo"
            value={values.juzNo}
            onChange={handleChange}
          />
          {touched.juzNo && errors.juzNo && (
            <p className="error-message">{errors.juzNo}</p>
          )}
        </div>

        <button
          type="submit"
          onClick={() => setActionType("getQuran")}
          disabled={isFetching}
          style={{
            backgroundColor: isFetching ? "gray" : "blue",
            cursor: isFetching ? "not-allowed" : "pointer",
            opacity: isFetching ? 0.6 : 1,
            marginBottom: "20px",
          }}
        >
          {isFetching ? "Getting Quran Data..." : "Get Quran Data"}
        </button>
        <div style={{ marginLeft: "4px" }}>
          <style>{`input::placeholder{
      color: lightblue;
      font-style: italic;
      opacity: 0.8;

      }`}</style>

          <h3 style={{ color: "lightgreen" }}>Add New Post</h3>
          <div style={{ marginBottom: "8px" }}>
            <input
              type="text"
              value={values.newId}
              placeholder="Id"
              name="newId"
              onChange={handleChange}
            />
            {touched.newId && errors.newId && (
              <p className="error-message">{errors.newId}</p>
            )}
          </div>

          <div style={{ marginBottom: "8px" }}>
            <input
              type="text"
              value={values.newTitle}
              placeholder="Title"
              name="newTitle"
              onChange={handleChange}
            />
            {touched.newTitle && errors.newTitle && (
              <p className="error-message">{errors.newTitle}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              value={values.newBody}
              placeholder="Body"
              name="newBody"
              onChange={handleChange}
            />
            {touched.newBody && errors.newBody && (
              <p className="error-message">{errors.newBody}</p>
            )}
          </div>

          <button
            type="submit"
            onClick={() => setActionType("addNewPost")}
            disabled={postSending}
            style={{
              backgroundColor: postSending ? "gray" : "blue",
              cursor: postSending ? "not-allowed" : "pointer",
              opacity: postSending ? 0.6 : 1,
              marginBottom: "20px",
            }}
          >
            {postSending ? "Posting..." : "Add New Post"}
          </button>

          <h3 style={{ color: "green" }}>Update Post</h3>
          <div style={{ marginBottom: "8px" }}>
            <input
              type="text"
              value={values.updateId}
              placeholder="Id"
              name="updateId"
              onChange={handleChange}
            />
            {touched.updateId && errors.updateId && (
              <p className="error-message">{errors.updateId}</p>
            )}
          </div>

          <div style={{ marginBottom: "8px" }}>
            <input
              type="text"
              value={values.updateTitle}
              placeholder="Title"
              name="updateTitle"
              onChange={handleChange}
            />
            {touched.updateTitle && errors.updateTitle && (
              <p className="error-message">{errors.updateTitle}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              value={values.updateBody}
              placeholder="Body"
              name="updateBody"
              onChange={handleChange}
            />
            {touched.updateBody && errors.updateBody && (
              <p className="error-message">{errors.updateBody}</p>
            )}
          </div>

          <button
            type="submit"
            onClick={() => setActionType("updatePost")}
            disabled={postUpdating}
            style={{
              backgroundColor: postUpdating ? "gray" : "blue",
              cursor: postUpdating ? "not-allowed" : "pointer",
              opacity: postUpdating ? 0.6 : 1,
              marginBottom: "20px",
            }}
          >
            {postUpdating ? "PostUpdating..." : "UpdatePost"}
          </button>

          <h3 style={{ color: "red" }}>Delete Post</h3>
          <div>
            <input
              type="text"
              value={values.delId}
              placeholder="Id"
              name="delId"
              onChange={handleChange}
            />
            {touched.delId && errors.delId && (
              <p className="error-message">{errors.delId}</p>
            )}
          </div>

          <button
            type="submit"
            onClick={() => setActionType("deletePost")}
            disabled={postDeleting}
            style={{
              backgroundColor: postDeleting ? "gray" : "blue",
              cursor: postDeleting ? "not-allowed" : "pointer",
              opacity: postDeleting ? 0.6 : 1,
              marginBottom: "8px",
            }}
          >
            {postDeleting ? "PostDeleting..." : "DeletePost"}
          </button>
        </div>
      </form>
      {isLoading && <h2>Loading...</h2>}
      {isError && <h2>Error fetching Quran data.</h2>}

      {data && (
        <>
          <div
            style={{
              direction: "rtl",
              textAlign: "right",
              fontSize: "24px",
              lineHeight: "2",
              padding: "16px",
              fontWeight: "bold",
            }}
          >
            {data.data.ayahs.map((ayah) => (
              <p key={ayah.number}>{ayah.text}</p>
            ))}
          </div>

          {/* <h3>{data.data.surahs[2].name}</h3> */}
        </>
      )}
    </>
  );
}

export default Quran;
