import React from "react";
import Link from "next/link";
import {LinkedInLogoIcon, GitHubLogoIcon} from "@radix-ui/react-icons"
import Image from "next/image";


const defaultSocialLinks = [
  { href: "https://www.linkedin.com/in/alen-shaju/", icon: <LinkedInLogoIcon width="24" height="24" />, hoverColor: "text-neutral-600" },
  { href: "https://github.com/alen-001", icon: <GitHubLogoIcon width="24" height="24" />, hoverColor: "text-neutral-600" },
];

const FooterThird = ({
  brandName = "BrainShare",
  socialLinks = defaultSocialLinks,
}) => {
  return (
    <footer className="bg-black text-white-800 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-6 sm:space-y-0">
          {/* Logo */}
          {/* <div className="text-xl flex gap-2 font-bold">
               <Image src="/assets/share.svg" alt="Brain Share" width={30} height={30} className="brightness-200 invert" />
            <Link href="/" className="text-white-900 hover:text-white-600">
              {brandName}
            </Link>
          </div> */}
          {/* Social Icons */}
          <div className="mt-5 text-center font-thin text-sm text-neutral-400">
          <p>Get Started Today!</p>
        </div>
          <div className="flex flex-wrap ml-auto justify-center space-x-4 text-white-700">
            {socialLinks.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`hover:${social.hoverColor || 'text-neutral-400'}`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
        <div className="border-t border-neutral-500 mt-5">
        <div className="mt-5 text-center font-thin text-sm text-neutral-400">
          <p>&copy; {new Date().getFullYear()} {brandName}. All rights reserved.</p>
        </div>
        </div>
        
      </div>
    </footer>
  );
};

export default FooterThird;