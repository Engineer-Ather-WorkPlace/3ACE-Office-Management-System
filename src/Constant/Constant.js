const dev_url = "http://localhost:4000";
 const prod_url = 'https://3-ace-crm-backend.vercel.app';

// const Base_URL = dev_url;
const Base_URL = prod_url;

const AppRouts = {
  signin: Base_URL + "/user/Signin",
  signup: Base_URL + "/user/Signup",
  getCurrentUserInfo: Base_URL + "/user/currentUserInfo",
  getAllUsers: Base_URL + "/user/allUsers",
  editUserProfile: Base_URL + "/user",

  getAllProject: Base_URL + "/projects/allproject",
  // getSpecificProject: Base_URL + "/projects",
  getSpecificProject: Base_URL + "/projects",
  editProject: Base_URL + "/projects",
  deleteProject: Base_URL + "/projects",
  addNewProject: Base_URL + "/projects/newproject",

  updateProject: Base_URL + "/editProjectDetails/addDetails",
  getProjectDetails: Base_URL+"/editProjectDetails/projectID",

  assignProjects: Base_URL + "/projects/assignto", //to get project assigned to employee

  getProjectsSalesRecord: Base_URL + "/projectSalesRecord/getSalesRecord",
  createProjectSalesReacord: Base_URL + "/projectSalesRecord/salesRecord",
  indivusalSalesRecord: Base_URL + "/projectSalesRecord/getIndivusalSalesRecord",

  addNewPaymentt : Base_URL + "/projectSalesRecord/addNewPayment",

  deleteSalesReacord: Base_URL + "/projectSalesRecord/deleteSalesRecord",
  updateSalesRecord: Base_URL + "/projectSalesRecord/editSalesRecord"
};
export default AppRouts;
