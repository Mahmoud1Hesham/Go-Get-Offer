import React from 'react'
import { TbMailFilled } from "react-icons/tb";
import { FaPhoneAlt } from "react-icons/fa";
import { BsFacebook } from 'react-icons/bs';
import { PiHeadset, PiInstagramLogoFill, PiYoutubeLogoFill } from 'react-icons/pi';
import { FaTiktok } from 'react-icons/fa6';
import ContactForm from './contact-form';

const ContactUS = () => {


  return <>
    <section className='bg-go-primary-g'>
      <div className="container mx-auto p-10">
        <div className="top flex gap-32">
          <div className="left flex flex-col gap-5">
            <div className="up border-b border-gray-300 py-5 flex flex-col gap-5">
              <h1 className='text-white text-4xl font-bold tracking-wide'>Contact us</h1>
              <h2 className='text-white text-xl'>Partner With Go-GetOffer Today!</h2>
              <div className="info flex flex-col gap-5">
                <div className="icon-container flex">
                  <div className="h-10 w-10 mr-5 bg-go-background-g rounded-full flex justify-center items-center">
                    <TbMailFilled className='text-go-primary-o' size={20} />
                  </div>
                  <div className="flex flex-col [&>*]:text-white">
                    <h3 className='text-lg font-semibold'>Email us</h3>
                    <p className='text-sm'>info@getoffergroup.com</p>
                  </div>
                </div>
                <div className="icon-container flex">
                  <div className="h-10 w-10 mr-5 bg-go-background-g rounded-full flex justify-center items-center">
                    <FaPhoneAlt className='text-go-primary-o' size={20} />
                  </div>
                  <div className="flex flex-col [&>*]:text-white">
                    <h3 className='text-lg font-semibold'>Call us</h3>
                    <p className='text-sm'>01018188418 - 01022270220</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="down">
              <h2 className='text-white text-2xl font-semibold'>Follow us</h2>
              <div className="social-icons flex gap-3 mt-2 text-go-primary-o">
                <BsFacebook size={30} />
                <PiInstagramLogoFill size={30} />
                <FaTiktok size={30} />
                <PiYoutubeLogoFill size={30} />
              </div>
              <div className="info flex gap-2 [&>*]:text-white  pt-5">
                <div className="[&>h3]:text-lg [&>h3]:font-semibold [&>p]:font-light ">
                  <h3>Customer Support</h3>
                  <p>Our support team is available around the clock to address any concerns or queries you may have</p>
                </div>
                <div className="[&>h3]:text-lg [&>h3]:font-semibold [&>p]:font-light">
                  <h3>Feedback & Suggestions</h3>
                  <p>We value your feedback and are continuously working to improve Go-GetOffer</p>
                </div>
              </div>
              <div className="flex gap-4 pt-5">
                <PiHeadset className='text-go-primary-o font-semibold' size={20} />
                <p className='text-white'>We’re here to help, available during working hours. (8AM - 8PM)</p>
              </div>
            </div>
          </div>
          <div className="right flex-1 min-w-[600px] max-w-[800px]">
            <ContactForm/>

          </div>
        </div>
        <div className="bottom">
          <div className="left"></div>
          <div className="right"></div>
        </div>
      </div>
    </section>
  </>
}

export default ContactUS