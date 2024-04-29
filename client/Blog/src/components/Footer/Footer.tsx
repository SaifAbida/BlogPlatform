import "./Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className="footer">
      <p>If you have any questions please contact us through the email :</p>
      <a href="">contact@socialconnect.com</a>
      <p>Copyright ⓒ {year}</p>
    </div>
  );
};

export default Footer;
