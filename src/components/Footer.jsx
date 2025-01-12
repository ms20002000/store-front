import React from 'react';
import { NavLink } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <div className="mb-4">
          <NavLink 
            to="/contact_us" 
            className="text-gray-300 hover:text-white mx-2" 
            activeClassName="text-white"
          >
            About Us
          </NavLink>
          <NavLink 
            to="/contact_us" 
            className="text-gray-300 hover:text-white mx-2" 
            activeClassName="text-white"
          >
            Contact
          </NavLink>
          <a  
            href="https://termly.io/html_document/website-privacy-policy-template-text-format/" 
            className="text-gray-300 hover:text-white mx-2" 
            activeClassName="text-white"
          >
            Privacy Policy
          </a>
          <a
            href="https://termly.io/resources/templates/ecommerce-terms-and-conditions/" 
            className="text-gray-300 hover:text-white mx-2" 
            activeClassName="text-white"
          >
            Terms of Service
          </a>
        </div>
        <div className="mb-4">
          <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="mx-2 rounded-full">
            <img src="/linkdin.png" alt="Twitter" className="inline-block w-6 h-6" />
          </a>
          <a href="https://telegram.org/" target="_blank" rel="noopener noreferrer" className="mx-2">
            <img src="/telegram.png" alt="Facebook" className="inline-block w-6 h-6" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="mx-2">
            <img src="/instagram.png" alt="Instagram" className="inline-block w-10 h-6" />
          </a>
        </div>
        <div className="text-gray-400">
          &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
