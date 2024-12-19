import Link from "next/link";
import styled from "styled-components";
import Center from "@/components/Center";
// import {FaFacebook} from "../public/facebook.svg"
// import {FaInstagram} from "../public/instagram.svg"
// import {FaTwitter} from "../public/twitter.svg"
const StyledFooter = styled.footer`
  background-color: #222;
  color: #fff;
  padding: 40px 0;
  margin-top: 50px;
`;

const FooterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  @media screen and (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: center;
  @media screen and (min-width: 768px) {
    text-align: left;
  }
`;

const FooterLink = styled(Link)`
  color: #aaa;
  text-decoration: none;
  &:hover {
    color: #fff;
  }
`;

const SocialMedia = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

const SocialIcon = styled.a`
  color: #fff;
  font-size: 24px;
  transition: color 0.3s;
  &:hover {
    color: #f39c12;  // Hover color for icons
  }
`;

const FooterCopyRight = styled.div`
  text-align: center;
  margin-top: 30px;
  font-size: 14px;
  color: #aaa;
`;

export default function Footer() {
  return (
    <StyledFooter>
      <Center>
        <FooterWrapper>
          <FooterLinks>
            <FooterLink href="/account">My Account</FooterLink>
            <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
          </FooterLinks>
          <SocialMedia>
            <SocialIcon href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              {/* <img src={FaFacebook} alt="Facebook" /> */}
            </SocialIcon>
            <SocialIcon href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              {/* <FaInstagram /> */}
            </SocialIcon>
            <SocialIcon href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              {/* <FaTwitter /> */}
            </SocialIcon>
          </SocialMedia>
        </FooterWrapper>
        <FooterCopyRight>&copy; {new Date().getFullYear()} Ecommerce. All rights reserved.</FooterCopyRight>
      </Center>
    </StyledFooter>
  );
}
