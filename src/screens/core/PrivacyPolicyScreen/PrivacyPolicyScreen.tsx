import React, { useMemo } from "react";
import { ScrollView, Text } from "react-native";
import { useTheme } from "src/context/ThemeContext";
import { createStyles } from "./styles";
import Spacer from "src/components/common/Spacer/Spacer";

const PrivacyPolicyScreen = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>PRIVACY POLICY</Text>

      <Text style={styles.paragraph}>
        MS Logger Inc. and its affiliates (MS Logger,” “we,” “our,” and/or “us”) values
        the privacy of individuals who use our application, websites, and related services
        (collectively, our “Services”). This privacy policy (the “Privacy Policy”) explains
        how we collect, use, and share information from users of our Services (“Users”) to
        provide a platform for the storage and sharing of medical information. By using our
        Services, you agree to the collection, use, disclosure, and procedures this Privacy
        Policy describes. Beyond the Privacy Policy, your use of our Services is also subject
        to our Terms of Service https://mslogger.com/terms
      </Text>

      <Text style={styles.sectionTitle}>Information We Collect</Text>
      <Text style={styles.paragraph}>
        We may collect a variety of information from or about you or your devices from various
        sources, as described below.
      </Text>

      <Text style={styles.subTitle}>A. Information You Provide to Us.</Text>
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>Registration and Profile Information. </Text>
        When you sign up for an account, we ask you for your name, email address, and phone number.
      </Text>

      <Text style={styles.paragraph}>
        <Text style={styles.bold}>Communications. </Text>
        If you contact us directly, we may receive additional information about you. For example,
        when you contact our customer support team, we will receive your name, email address, phone number,
        the contents of a message or attachments that you may send to us, and other information you choose
        to provide. When we send you emails, we may track whether you open them to learn how to deliver a
        better customer experience and improve our Services.
      </Text>

      <Text style={styles.paragraph}>
        <Text style={styles.bold}>Personal Information. </Text>
        In order to provide its service, MS Logger collects personal information that you provide and upload.
        The personal information you provide may include: Name, Country, Phone number, Email, Education, Experience,
        Positions.
      </Text>

      <Text style={styles.paragraph}>
        <Text style={styles.bold}>Media. </Text>
        If you grant our mobile application permission to use your camera or microphone, you may upload media to the Services,
        such as photographs, videos, or audio.
      </Text>

      <Text style={styles.paragraph}>
        <Text style={styles.bold}>Payment Information. </Text>
        We work with third party partners to process payment information. In order to process payments, we or our partner
        may collect payment card information.
      </Text>

      <Text style={styles.subTitle}>B. Information We Collect When You Use Our Services.</Text>
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>Location Information. </Text>
        We may infer your general location information, for example by using your internet protocol (IP) address.
      </Text>

      <Text style={styles.paragraph}>
        <Text style={styles.bold}>Device Information. </Text>
        We receive information about the device and software you use to access our Services in order to improve the
        customer experience, including IP address, web browser type, operating system version, phone carrier and
        manufacturer, application installations, device identifiers, mobile advertising identifiers, and push
        notification tokens.
      </Text>

      <Text style={styles.paragraph}>
        <Text style={styles.bold}>Usage Information. </Text>
        To help us understand how you use our Services and to help us improve them, we automatically receive information
        about your interactions with our Services, like the pages or other content you view, the searches you conduct,
        people you share information with, and the dates and times of your visits.
      </Text>

      <Text style={styles.paragraph}>
        <Text style={styles.bold}>Information from Cookies and Similar Technologies. </Text>
        We and third-party partners collect information using cookies, pixel tags, or similar technologies.
      </Text>

      <Text style={styles.subTitle}>C. Information We Receive from Third Parties.</Text>
      <Text style={styles.paragraph}>
        We may receive additional information about you, such as demographic data, from third parties such as data or
        marketing partners and combine it with other information we have about you.
      </Text>

      <Text style={styles.sectionTitle}>How We Use the Information We Collect</Text>
      <Text style={styles.paragraph}>
        We use the information we collect to provide, maintain, improve, and enhance our Services; personalize your
        experience; understand and analyze usage; communicate with you; for marketing and advertising; facilitate
        transactions and payments; find and prevent fraud; ensure compliance; and for other purposes disclosed at the
        time of collection.
      </Text>

      <Text style={styles.sectionTitle}>How We Share the Information We Collect</Text>
      <Text style={styles.paragraph}>
        Sharing with Designees, including Medical Professionals; Patient information; Analytics Partners; Advertising
        Partners; As Required by Law; Merger, Sale, or Other Asset Transfers; Consent.
      </Text>

      <Text style={styles.sectionTitle}>Your Choices</Text>
      <Text style={styles.paragraph}>
        You can unsubscribe from promotional emails. Even if you opt-out, you will continue to receive administrative
        messages from us.
      </Text>

      <Text style={styles.sectionTitle}>Third Parties</Text>
      <Text style={styles.paragraph}>
        Our Services may contain links to other websites, products, or services that we do not own or operate.
      </Text>

      <Text style={styles.sectionTitle}>Security and HIPAA compliance</Text>
      <Text style={styles.paragraph}>
        Our platform is compliant with HIPAA regulations, hosted on HIPAA-compliant AWS servers, and we use physical
        and electronic safeguards to protect information. However, no guarantees can be made regarding security.
      </Text>

      <Text style={styles.sectionTitle}>Children’s Privacy</Text>
      <Text style={styles.paragraph}>
        We do not knowingly collect, maintain, or use personal information from children under 13 years of age.
      </Text>

      <Text style={styles.sectionTitle}>International Visitors</Text>
      <Text style={styles.paragraph}>
        Our Services are hosted in the U.S. If you use the Services from the EU or elsewhere, you consent to transfer,
        storage, and processing of your information in the U.S.
      </Text>

      <Text style={styles.sectionTitle}>Update Your Information or Pose a Question</Text>
      <Text style={styles.paragraph}>
        You can update your account info or close your account through your account settings. For questions, email
        <Text style={styles.link}> info@mslogger.com</Text>.
      </Text>

      <Text style={styles.sectionTitle}>Changes to this Privacy Policy</Text>
      <Text style={styles.paragraph}>
        We will post any adjustments to the Privacy Policy on this page, and they will be effective when posted.
      </Text>

      <Text style={styles.sectionTitle}>Contact Information</Text>
      <Text style={styles.paragraph}>
        If you have questions, comments, or concerns, please email us at<Text style={styles.link}> info@mslogger.com</Text>.</Text>

      <Spacer height={30} />

    </ScrollView>
  );
};

export default PrivacyPolicyScreen;
