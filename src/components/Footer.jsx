import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import {
  FOOTER_SCHOOLS,
  FOOTER_ADMISSIONS,
  FOOTER_IMPORTANT_LINKS,
  FOOTER_LMS,
  FOOTER_BOTTOM_LINKS
} from "../constants/data";

const Footer = () => {
  const footerSections = [
    { title: "SCHOOLS", items: FOOTER_SCHOOLS },
    { title: "ADMISSIONS 2025", items: FOOTER_ADMISSIONS },
    { title: "IMPORTANT LINKS", items: FOOTER_IMPORTANT_LINKS },
    { title: "LMS LOGIN", items: FOOTER_LMS }
  ];

  const socialLinks = [
    { icon: FaFacebookF, url: "https://www.facebook.com" },
    { icon: FaInstagram, url: "https://www.instagram.com" },
    { icon: FaTwitter, url: "https://www.twitter.com" }
  ];

  return (
    <footer className="relative overflow-hidden text-gray-600">
      <img
        src="https://www.gyanvihar.org/images/new/background/contactusbackground.png"
        alt="Footer Background"
        className="absolute inset-0 w-full h-full object-cover opacity-90 -z-1"
      />

      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        {footerSections.map((section) => (
          <div key={section.title}>
            <h4 className="font-semibold text-gray-900 mb-3">{section.title}</h4>
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-gray-900 transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <img
            src="/kishangarh-logo.svg"
            alt="Kishangarh law college (CO-EDU) Logo"
            className="h-12"
          />
          <div className="flex space-x-3">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit our ${social.url}`}
              >
                <social.icon className="text-gray-700 hover:text-gray-900 text-xl transition-colors duration-300" />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap justify-center md:justify-end space-x-4 text-sm">
          {FOOTER_BOTTOM_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className="hover:text-gray-900 transition-colors duration-300"
            >
              {link}
            </a>
          ))}
        </div>
      </div>

      <div className="text-center text-xs text-gray-700 pb-6">
        ©Copyright 2025, Kishangarh law college (CO-EDU). All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
