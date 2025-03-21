"use client"
import LandingNav from "@/components/landing-nav";
import { Hero } from "@/components/hero";
import FooterThird from "../../components/footer";
import Image from 'next/image';
import {motion} from 'motion/react';
function LandingPage() {
  return (
    <div className='w-screen bg-black'>
        <div className='sticky top-0 z-50'><LandingNav></LandingNav></div>
        <motion.div
    initial={{ opacity: 0.0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{
      delay: 0.3,
      duration: 1.2,
      ease: "easeInOut",
    }}
  >
        <div className=" flex flex-col items-center justify-center overflow-hidden">
          {/* <Hero/> */}
          <Hero/>
          <div className="mt-20">
            <h1 className="text-3xl p-10 bg-opacity-50 bg-gradient-to-b font-mono from-neutral-50 to-neutral-400 bg-clip-text text-center  font-extralight text-transparent">
              Store whatever you want,
              <br/>
              <div className="text-sm">even if it&apos;s your love for dogs</div>
            </h1>
          <Image src='/assets/features.png' alt="features" width={4000}  height={4000} className="rounded-3xl"/>
          </div>
        {/* <Hero/>
        <Bento/>
        <CallToAction/> */}
        </div>
        </motion.div>
        <FooterThird />
    </div>
  );
}

export default LandingPage;