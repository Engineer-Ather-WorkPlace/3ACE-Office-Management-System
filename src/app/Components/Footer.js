export default function Footer() {
  {
    /* Footer */
  }
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-blue-800 text-white py-10">
      <div className="container mx-auto px-6 text-center">
        <p className="text-white">
          &copy; {new Date().getFullYear()} ACE CRM. All rights reserved.
        </p>
        <div className="mt-4 space-x-6">
          <a href="#" className=" hover:underline">
            About Us
          </a>
          <a href="#" className=" hover:underline">
            Contact Support
          </a>
          <a href="#" className=" hover:underline">
            Privacy Policy
          </a>
          <a href="#" className=" hover:underline">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
