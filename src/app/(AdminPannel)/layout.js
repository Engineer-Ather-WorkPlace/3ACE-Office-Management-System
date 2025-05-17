'use client'
import AdminNavbar from "@/app/(AdminPannel)/AdminComponent/AdminNavbar";
const AdminLayout = ({children})=>{
return(
<>
<AdminNavbar/>
<main> {children} </main>
</>
)}
export default AdminLayout