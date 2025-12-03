"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_BASE_URL, setAuthToken } from '@/utils/env';

// Using environment variable for API base URL

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);

  // Animation states
  const [logoVisible, setLogoVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);
  const logoTextRef = useRef<HTMLParagraphElement>(null);

  // Initialize animations on mount
  useEffect(() => {
    // Fade in logo and form with a slight delay
    setTimeout(() => setLogoVisible(true), 100);
    setTimeout(() => setFormVisible(true), 300);
  }, []);

  // Show error animation when error changes
  useEffect(() => {
    if (error) {
      setErrorVisible(false);
      setTimeout(() => setErrorVisible(true), 50);
    }
  }, [error]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Call Admin Login API
      const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Store auth token
        setAuthToken(data.data.token);
        localStorage.setItem('adminAuth', JSON.stringify({
          isAuthenticated: true
        }));
        
        // Keep loading state true until redirect completes
        // Redirect to dashboard
        await router.push('/dashboard');
      } else {
        setError(data.message || 'Invalid email or password');
        setIsLoading(false); // Only stop loading on error
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
      console.error('Login error:', err);
      setIsLoading(false); // Stop loading on error
    }
  };

  // 3D tilt effect for the card
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element
    const y = e.clientY - rect.top; // y position within the element
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation (limited to a small range for subtle effect)
    const rotateY = ((x - centerX) / centerX) * 5; // max 5 degrees
    const rotateX = ((centerY - y) / centerY) * 5; // max 5 degrees
    
    setRotateX(rotateX);
    setRotateY(rotateY);
  };

  const handleMouseLeave = () => {
    // Reset rotation when mouse leaves
    setRotateX(0);
    setRotateY(0);
  };

  // Icon animation for username and password fields
  const [usernameIconPos, setUsernameIconPos] = useState(0);
  const [passwordIconPos, setPasswordIconPos] = useState(0);

  useEffect(() => {
    // Simple animation for the icons
    let direction = 1;
    let position = 0;
    
    const iconAnimInterval = setInterval(() => {
      position += 0.5 * direction;
      if (position >= 2 || position <= -2) {
        direction *= -1;
      }
      setUsernameIconPos(position);
      setPasswordIconPos(position);
    }, 100);

    return () => clearInterval(iconAnimInterval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center md:gap-12 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Pharmacy-themed animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50" style={{ zIndex: -2 }}>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(65,175,255,0.4)_0%,rgba(65,175,255,0)_50%)]" />
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_60%,rgba(21,101,192,0.3)_0%,rgba(21,101,192,0)_50%)]" />
          <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,rgba(33,150,243,0.3)_0%,rgba(33,150,243,0)_50%)]" />
        </div>
      </div>
      
      {/* Animated pharmacy icons */}
       <div className="pharmacy-icons">
         {/* Pills */}
         <div className="icon pill-1"></div>
         <div className="icon pill-2"></div>
         <div className="icon pill-3"></div>
         <div className="icon pill-4"></div>
         <div className="icon pill-5"></div>
         
         {/* Medicine bottles */}
         <div className="icon bottle-1"></div>
         <div className="icon bottle-2"></div>
         <div className="icon bottle-3"></div>
         
         {/* Medical symbols */}
         <div className="icon medical-symbol-1"></div>
         <div className="icon medical-symbol-2"></div>
         <div className="icon medical-symbol-3"></div>
         
         {/* Stethoscope */}
         <div className="icon stethoscope"></div>
         
         {/* Mortar and pestle */}
         <div className="icon mortar"></div>
         
         {/* Prescription */}
         <div className="icon prescription"></div>
         
         {/* Capsules */}
         <div className="icon capsule-1"></div>
         <div className="icon capsule-2"></div>
         
         {/* DNA Helix */}
         <div className="icon dna-helix"></div>
         
         {/* Microscope */}
         <div className="icon microscope"></div>
         
         {/* Heart Rate */}
         <div className="icon heart-rate"></div>
         
         {/* Test Tube */}
         <div className="icon test-tube"></div>
         
         {/* Syringe */}
         <div className="icon syringe"></div>
         
         {/* First Aid Kit */}
         <div className="icon first-aid"></div>
       </div>
      
      <style jsx>{`
        .pharmacy-icons {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: -1; /* Changed from -5 to -1 to ensure visibility while staying behind content */
        }
        
        .icon {
          position: absolute;
          opacity: 0.3; /* Increased opacity for better visibility */
          filter: blur(0.5px);
          z-index: 0; /* Changed from -1 to 0 to ensure visibility */
          background-repeat: no-repeat;
          background-position: center;
          background-size: contain;
          pointer-events: none; /* Ensures icons don't interfere with clicks */
        }
        
        /* Pills */
         .pill-1, .pill-2, .pill-3, .pill-4, .pill-5 {
           width: 60px;
           height: 30px;
           border-radius: 15px;
           background-color: #FF6B6B;
           animation: float 15s infinite ease-in-out;
           box-shadow: 0 5px 15px rgba(0,0,0,0.1);
         }
         
         .pill-1 {
           top: 15%;
           left: 10%;
           transform: rotate(30deg);
           animation-delay: 0s;
           background: linear-gradient(45deg, #FF6B6B, #FFE66D);
         }
         
         .pill-2 {
           top: 70%;
           left: 80%;
           transform: rotate(-15deg);
           animation-delay: 5s;
           background: linear-gradient(45deg, #4ECDC4, #556270);
         }
         
         .pill-3 {
           top: 40%;
           left: 85%;
           transform: rotate(45deg);
           animation-delay: 8s;
           background: linear-gradient(45deg, #C7F464, #FF6B6B);
         }
         
         .pill-4 {
           top: 85%;
           left: 40%;
           transform: rotate(60deg);
           animation-delay: 12s;
           background: linear-gradient(45deg, #41AFFF, #2b9fe8);
         }
         
         .pill-5 {
           top: 5%;
           left: 45%;
           transform: rotate(-30deg);
           animation-delay: 7s;
           background: linear-gradient(45deg, #9D50BB, #6E48AA);
         }
        
        /* Medicine bottles */
         .bottle-1, .bottle-2, .bottle-3 {
           width: 40px;
           height: 70px;
           border-radius: 5px 5px 20px 20px;
           background-color: #4ECDC4;
           animation: float 20s infinite ease-in-out;
           box-shadow: 0 8px 20px rgba(0,0,0,0.15);
           position: relative;
         }
         
         .bottle-1::after, .bottle-2::after, .bottle-3::after {
           content: '';
           position: absolute;
           top: 10px;
           left: 50%;
           transform: translateX(-50%);
           width: 20px;
           height: 10px;
           background-color: rgba(255, 255, 255, 0.3);
           border-radius: 5px;
         }
         
         .bottle-1 {
           top: 25%;
           left: 85%;
           animation-delay: 2s;
           background: linear-gradient(to bottom, #4ECDC4, #556270);
           transform: perspective(500px) rotateY(15deg);
         }
         
         .bottle-2 {
           top: 65%;
           left: 15%;
           animation-delay: 7s;
           background: linear-gradient(to bottom, #FF6B6B, #C44D58);
           transform: perspective(500px) rotateY(-15deg);
         }
         
         .bottle-3 {
           top: 15%;
           left: 35%;
           animation-delay: 10s;
           background: linear-gradient(to bottom, #9D50BB, #6E48AA);
           transform: perspective(500px) rotateY(25deg);
         }
        
        /* Medical symbols */
        .medical-symbol-1, .medical-symbol-2, .medical-symbol-3 {
          width: 80px;
          height: 80px;
          animation: float 25s infinite ease-in-out;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
          transform-style: preserve-3d;
        }
        
        .medical-symbol-1 {
          top: 20%;
          left: 20%;
          animation-delay: 4s;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%234ECDC4'%3E%3Cpath d='M19 3h-4a1 1 0 0 0-1 1v4h-4V4a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h4v6H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-4h4v4a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-4v-6h4a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1z'/%3E%3C/svg%3E");
          transform: perspective(800px) rotateX(10deg) rotateY(-10deg);
        }
        
        .medical-symbol-2 {
          width: 90px;
          height: 90px;
          top: 70%;
          left: 60%;
          animation: float 22s infinite ease-in-out;
          animation-delay: 6s;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23556270'%3E%3Cpath d='M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm0 3a1 1 0 0 1 1 1v3h3a1 1 0 0 1 0 2h-3v3a1 1 0 0 1-2 0v-3H8a1 1 0 0 1 0-2h3V8a1 1 0 0 1 1-1z'/%3E%3C/svg%3E");
          transform: perspective(800px) rotateX(-15deg) rotateY(5deg);
        }
        
        .medical-symbol-3 {
          width: 85px;
          height: 85px;
          top: 30%;
          left: 5%;
          animation: float 20s infinite ease-in-out;
          animation-delay: 8s;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2341AFFF'%3E%3Cpath d='M19.979 2.209a1 1 0 00-1.316.632l-.633 1.685a1 1 0 01-1.342.528L15 4.279l-1.688.775a1 1 0 01-1.342-.528l-.633-1.685a1 1 0 00-1.316-.632L9 2.535v1.098a1 1 0 01-.629.928L7.098 5.12a1 1 0 00-.629.928v1.098l-1.021.326a1 1 0 00-.632 1.316l.775 1.688a1 1 0 01-.528 1.342L3.379 12l1.684.633a1 1 0 01.528 1.342l-.775 1.688a1 1 0 00.632 1.316l1.021.326v1.098a1 1 0 00.629.928l1.273.559a1 1 0 01.629.928v1.098l1.021.326a1 1 0 001.316-.632l.633-1.685a1 1 0 011.342-.528L15 19.721l1.688-.775a1 1 0 011.342.528l.633 1.685a1 1 0 001.316.632l1.021-.326v-1.098a1 1 0 01.629-.928l1.273-.559a1 1 0 00.629-.928v-1.098l1.021-.326a1 1 0 00.632-1.316l-.775-1.688a1 1 0 01.528-1.342L20.621 12l-1.684-.633a1 1 0 01-.528-1.342l.775-1.688a1 1 0 00-.632-1.316l-1.021-.326V5.597a1 1 0 00-.629-.928l-1.273-.559a1 1 0 01-.629-.928V2.084l-1.021-.326zM12 8a4 4 0 100 8 4 4 0 000-8z'/%3E%3C/svg%3E");
          transform: perspective(800px) rotateX(5deg) rotateY(15deg);
        }
        
        /* Stethoscope */
        .stethoscope {
          width: 100px;
          height: 100px;
          top: 10%;
          left: 60%;
          animation: float 18s infinite ease-in-out;
          animation-delay: 3s;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23FF6B6B'%3E%3Cpath d='M19 8V4.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5V8a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3V4.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5V8a5 5 0 0 0 5 5h.5c0 1.96.69 3.7 1.5 5.063V20a2 2 0 0 0 4 0v-1.937c.81-1.364 1.5-3.103 1.5-5.063h.5a5 5 0 0 0 5-5zm-9 7.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0z'/%3E%3C/svg%3E");
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
          transform: perspective(800px) rotateX(15deg) rotateY(-5deg);
          filter: drop-shadow(0 5px 15px rgba(85, 98, 112, 0.4));
        }
        
        /* Mortar and pestle */
        .mortar {
          width: 80px;
          height: 80px;
          top: 50%;
          left: 30%;
          animation: float 20s infinite ease-in-out;
          animation-delay: 9s;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23C7F464'%3E%3Cpath d='M21 14v-2h-2v2h-2v-2h-2v2h-2v-2h-2v2h-2v-2H7v2H5v-2H3v2h18zm-9-4a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0-6a2 2 0 1 1 0 4 2 2 0 0 1 0-4z'/%3E%3C/svg%3E");
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
          transform: perspective(800px) rotateX(-10deg) rotateY(10deg);
          filter: drop-shadow(0 5px 15px rgba(196, 77, 88, 0.4));
        }
        
        /* Prescription */
        .prescription {
          width: 70px;
          height: 90px;
          top: 30%;
          left: 40%;
          animation: float 23s infinite ease-in-out;
          animation-delay: 1s;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23556270'%3E%3Cpath d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM8.5 12H10v1h1v-1h1.5v4.5h-1V14h-2v2.5h-1V12zm5.5 4.5h1v-3h.5v3h1v-3h.5v-1.5h-3v4.5z'/%3E%3C/svg%3E");
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
          transform: perspective(800px) rotateX(15deg) rotateY(-5deg);
          filter: drop-shadow(0 5px 15px rgba(255, 107, 107, 0.4));
        }
        
        /* Capsules */
        .capsule-1, .capsule-2 {
          width: 75px;
          height: 60px;
          animation: float 24s infinite ease-in-out;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23C7F464'%3E%3Cpath d='M8.5 2a6.5 6.5 0 0 0-6.5 6.5v7a6.5 6.5 0 0 0 13 0v-7A6.5 6.5 0 0 0 8.5 2zm0 2a4.5 4.5 0 0 1 4.5 4.5v7a4.5 4.5 0 0 1-9 0v-7A4.5 4.5 0 0 1 8.5 4zm7 2a6.5 6.5 0 0 0-2 .32v2.18A4.5 4.5 0 0 1 15.5 8a4.5 4.5 0 0 1 4.5 4.5v7a4.5 4.5 0 0 1-9 0v-2h-2v2a6.5 6.5 0 0 0 13 0v-7A6.5 6.5 0 0 0 15.5 6z'/%3E%3C/svg%3E");
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
          transform: perspective(800px) rotateX(-10deg) rotateY(10deg);
          filter: drop-shadow(0 5px 15px rgba(199, 244, 100, 0.4));
        }
        
        .capsule-1 {
          top: 60%;
          left: 55%;
          animation-delay: 9s;
        }
        
        .capsule-2 {
          top: 25%;
          left: 75%;
          animation-delay: 15s;
        }
        
        /* DNA Helix */
        .dna-helix {
          width: 70px;
          height: 80px;
          top: 45%;
          left: 10%;
          animation: float 25s infinite ease-in-out;
          animation-delay: 11s;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2341AFFF'%3E%3Cpath d='M12 2c-4.42 0-8 .5-8 4v12c0 3.5 3.58 4 8 4s8-.5 8-4V6c0-3.5-3.58-4-8-4zm0 2c3.71 0 5.13.46 5.67 1H6.33c.54-.54 1.96-1 5.67-1zM18 18c0 .71-2.28 2-6 2s-6-1.29-6-2v-3.32L7.16 14A5.71 5.71 0 0 0 12 16c1.71 0 3.84-.83 4.84-2l1.16.68V18zm0-5.68l-.94-.55c-.25.17-.56.37-.94.55-.87.41-2.03.68-3.44.68-1.41 0-2.57-.27-3.44-.68-.38-.18-.69-.38-.94-.55l-.94.55V11c0 .71 2.28 2 6 2s6-1.29 6-2v1.32zm0-3.96l-.94-.55c-.25.17-.56.37-.94.55-.87.41-2.03.68-3.44.68-1.41 0-2.57-.27-3.44-.68-.38-.18-.69-.38-.94-.55l-.94.55V7.35c0 .71 2.28 2 6 2s6-1.29 6-2v1.01z'/%3E%3C/svg%3E");
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
          transform: perspective(800px) rotateX(10deg) rotateY(15deg);
          filter: drop-shadow(0 5px 15px rgba(65, 175, 255, 0.5));
        }
        
        /* Microscope */
        .microscope {
          width: 80px;
          height: 80px;
          top: 70%;
          left: 25%;
          animation: float 22s infinite ease-in-out;
          animation-delay: 13s;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%232b9fe8'%3E%3Cpath d='M12 2a1 1 0 0 0-1 1v1H7a1 1 0 0 0 0 2h4v1a1 1 0 0 0 2 0V6h4a1 1 0 0 0 0-2h-4V3a1 1 0 0 0-1-1zm-3 6a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H9zm-6 7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3z'/%3E%3C/svg%3E");
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
          transform: perspective(800px) rotateX(-15deg) rotateY(10deg);
          filter: drop-shadow(0 5px 15px rgba(43, 159, 232, 0.5));
        }
        
        /* Heart rate */
        .heart-rate {
          width: 90px;
          height: 70px;
          top: 85%;
          left: 75%;
          animation: float 20s infinite ease-in-out;
          animation-delay: 15s;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%231a73e8'%3E%3Cpath d='M3.002 12h4.252l1.002-3h2.252l1 3h4.496v-2.5h2.25v2.5h1.748c0 0 1.748-4.5 3.748-4.5v9H16.75v-2.5h-2.25v2.5h-2.996l-1-3h-2.252l-1.002 3H3.002C3.002 12 2.5 9.5 2.5 9.5S3.002 12 3.002 12z'/%3E%3C/svg%3E");
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
          transform: perspective(800px) rotateX(5deg) rotateY(-10deg);
          filter: drop-shadow(0 5px 15px rgba(26, 115, 232, 0.5));
        }
        
        /* Test Tube */
        .test-tube {
          width: 60px;
          height: 90px;
          top: 55%;
          left: 80%;
          animation: float 19s infinite ease-in-out;
          animation-delay: 6s;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%230D47A1'%3E%3Cpath d='M7 2v2h1v14c0 2.2 1.8 4 4 4s4-1.8 4-4V4h1V2H7zm8 16c0 1.1-.9 2-2 2s-2-.9-2-2v-6h4v6zm0-8h-4V4h4v6z'/%3E%3C/svg%3E");
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
          transform: perspective(800px) rotateX(-5deg) rotateY(15deg);
          filter: drop-shadow(0 5px 15px rgba(13, 71, 161, 0.5));
        }
        
        /* Syringe */
        .syringe {
          width: 85px;
          height: 85px;
          top: 15%;
          left: 65%;
          animation: float 21s infinite ease-in-out;
          animation-delay: 8s;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%231565C0'%3E%3Cpath d='M11.7 15.3l-5-5c-.4-.4-.4-1 0-1.4l4.3-4.3 1.4 1.4L8.8 9.6l3.6 3.6 3.6-3.6-1.4-1.4 1.4-1.4 4.3 4.3c.4.4.4 1 0 1.4l-5 5c-.4.4-1 .4-1.4 0zM13 19.9V22h-2v-2.1c-4.4-.5-7.9-4-8.5-8.4h2c.6 3.8 3.8 6.8 7.8 6.8s7.2-3 7.8-6.8h2c-.6 4.4-4.1 7.9-8.5 8.4z'/%3E%3C/svg%3E");
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
          transform: perspective(800px) rotateX(10deg) rotateY(-5deg);
          filter: drop-shadow(0 5px 15px rgba(21, 101, 192, 0.5));
        }
        
        /* First Aid Kit */
        .first-aid {
          width: 80px;
          height: 80px;
          top: 40%;
          left: 20%;
          animation: float 23s infinite ease-in-out;
          animation-delay: 10s;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%232196F3'%3E%3Cpath d='M20 6h-3V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM9 4h6v2H9V4zm11 16H4V8h16v12zm-7-8h-2v2h-2v-2H7v-2h2V8h2v2h2v2z'/%3E%3C/svg%3E");
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
          transform: perspective(800px) rotateX(-10deg) rotateY(5deg);
          filter: drop-shadow(0 5px 15px rgba(33, 150, 243, 0.5));
        }
        
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0) perspective(800px) rotateX(0deg) rotateY(0deg);
          }
          25% {
            transform: translateY(-20px) rotate(5deg) perspective(800px) rotateX(5deg) rotateY(-5deg);
          }
          50% {
            transform: translateY(0) rotate(0) perspective(800px) rotateX(0deg) rotateY(0deg);
          }
          75% {
            transform: translateY(20px) rotate(-5deg) perspective(800px) rotateX(-5deg) rotateY(5deg);
          }
          100% {
            transform: translateY(0) rotate(0) perspective(800px) rotateX(0deg) rotateY(0deg);
          }
        }
        
        /* Add a subtle pulse animation for some icons */
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.15;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.2;
          }
        }
        
        /* Apply pulse animation to specific icons */
        .medical-symbol-1, .test-tube, .first-aid {
          animation: float 25s infinite ease-in-out, pulse 8s infinite ease-in-out;
        }
      `}</style>
      {/* Logo Side */}
      <div 
        className={`flex flex-col items-center justify-center md:w-1/2 mb-10 md:mb-0 transition-opacity duration-800 ${logoVisible ? 'opacity-100' : 'opacity-0 transform translate-y-5'}`}
        style={{ transitionDelay: '100ms' }}
      >
        <div 
          ref={logoRef}
          className="relative transition-transform duration-1000 ease-in-out"
        >
          <h1 className="font-pacifico text-8xl md:text-9xl lg:text-[12rem] text-center brand-title" aria-label="Oraglan">
            {['O','r','a','g','l','a','n'].map((ch, i) => (
              <span key={i} className="brand-letter">{ch}</span>
            ))}
          </h1>
        </div>
      </div>
      <style jsx>{`
        .brand-title { letter-spacing: 3px; }
        .brand-letter {
          color: #41AFFF;
          display: inline-block;
          /* 3D layered shadow */
          text-shadow:
            0 1px 0 #2b9fe8,
            0 2px 0 #2b9fe8,
            0 3px 0 #278fdc,
            0 6px 10px rgba(65, 175, 255, 0.35);
          transition: color 200ms ease, text-shadow 200ms ease, transform 200ms ease;
          /* Gentle wave motion when not hovering */
          animation: waveMotion 3s ease-in-out infinite;
        }
        .brand-letter:hover {
          color: #1f78d1;
          text-shadow: 0 2px 2px #1f78d1, 0 10px 18px rgba(31, 120, 209, 0.45);
          transform: translateY(-2px) scale(1.02);
          animation-play-state: paused;
        }
        @keyframes waveMotion {
          0%, 100% { transform: translateY(0); }
          25% { transform: translateY(-4px); }
          50% { transform: translateY(0); }
          75% { transform: translateY(4px); }
        }
        /* Stagger the wave across letters */
        .brand-letter:nth-child(1) { animation-delay: 0s; }
        .brand-letter:nth-child(2) { animation-delay: 0.1s; }
        .brand-letter:nth-child(3) { animation-delay: 0.2s; }
        .brand-letter:nth-child(4) { animation-delay: 0.3s; }
        .brand-letter:nth-child(5) { animation-delay: 0.4s; }
        .brand-letter:nth-child(6) { animation-delay: 0.5s; }
        .brand-letter:nth-child(7) { animation-delay: 0.6s; }
      `}</style>
      
      {/* Login Form Side */}
      <div 
        className={`md:w-1/2 max-w-md w-full space-y-8 transition-all duration-800 ${formVisible ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform translate-x-5'}`}
      >
        <div 
          className="bg-white py-8 px-6 shadow-2xl rounded-2xl"
          style={{
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transition: 'transform 0.1s ease-out'
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div>
            <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900 font-poppins">Sign in</h2>
            <p className="mt-2 text-center text-sm text-gray-600 font-poppins">
              Access your admin dashboard
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 font-poppins">Email</label>
                <div className="mt-1 relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="appearance-none block w-full px-3 py-3 pl-10 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#41AFFF] focus:border-[#41AFFF] transition-all duration-300 font-poppins"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <div
                      style={{ transform: `translateY(${usernameIconPos}px)`, transition: 'transform 0.1s ease-out' }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 font-poppins">Password</label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-3 pl-10 pr-10 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#41AFFF] focus:border-[#41AFFF] transition-all duration-300 font-poppins"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <div
                      style={{ transform: `translateY(${passwordIconPos}px)`, transition: 'transform 0.1s ease-out' }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-600 focus:outline-none"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ transform: `translateY(${passwordIconPos}px)`, transition: 'transform 0.1s ease-out' }}
                    >
                      <div className="relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full blur opacity-75"></div>
                        <div className="relative">
                          {showPassword ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                              <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <div 
                className={`rounded-md bg-red-50 p-4 transition-all duration-300 ${errorVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-2'}`}
              >
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800 font-poppins">{error}</h3>
                  </div>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#41AFFF] hover:bg-[#2b9fe8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#41AFFF] transition-all duration-300 font-poppins disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:scale-[1.03] active:scale-[0.97]"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  {isLoading ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </span>
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
            
            <div className="text-sm text-center text-gray-600 font-poppins">
              
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
