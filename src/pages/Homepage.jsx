import React from 'react';
import laptop from '../assets/Laptop.png';
import license from '../assets/license.png';
import atm from '../assets/atm.png';
import phone from '../assets/phone.png';
import safebox from '../assets/safebox.png';
import logo from '../assets/logo.png';
import phoneScreen from '../assets/phoneScreen.png';
import screenblur from '../assets/screenblur.png';
import metatrader from '../assets/metatrader.png';
import webtrader from '../assets/webtrader.png';
import mobileapp from '../assets/mobileapp.png';
import starBadge from '../assets/starBadge.png';

const FinsaiHomepage = () => {

  return (
    <div className="font-['Parkinsans'] m-0 p-0 bg-[#0a0a0a] text-white">
      <header className="flex justify-between items-center fixed w-full h-[75px] top-2.5 z-50 sm:h-[60px] sm:px-4">
        <img src={logo} alt="Logo" className="w-[185px] h-[75px] sm:w-[120px] sm:h-[48px]" />
        <ul className="flex gap-8 sm:hidden">
          <li className="cursor-pointer text-white no-underline">Home</li>
          <li className="cursor-pointer text-white no-underline">Trading</li>
          <li className="cursor-pointer text-white no-underline">Ecosystem</li>
          <li className="cursor-pointer text-white no-underline">Learn & Grow</li>
          <li className="cursor-pointer text-white no-underline">Company</li>
        </ul>
        <div className="flex gap-2.5">
          <button className="px-5 py-2.5 rounded-md border-none cursor-pointer bg-[#387AFF] text-white w-[229px] h-[52px] sm:w-[140px] sm:h-[40px] sm:text-sm">Open Live Account</button>
          <button className="px-5 py-2.5 rounded-md border border-white cursor-pointer bg-transparent text-white w-[186px] h-[52px] sm:w-[120px] sm:h-[40px] sm:text-sm">Try Free Demo</button>
        </div>
      </header>

      <section className="flex flex-col md:flex-row items-center justify-between pt-[150px] pb-[100px] px-[100px] sm:px-4 bg-[#031147] min-h-[80vh]">
        <div className="flex-1 pl-16 sm:pL-0">
          <h1 className="text-8xl lg:text-6xl sm:text-4xl font-semibold mb-5 leading-[95%]">Trade Secure<br /> With Finsai.</h1>
          <p className="text-xl leading-relaxed mb-10">
            Experience Lightning-Fast Execution, Powerful Tools, and Verified Trader Support In A Regulated Ecosystem.
          </p>
          <div className="flex gap-5">
            <button className="px-7.5 py-3.75 rounded-md border-none cursor-pointer bg-[#a100ff] text-white text-lg">Open Live Account</button>
            <button className="px-7.5 py-3.75 rounded-md border-2 border-[#a100ff] cursor-pointer bg-transparent text-[#a100ff] text-lg">Try Free Demo</button>
          </div>
        </div>
        <div className="flex-1 text-center">
          <img src={laptop} alt="Finsai Laptop" className="w-[600px] sm:w-full h-auto" />
        </div>
      </section>

      <section className="flex lg:flex-row sm:flex-col sm:overflow-x-auto w-full h-auto relative bg-[#031147] p-2.5 px-10 sm:px-4">
        <div className="flex bg-[rgba(255,255,255,0.3)] backdrop-blur-[10px] pt-5 mr-5 w-[357px] h-[85px] rounded-md sm:mr-2.5 sm:min-w-[300px]">
          <img src={license} alt="licensed" className="w-[45px] h-[45px] ml-5 flex" />
          <h3 className="pt-2.5 text-lg mb-2 ml-12.5 text-white font-medium leading-tight">Regulated & Licensed</h3>
        </div>
        <div className="flex bg-[rgba(255,255,255,0.3)] backdrop-blur-[10px] pt-5 mr-5 w-[357px] h-[85px] rounded-md sm:mr-2.5 sm:min-w-[300px]">
          <img src={atm} alt="atm" className="w-[45px] h-[45px] ml-5 flex" />
          <h3 className="pt-2.5 text-lg mb-2 ml-12.5 text-white font-medium leading-tight">Ultra-Fast Withdrawal</h3>
        </div>
        <div className="flex bg-[rgba(255,255,255,0.3)] backdrop-blur-[10px] pt-5 mr-5 w-[357px] h-[85px] rounded-md sm:mr-2.5 sm:min-w-[300px]">
          <img src={phone} alt="phone" className="w-[45px] h-[45px] ml-5 flex" />
          <h3 className="pt-2.5 text-lg mb-2 ml-12.5 text-white font-medium leading-tight">24/7 Support</h3>
        </div>
        <div className="flex bg-[rgba(255,255,255,0.3)] backdrop-blur-[10px] pt-5 w-[357px] h-[85px] rounded-md sm:min-w-[300px]">
          <img src={safebox} alt="safe" className="w-[45px] h-[45px] ml-5 flex" />
          <h3 className="pt-2.5 text-lg mb-2 ml-12.5 text-white font-medium leading-tight">Secure Deposits</h3>
        </div>
      </section>

      <section className="flex items-center justify-between p-[140px_60px] bg-[#031147] relative overflow-hidden min-h-[70vh]">
        <div className="absolute top-[20%] right-[10%] w-[150px] h-[150px] bg-radial-gradient(circle, rgba(138,43,226,0.3), rgba(138,43,226,0.1)) rounded-full z-10 animate-pulse"></div>
        <div className="flex-1 flex justify-center items-center relative z-20">
          <div className="relative w-[335px] h-[700px]">
            <img
              src={phoneScreen}
              className="w-full h-full object-cover rounded-[40px]"
            />
            <div className="absolute top-2.5 left-2.5 right-2.5 bottom-2.5 flex flex-col box-border z-30 bg-cover bg-center bg-[url('/screenblur.png')]">
              <img src={screenblur} className="right-2.5 pt-1.25" />
            </div>
            <div className="absolute top-[140px] left-2.5 right-2.5 bottom-2.5 flex flex-col box-border z-30 bg-cover bg-center bg-[url('/screenblur.png')]">
              <div className="bg-[rgba(255,255,255,0.3)] backdrop-blur-[10px] w-[357px] h-[63px] rounded-lg p-4 justify-center text-center text-base text-white font-normal mb-4 ml-8">Ultra-fast Withdrawal</div>
              <div className="bg-[rgba(255,255,255,0.3)] backdrop-blur-[10px] w-[357px] h-[63px] rounded-lg p-4 text-center text-base text-white font-normal mb-4 ml-16">Secure Deposits</div>
              <div className="bg-[rgba(255,255,255,0.3)] backdrop-blur-[10px] w-[357px] h-[63px] rounded-lg p-4 text-center text-base ml-24 text-white font-medium mb-4">Regulated by Multiple Authorities</div>
              <div className="bg-[rgba(255,255,255,0.3)] backdrop-blur-[10px] w-[357px] h-[63px] rounded-lg p-4 text-center text-base text-white font-medium mb-4 ml-32 leading-tight">10,000+ Assets</div>
              <div className="bg-[rgba(255,255,255,0.3)] backdrop-blur-[10px] w-[357px] h-[63px] rounded-lg p-4 text-center text-base text-white font-medium mb-4 ml-16 leading-tight">24/7 Expert Support</div>
              <div className="bg-[rgba(255,255,255,0.3)] backdrop-blur-[10px] w-[357px] h-[63px] rounded-lg p-4 text-center text-base text-white font-medium mb-4 ml-8 leading-tight">Transparent Pricing with No Hidden Fees</div>
            </div>
          </div>
        </div>

        <div className="flex-1 pl-12.5 flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-5 text-white leading-tight">Why Choose<br />Finsai Trade</h2>
          <p className="text-lg text-[rgba(255,255,255,0.8)] leading-relaxed mb-10">
            At Finsai Trade, we bridge traditional finance with cutting-edge trading technology. Whether you're a beginner or seasoned trader, our platform offers the perfect mix of reliability, innovation, and growth opportunity.
          </p>
          <button className="bg-[#387AFF] text-white border-none px-8 py-2 rounded-md w-[154px] h-[52px] text-base cursor-pointer font-semibold">Learn More</button>
        </div>
      </section>

      <section className="flex justify-between p-[100px_140px] bg-[#031147] relative overflow-hidden">
        <div className="flex-1 z-10">
          <h1 className="text-[52px] font-extrabold leading-tight mb-5">
            Powerful Platforms<br />For Every Trader
          </h1>
          <p className="text-lg opacity-80 max-w-[480px] leading-relaxed mb-[30px]">
            Trade Seamlessly On The Go Or From Your Desktop With Our Cutting-Edge Platforms.
          </p>
          <button className="bg-[#387AFF] text-white border-none px-8 py-2 rounded-md text-base cursor-pointer font-semibold">Learn More</button>
        </div>
        <div className="flex-[1.2] flex flex-col gap-[30px] pl-[60px]">
          <div className="p-[25px] bg-[rgba(255,255,255,0.08)] rounded-[12px] backdrop-blur-[12px] border border-[rgba(255,255,255,0.15)] w-[535px] h-[130px] flex items-center text-white overflow-hidden relative">
            <div className="w-[80px] h-[80px] rounded-full bg-[rgba(60,0,120,0.8)] flex justify-center items-center mr-5 z-10">
              <img src={metatrader} alt="MetaTrader 5 Icon" className="w-10 h-10 filter brightness-0 invert" />
            </div>
            <div className="z-10">
              <h3 className="text-xl m-0 font-bold">MetaTrader 5</h3>
              <p className="opacity-70 mt-2 mb-0 text-base">Pro-grade tools for advanced traders</p>
            </div>
          </div>
          <div className="p-[25px] bg-[rgba(255,255,255,0.08)] rounded-[12px] backdrop-blur-[12px] border border-[rgba(255,255,255,0.15)] w-[535px] h-[130px] flex items-center text-white overflow-hidden relative">
            <div className="w-[80px] h-[80px] rounded-full bg-[#CC313D] flex justify-center items-center mr-5 z-10">
              <img src={webtrader} alt="WebTrader Icon" className="w-10 h-10 filter brightness-0 invert" />
            </div>
            <div className="z-10">
              <h3 className="text-xl m-0 font-bold">Finsai WebTrader</h3>
              <p className="opacity-70 mt-2 mb-0 text-base">Browser-based, no downloads needed</p>
            </div>
          </div>
          <div className="p-[25px] bg-[rgba(255,255,255,0.08)] rounded-[12px] backdrop-blur-[12px] border border-[rgba(255,255,255,0.15)] w-[535px] h-[130px] flex items-center text-white overflow-hidden relative">
            <div className="w-[80px] h-[80px] rounded-full bg-[#5A28B0] flex justify-center items-center mr-5 z-10">
              <img src={mobileapp} alt="Mobile App Icon" className="w-10 h-10 filter brightness-0 invert" />
            </div>
            <div className="z-10">
              <h3 className="text-xl m-0 font-bold">Mobile App (Coming Soon)</h3>
              <p className="opacity-70 mt-2 mb-0 text-base">Fast, secure, and intuitive</p>
            </div>
          </div>
        </div>
      </section>

      <section className="p-[100px_60px] bg-[#031147] text-white relative overflow-hidden">
        <div className="text-center mb-[50px]">
          <h1 className="text-[48px] font-extrabold mb-2.5">
            Choose The Right<br />Account For You
          </h1>
          <div className="w-[60px] h-[2px] bg-[rgba(255,255,255,0.4)] mx-auto my-[10px_0_15px]"></div>
          <p className="opacity-75 text-base">
            Start Your Journey With An Account Tailored To Your Goals
          </p>
        </div>
        <div className="w-full rounded-[12px] overflow-hidden">
          <table className="w-full border-collapse text-white text-[15px]">
            <thead>
              <tr className="bg-[rgba(255,255,255,0.08)] backdrop-blur-[10px]">
                {[
                  "Account Type",
                  "Minimum Deposit",
                  "Spreads from",
                  "Leverage",
                  "Commission",
                  "Execution",
                  "Best For"
                ].map((head, index) => (
                  <th key={index} className="text-left p-[18px_20px] font-semibold border-b border-[rgba(255,255,255,0.12)]">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="bg-[rgba(255,255,255,0.05)] border-b border-[rgba(255,255,255,0.12)] backdrop-blur-[12px]">
                <td className="p-5">Smart Choice</td>
                <td className="p-5">$100</td>
                <td className="p-5">From 1.4 pips</td>
                <td className="p-5">Up to<br />1:500</td>
                <td className="p-5">No</td>
                <td className="p-5">Instant</td>
                <td className="p-5">Beginners & Casual Traders</td>
              </tr>
              <tr className="bg-[rgba(255,255,255,0.05)] border-b border-[rgba(255,255,255,0.12)] backdrop-blur-[12px]">
                <td className="p-5">Smart Pro</td>
                <td className="p-5">$1000</td>
                <td className="p-5">From 1.0 pips</td>
                <td className="p-5">Up to<br />1:1000</td>
                <td className="p-5">No</td>
                <td className="p-5">Market</td>
                <td className="p-5">Intermediate Traders</td>
              </tr>
              <tr className="bg-[rgba(255,255,255,0.05)] border-b border-[rgba(255,255,255,0.12)] backdrop-blur-[12px]">
                <td className="p-5">Smart ECN</td>
                <td className="p-5">$5000</td>
                <td className="p-5">From 0.0 pips</td>
                <td className="p-5">Up to<br />1:1000</td>
                <td className="p-5">$6/lot</td>
                <td className="p-5">Market</td>
                <td className="p-5">Professionals & Scalpers</td>
              </tr>
              <tr className="bg-[rgba(255,255,255,0.05)] backdrop-blur-[12px]">
                <td className="p-5">Smart Elite</td>
                <td className="p-5">On Request Only</td>
                <td className="p-5">Customizable</td>
                <td className="p-5">Customizable<br />1:1000</td>
                <td className="p-5">Custom</td>
                <td className="p-5">Market</td>
                <td className="p-5">Professionals</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-5 opacity-60 text-sm">
          Smart Elite is available only on request for traders.<br /> Reach out to our support for access.
        </p>
      </section>    
      

      <section className="w-full bg-[#031147] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
            Recognized For Excellence
          </h2>
          <div className="w-24 h-1 bg-cyan-500 mx-auto mb-16"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">

            <div className="text-center group">
              <div className="mb-8 relative">
                <div className="w-full h-full  flex items-center justify-center">
                  <img src={starBadge} alt="starBadge" className="w-[75px] h-[62px]" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                World Forex Award 2025
              </h3>
              <p className="text-cyan-400 text-lg font-medium">
                Best IB Program
              </p>
            </div>

            <div className="text-center group">
              <div className="mb-8 relative">
                <div className="w-full h-full  flex items-center justify-center">
                  <img src={starBadge} alt="starBadge" className="w-[75px] h-[62px]" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                World Financial Award 2025
              </h3>
              <p className="text-cyan-400 text-lg font-medium">
                Trusted Financial Services
              </p>
            </div>

            <div className="text-center group">
              <div className="mb-8 relative">
                <div className="w-full h-full  flex items-center justify-center">
                  <img src={starBadge} alt="starBadge" className="w-[75px] h-[62px]" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Iconic Finance Expo 2023
              </h3>
              <p className="text-cyan-400 text-lg font-medium">
                Innovative Startup In Finance
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FinsaiHomepage;