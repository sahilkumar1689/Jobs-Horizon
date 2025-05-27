import React from "react";

function Footer() {
  // Company logos for the bottom section:
  const companies = [
    { id: 1, name: "Dell", logo: "/AdminAssets/CompanyLogo/Acer.png" },
    { id: 2, name: "Panasonic", logo: "/AdminAssets/CompanyLogo/Casio.png" },
    { id: 3, name: "Vaio", logo: "/AdminAssets/CompanyLogo/Dell.png" },
    { id: 4, name: "Sony", logo: "/AdminAssets/CompanyLogo/Microsoft.png" },
    { id: 5, name: "Microsoft", logo: "/AdminAssets/CompanyLogo/Nokia.png" },
    { id: 6, name: "Sony", logo: "/AdminAssets/CompanyLogo/panasonic.png" },
    { id: 7, name: "Acer", logo: "/AdminAssets/CompanyLogo/risor.png" },
    { id: 8, name: "Nokia", logo: "/AdminAssets/CompanyLogo/sony.png" },
    { id: 9, name: "Asus", logo: "/AdminAssets/CompanyLogo/Acer.png" },
    { id: 10, name: "Casio", logo: "/AdminAssets/CompanyLogo/Microsoft.png" },
  ];
  return (
    <>
      {/* Companies list: */}
      <div className="companies-list">
        {companies.map((company) => (
          <div key={company.id} className="company-item">
            <img
              src={company.logo}
              alt={`${company.name} logo`}
              className="company-logo"
            />
          </div>
        ))}
      </div>
      <hr style={{ margin: "50px 0px" }} />
      <div className="footerBottomContainer">
        <p>
          © 2022 - <span style={{ color: "blue" }}>JobBox</span> Dashboard Made
          by <span style={{ color: "blue" }}>Sahil & Gurwinder</span>
        </p>
        <ul>
          <li>About</li>
          <li>Carrier</li>
          <li>Policy</li>
          <li>Contact</li>
        </ul>
      </div>
    </>
  );
}

export default Footer;
