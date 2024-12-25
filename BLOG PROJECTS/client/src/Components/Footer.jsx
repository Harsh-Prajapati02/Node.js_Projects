import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
    return (
        <footer className="bg-body-tertiary text-center text-lg-start">
            <div
                className="text-center p-3"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }} // Changed to object format
            >
                © {new Date().getFullYear()} Copyright:
                <a className="text-body" href="https://mdbootstrap.com/">
                    MDBootstrap.com
                </a>
            </div>
        </footer>
    );
};

export default Footer;
