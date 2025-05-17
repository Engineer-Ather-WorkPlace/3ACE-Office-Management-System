import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "@/Context/context";
import AppRouts from "@/Constant/Constant";
import axios from "axios";
import { X, Settings } from "lucide-react";
import Button from "./Btn";

const UpdateProject = ({ Pid, projectTitle }) => {
  const { user, token } = useContext(AuthContext);
  const [updateProject, setUpdateProject] = useState(false);
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState(""); // To track file type
  const [loading, setLoading] = useState(false)
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Determine file type
    const fileExtension = selectedFile.name.split(".").pop().toLowerCase();
    let isImage = ["jpg", "jpeg", "png", "gif"].includes(fileExtension);
    setFileType(isImage ? "image" : "raw");
  };

  const handleClick = async () => {
    setUpdateProject(true);
    setLoading(false)
  };

  // const handleSubmit = async (e) => {
  //   setLoading(true)
  //   e.preventDefault();

  //   if (!file && !e.target.remarks.value) {
  //     alert("Please select a file before submitting!");
  //     return;
  //   }

  //   // Validate file size (10MB max example)
  //   if (file?.size > 10 * 1024 * 1024) {
  //     alert("File size exceeds 10MB limit");
  //     return;
  //   }

  //   const fileData = new FormData();
  //   fileData.append("file", file);
  //   fileData.append("upload_preset", "CRM_preset");
  //   // Determine correct resource type
  //   const isDocument =
  //     file?.type === "application/pdf" ||
  //     file?.type === "application/msword" ||
  //     file?.type ===
  //       "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

  //   fileData.append("resource_type", isDocument ? "raw" : "image");

  //   try {
  //     const endpoint = `https://api.cloudinary.com/v1_1/dnqh1oaye/auto/upload`;
  //     const uploadResponse = await axios.post(endpoint, fileData);
  //     const f_url = uploadResponse.data.secure_url;

  //     const updatedData = {
  //       userID: user.userId,
  //       userName: user.name,
  //       userRole: user.role,
  //       projecTitle: projectTitle,
  //       projectID: Pid,
  //       remarks: e.target.remarks.value,
  //       ...(f_url && {document: f_url}),
  //       document: f_url,
  //       documentType: fileType, // Store file type for reference
  //     };

  //     console.log(updatedData);

  //     const response = await axios.post(AppRouts.updateProject, updatedData);
  //     alert(" Updated Successfully");
  //     setUpdateProject(false);
  //     setLoading(false)
  //   } catch (error) {
  //     console.error("Error:", error);
  //     setLoading(false)
  //     alert(
  //       `Upload failed: ${
  //         error.response?.data?.error?.message || error.message
  //       }`
  //     );
  //     setLoading(false)

  //   }
  // };



  const handleSubmit = async (e) => {

    console.log("submited codeLink: ", e.target.codeLink.value);
    console.log("submited deploymentLink : ", e.target.deploymentLink.value);
    console.log("submited refrenceLink : ", e.target.refrenceLink.value);
    
    e.preventDefault();
    setLoading(true);

    const remarks = e.target.remarks.value;

    if (!file && !remarks) {
      alert("Please provide either remarks or a file before submitting!");
      setLoading(false);
      return;
    }

    // Validate file size only if file exists
    if (file && file.size > 10 * 1024 * 1024) {
      alert("File size exceeds 10MB limit");
      setLoading(false);
      return;
    }

    try {
      let documentData = null;

      // Only upload to Cloudinary if file exists
      if (file) {
        const fileData = new FormData();
        fileData.append("file", file);
        fileData.append("upload_preset", "CRM_preset");
        const isDocument =
          file.type === "application/pdf" ||
          file.type === "application/msword" ||
          file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

        fileData.append("resource_type", isDocument ? "raw" : "image");

        const endpoint = `https://api.cloudinary.com/v1_1/dnqh1oaye/auto/upload`;
        const uploadResponse = await axios.post(endpoint, fileData);
        documentData = {
          document: uploadResponse.data.secure_url,
          documentType: fileType
        };
      }

      const updatedData = {
        userID: user.userId,
        userName: user.name,
        userRole: user.role,
        projecTitle: projectTitle,
        projectID: Pid,
        remarks: remarks,
        codeLinks: e.target.codeLink.value  ,
        deploymnetLink: e.target.deploymentLink.value ,
        refrenceLink: e.target.refrenceLink.value ,
        ...(documentData && documentData) // yea sirf jub cloudniary ka link add kry ga agr user na file input de hoge
      };

      console.log(updatedData);

      const response = await axios.post(AppRouts.updateProject, updatedData);
      alert("Updated Successfully");
      setUpdateProject(false);
    } catch (error) {
      console.error("Error:", error);
      alert(
        `Upload failed: ${error.response?.data?.error?.message || error.message
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        title="Modify"
        onClick={handleClick}
      ><Settings size={18} /> Modify
      </Button>

      {updateProject && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white/90 p-4 rounded-lg shadow-2xl w-full max-w-4xl mx-4 overflow-y-auto max-h-[95vh]">
            <div className="flex justify-between items-end mb-20">
              <h2 className="text-2xl font-serif text-heading">
                {projectTitle}
                <span className="text-lg">
                  {" ( Project ID # "}
                  {Pid} {" ) "}{" "}
                </span>
              </h2>
              <button
                onClick={() => setUpdateProject(false)}
                className="text-4xl text-gray-600 hover:text-black transition duration-300"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

              {/* take input details details from user */}
              <div className="flex flex-col md:flex-row justify-around">

                {/* remarks */}
                <div className="w-1/2 ">
                  <label
                    htmlFor="remarks"
                    className="block text-text text-md font-semibold font-serif"
                  >
                    Remarks
                  </label>

                  <textarea
                    name="remarks"
                    id="remarks"
                    className="w-full text-md px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-heading"
                    placeholder="Enter remarks"
                    rows="8"
                  ></textarea>
                </div>

                <div className="flex flex-col justify-between">

                  {/* code Link */}
                  <div>
                    <label
                      htmlFor="codeLink"
                      className="block text-text text-md font-semibold font-serif"
                    >
                      Code Link
                    </label>

                    <input
                      name="codeLink"
                      id="codeLink"
                      className="w-full text-md px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-heading"
                      placeholder="Code Link"
                    ></input>
                  </div>

                  {/* deployment link */}
                  <div>
                    <label
                      htmlFor="deploymentLink"
                      className="block text-text text-md font-semibold font-serif"
                    >
                      Deployment Link
                    </label>

                    <input
                      name="deploymentLink"
                      id="deploymentLink"
                      className="w-full text-md px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-heading"
                      placeholder="Code Link"
                    ></input>
                  </div>

                  {/* refrence Link */}
                  <div>
                    <label
                      htmlFor="refrenceLink"
                      className="block text-text text-md font-semibold font-serif"
                    >
                      Refrence Link
                    </label>

                    <input
                      name="refrenceLink"
                      id="refrenceLink"
                      className="w-full text-md px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-heading"
                      placeholder="Code Link"
                    ></input>
                  </div>
                </div>

              </div>


              {/* File Upload */}
              <div className="w-full">
                <label
                  htmlFor="file"
                  className="block text-text text-md font-semibold font-serif"
                >
                  Attach Document (PDF, DOC, IMG)
                </label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  accept=".pdf,.doc,.docx,.jpg,.png"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 border rounded-lg cursor-pointer"
                />
                {file && (
                  <p className="text-sm text-gray-600 mt-2">
                    Selected File: {file.name}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end align-center mt-4">

                <Button
                  title="Submit"
                  type="submit"
                  loading={loading}
                >

                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default UpdateProject;
