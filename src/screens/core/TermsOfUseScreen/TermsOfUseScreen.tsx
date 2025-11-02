import React, { useMemo } from "react";
import { ScrollView, Text } from "react-native";
import { useTheme } from "src/context/ThemeContext";
import { createStyles } from "./styles";
import Spacer from "src/components/common/Spacer/Spacer";

const TermsOfUseScreen = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        SOFTWARE LICENSE AGREEMENT AND TERMS AND CONIDTIONS
      </Text>

      <Text style={styles.paragraph}>
        Please read this end user software license agreement and terms and conditions ("License") carefully before clicking the "accept" button or downloading or using the MS Logger application ("Application") accompanying this license. By clicking the "accept" button or downloading or using the application, you are entering into and agreeing to be bound by this license and the included terms and conditions.
      </Text>

      <Text style={styles.paragraph}>
        If you do not agree to the terms of this license, do not click the "accept" button or download or use the application.
      </Text>

      {/* Section 1 */}
      <Text style={styles.sectionTitle}>1. General.</Text>
      <Text style={styles.paragraph}>
        The Application is licensed, not sold, to you (“You”) by MS Logger, Inc. (“Company”) for use strictly in accordance with the terms and conditions of this License, and any "usage rules" established by any other third party usage rules or terms of use with respect, without limitation, to any Medical Information (as such term is defined below) (“Usage Rules”), which are incorporated herein by this reference. The term "Application" shall refer to and consist of the following: (i) the website and mobile software application accompanying this License, including, without limitation, any software code, scripts, interfaces, graphics, displays, text, documentation and other components; (ii) any updates, modifications or enhancements to the items listed in subsection (i); and (iii) any specific website the Application directs you to via any browser located on a computer (“Computer”) or a mobile device (“Mobile Device”), provided, however, that this License only applies to the entering of medical data, that includes, but is not limited to, patients information, procedure details, and diagnostic images (collectively, “Medical Information”).
      </Text>

      {/* Section 2 */}
      <Text style={styles.sectionTitle}>2. License Grant and Restrictions on Use.</Text>

      <Text style={styles.paragraph}>
        <Text style={styles.subTitle}>2.1 License Grant. </Text>
        <Text style={styles.paragraph}>
          Company grants You a revocable, non-exclusive, non-transferable, limited right to use the website Application on your Computer, and to install and use the Application on a Mobile Device owned and controlled by You, and to access and use the Application on such Computer or Mobile Device strictly in accordance with the terms and conditions of this License, the Usage Rules and any service agreement associated with your Computer or Mobile Device (collectively "Related Agreements").
        </Text>
      </Text>

      <Text style={styles.paragraph}>
        <Text style={styles.subTitle}>2.2 Restrictions on Use. </Text>
        <Text style={styles.paragraph}>
          You shall use the Application strictly in accordance with the terms of the Related Agreements and shall not: (a) decompile, reverse engineer, disassemble, attempt to derive the source code of, or decrypt the Application; (b) make any modification, adaptation, improvement, enhancement, translation or derivative work from the Application; (c) violate any applicable laws, rules or regulations in connection with Your access or use of the Application; (d) remove, alter or obscure any proprietary notice (including any notice of copyright or trademark) of Company or its affiliates, partners, suppliers or the licensors of the Application; (e) use the Application for any revenue generating endeavor, commercial enterprise, or other purpose for which it is not designed or intended; (f) make the Application available over a network or other environment permitting access or use by multiple Computers, Mobile Devices or users at the same time; (i) use the Application for creating a product, service or software that is, directly or indirectly, competitive with or in any way a substitute for any services, product or software offered by Company; (j) use the Application to send automated queries to any website or to send any unsolicited commercial e-mail; or (k) use any proprietary information or interfaces of Company or other intellectual property of Company in the design, development, manufacture, licensing or distribution of any applications, accessories or devices for use with the Application.
        </Text>
      </Text>

      {/* Section 3 */}
      <Text style={styles.sectionTitle}>3. Intellectual Property Rights.</Text>

      <Text style={styles.paragraph}>
        <Text style={styles.subTitle}>3.1 Rights to Application. </Text>
        <Text style={styles.paragraph}>
          You acknowledge and agree that the Application and all copyrights, patents, trademarks, trade secrets and other intellectual property rights associated therewith are, and shall remain, the property of Company. Furthermore, You acknowledge and agree that the source and object code of the Applications and the format, directories, queries, algorithms, structure and organization of the Application are the intellectual property and proprietary and confidential information of Company and its affiliates, licensors and suppliers. Except as expressly stated in this License, You are not granted any intellectual property rights in or to the Application by implication, estoppel or other legal theory, and all rights in and to the Application not expressly granted in this License are hereby reserved and retained by Company.
        </Text>
      </Text>

      <Text style={styles.paragraph}>
        <Text style={styles.subTitle}>3.2 Third Party Software. </Text>
        <Text style={styles.paragraph}>
          The Application may utilize or include third party software that is subject to open source and third party license terms ("Third Party Software"). You acknowledge and agree that Your right to use such Third Party Software as part of the Application is subject to and governed by the terms and conditions of the open source or third party license applicable to such Third Party Software, including, without limitation, any applicable acknowledgements, license terms and disclaimers contained therein. In the event of a conflict between the terms of this License and the terms of such open source or third party licenses, the terms of the open source or third party licenses shall control with regard to Your use of the relevant Third Party Software. In no event, shall the Application or components thereof be deemed to be "open source" or "publically available" software.
        </Text>
      </Text>

      <Text style={styles.paragraph}>
        <Text style={styles.subTitle}>3.3 Company’s Marks. </Text>
        <Text style={styles.paragraph}>
          You are not authorized to use the Company trademarks in any advertising, publicity or in any other commercial manner without the prior written consent of Company, which may be withheld for any or no reason.
        </Text>
      </Text>

      {/* Section 4 */}
      <Text style={styles.sectionTitle}>4. Restriction on Transfer.</Text>
      <Text style={styles.paragraph}>
        You may not rent, lease, lend, sublicense or transfer the Application, this License or any of the rights granted hereunder. Any attempted transfer in contravention of this provision shall be null and void and of no force or effect.
      </Text>

      {/* Section 5 */}
      <Text style={styles.sectionTitle}>5. Use of Information.</Text>
      <Text style={styles.paragraph}>
        <Text style={styles.subTitle}>5.1 Protected Health Information. </Text>
        <Text style={styles.paragraph}>
          In no event shall MS Logger disclose, use, or share any Protected Health Information (“PHI”) as defined in the Health Insurance Portability and Accountability Act of 1996, as codified at 42 U.S.C. §1320d (“HIPAA”), and further in the Health Information Technology Act of 2009, as codified at 42 U.S.C.A. prec. § 17901 (“HITECH Act”). The Company will comply with (i) for users headquartered in the U.S. or otherwise subject to U.S. law, both HIPAA and the HITECH Act, or (ii) for other users, equivalent protected health information laws, rules and regulations to which they are subject in their jurisdiction, in connection with their respective performance under this Agreement.
        </Text>
      </Text>

      <Text style={styles.paragraph}>
        <Text style={styles.subTitle}>5.2 Consent to Use Other Information. </Text>
        <Text style={styles.paragraph}>
          You hereby authorize and consent to the collection, storage and use, by Company and its affiliates, partners and agents, of any information and data related to or derived from Your use of the Application ("Information") as permitted by applicable law. Without limiting the generality of the foregoing, the Information shall include, without limitation, the following types of information and data, in an aggregate (not user level) form: Your search requests, search results, patterns, and other data and suggestions based on user actions. The Information will be treated as being non-confidential and nonproprietary, and Company assumes no obligation to protect confidential or proprietary information from disclosure and will be free to reproduce, use, and distribute the Information to others without restriction. The Company will also be free to use any ideas, concepts, know-how or techniques contained in the Information for any purpose whatsoever including, without limitation, developing, manufacturing and marketing products and services incorporating such Information. The Company will (a) be free to use and share with third parties personally non-identifiable information for the purpose of research, user-tailored commercial use, education, and any other purposes and (b) only use personally identifiable information as permitted by You.
        </Text>
      </Text>

      <Text style={styles.paragraph}>
        <Text style={styles.subTitle}>5.3 Privacy Policy. </Text>
        <Text style={styles.paragraph}>
          You represent that You shall comply with the terms and conditions of the Company Privacy Policy, which sets forth and describes the practices of Company with respect to the collection, use and disclosure of Information in connection with Your use of the Application. Company reserves the right to change the provisions of its Privacy Policy at any time and from time to time at its sole discretion. Company will post any changes to its Privacy Policy at the web address set forth in the preamble to this License. Your use of the Application following the posting of such changes to the Privacy Policy will constitute Your acceptance of any such changes.
        </Text>
      </Text>

      {/* Section 6 */}
      <Text style={styles.sectionTitle}>6. Third Party Content and Services.</Text>

      <Text style={styles.paragraph}>
        <Text style={styles.subTitle}>6.1 General. </Text>
        <Text style={styles.paragraph}>
          You acknowledge that the Application permits access to products, services, web-sites, advertisements, promotions, recommendations, advice, information, and materials created and provided by advertisers, publishers, content partners, marketing agents, vendors and other third parties ("Third Party Content and Services").
        </Text>
      </Text>

      <Text style={styles.paragraph}>
        <Text style={styles.subTitle}>6.2 Disclaimer. </Text>
        <Text style={styles.paragraph}>
          You acknowledge that Company does not investigate, monitor, represent or endorse the Third Party Content and Services (including any third party websites available through the Application). Furthermore, Your access to and use of the Third Party Content and Services is at Your sole discretion and risk, and Company and its affiliates, partners, suppliers and licensors shall have no liability to You arising out of or in connection with Your access to and use of the Third Party Content and Services. Company hereby disclaims any representation, warranty or guaranty regarding the Third Party Content and Services, whether express, implied or statutory, including, without limitation, the implied warranties of merchantability or fitness for a particular purpose, and any representation, warranty or guaranty regarding the availability, quality, reliability, features, appropriates, accuracy, completeness, or legality of the Third Party Content and Services.
        </Text>
      </Text>

      <Text style={styles.paragraph}>
        <Text style={styles.subTitle}>6.3 Third Party Terms of Service. </Text>
        <Text style={styles.paragraph}>
          You acknowledge and agree that Your access to and use of the Third Party Content and Services and any correspondence or business dealings between You and any third party located using the Application are governed by and require Your acceptance of the terms of service of such third party, including, without limitation, any terms, privacy policies, conditions, representations, warranties or disclaimers contained therein. Furthermore, You acknowledge and agree that the Third Party Content and Services and any related third party terms of service are subject to change by the applicable third party at its sole discretion and without any notice. You assume all risks arising out of or resulting from your transaction of business over the Internet and with any third party, and you agree that Company and its affiliates, partners, suppliers and licensors are not responsible or liable for any loss or result of the presence of information about or links to such advertisers or service providers. Furthermore, You acknowledge and agree that You are not being granted a license to (i) the Third Party Content and Services; (ii) any products, services, processes or technology described in or offered by the Third Party Content and Services; or (iii) any copyright, trademark, patent or other intellectual property right in the Third Party Content or Services or any products, services, processes or technology described or offered therein.
        </Text>
      </Text>

      <Text style={styles.paragraph}>
        <Text style={styles.subTitle}>6.4 Endorsements. </Text>
        <Text style={styles.paragraph}>
          You acknowledge and agree that the provision of access to any Third Party Content and Service shall not constitute or imply any endorsement by Company or its affiliates of such Third Party Content and Services. Company reserves the right to restrict or deny access to any Third Party Content and Services otherwise accessible through the Application, although Company has no obligation to restrict or deny access even if requested by You.
        </Text>
      </Text>

      <Text style={styles.paragraph}>
        <Text style={styles.subTitle}>6.5 Inappropriate Materials. </Text>
        <Text style={styles.paragraph}>
          You understand that by accessing and using the Third Party Content and Services, You may encounter information, materials and subject matter (i) that You or others may deem offensive, indecent, or objectionable; (ii) which may or may not be identified as having explicit language, and (iii) that automatically and unintentionally appears in search results, as a link or reference to objectionable material. Notwithstanding the foregoing, You agree to use the Third Party Content and Services at Your sole risk and that Company and its affiliates, partners, suppliers and licensors shall have no liability to You for information, material or subject matter that is found to be offensive, indecent, or objectionable.
        </Text>
      </Text>

      <Text style={styles.paragraph}>
        <Text style={styles.subTitle}>6.6 Use of Third Party Content and Services. </Text>
        <Text style={styles.paragraph}>
          You agree that the Third Party Content and Services contain proprietary information and material that is owned by Company and its affiliates, partners, suppliers and licensors and is protected by applicable intellectual property and other laws, including, without limitation, pursuant to copyright, and that You will not use such proprietary information or materials in any way whatsoever except for permitted use of the Third Party Content and Services. No portion of the Third Party Content and Services may be reproduced in any form or by any means. You agree not to modify, rent, lease, loan, sell, distribute, or create derivative works based on the Third Party Content and Services, in any manner, and You shall not exploit the Third Party Content and Services in any unauthorized way whatsoever, including, without limitation, by trespass or burdening network capacity. You agree that You will not use any Third Party Content and Services in a manner that would infringe or violate the rights of any other party, and that Company is not in any way responsible for any such use by You.
        </Text>
      </Text>

      {/* Section 7 */}
      <Text style={styles.sectionTitle}>7. Term and Termination.</Text>

      <Text style={styles.paragraph}>
        <Text style={styles.subTitle}>7.1 Term. </Text>
        <Text style={styles.paragraph}>
          This License shall be effective until terminated.
        </Text>
      </Text>

      <Text style={styles.paragraph}>
        <Text style={styles.subTitle}>7.2 Termination. </Text>
        <Text style={styles.paragraph}>
          Company may, in its sole and absolute discretion, at any time and for any or no reason, suspend or terminate this License and the rights afforded to You hereunder with or without prior notice. Furthermore, if You fail to comply with any terms and conditions of this License, then this License and any rights afforded to You hereunder shall terminate automatically, without any notice or other action by Company. Upon the termination of this License, You shall cease all use of the Application and uninstall the Application.
        </Text>
      </Text>

      {/* Section 8 */}
      <Text style={styles.sectionTitle}>8. Disclaimer of Warranties.</Text>
      <Text style={styles.paragraph}>
        YOU ACKNOWLEDGE AND AGREE THAT THE APPLICATION IS PROVIDED ON AN "AS IS' AND "AS AVAILABLE" BASIS, AND THAT YOUR USE OF OR RELIANCE UPON THE APPLICATION AND ANY THIRD PARTY CONTENT AND SERVICES ACCESSED THEREBY IS AT YOUR SOLE RISK AND DISCRETION. COMPANY AND ITS AFFILIATES, PARTNERS, SUPPLIERS AND LICENSORS HEREBY DISCLAIM ANY AND ALL REPRSENTATIONS, WARRANTIES AND GUARANTIES REGARDING THE APPLICATION AND THIRD PARTY CONTENT AND SERVICES, WHETHER EXPRESS, IMPLIED OR STATUTORY, AND INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. FURTHERMORE, COMPANY AND ITS AFFILIATES, PARTNERS, SUPPLIERS AND LICENSORS MAKE NO WARRANTY THAT (I) THE APPLICATION OR THIRD PARTY CONTENT AND SERVICES WILL MEET YOUR REQUIREMENTS; (II) THE APPLICATION OR THIRD PARTY CONTENT AND SERVICES WILL BE UNINTERRUPTED, ACCURATE, RELIABLE, TIMELY, SECURE OR ERROR-FREE; (III) THE QUALITY OF ANY PRODUCTS, SERVICES, INFORMATION OR OTHER MATERIAL ACCESSED OR OBTAINED BY YOU THROUGH THE APPLICATION WILL BE AS REPRESENTED OR MEET YOUR EXPECTATIONS; OR (IV) ANY ERRORS IN THE APPLICATION OR THIRD PARTY CONENT AND SERVICES WILL BE CORRECTED. NO ADVICE OR INFORMATION, WHETHER ORAL OR WRITTEN, OBTAINED BY YOU FROM COMPANY OR FROM THE APPLICATION SHALL CREATE ANY REPRESENTATION, WARRANTY OR GUARANTY. FURTHERMORE, YOU ACKNOWLEDGE THAT COMPANY HAVE NO OBLIGATION TO CORRECT ANY ERRORS OR OTHERWISE SUPPORT OR MAINTAIN THE APPLICATION.
      </Text>

      {/* Section 9 */}
      <Text style={styles.sectionTitle}>9. Limitation of Liability.</Text>
      <Text style={styles.paragraph}>
        UNDER NO CIRCUMSTANCES SHALL COMPANY OR ITS AFFILIATES, PARTNERS, SUPPLIERS OR LICENSORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL OR EXEMPLARY DAMAGES ARISING OUT OF OR IN CONNECTION WITH YOUR ACCESS OR USE OF OR INABILITY TO ACCESS OR USE THE APPLICATION AND ANY THIRD PARTY CONTENT AND SERVICES, WHETHER OR NOT THE DAMAGES WERE FORESEEABLE AND WHETHER OR NOT COMPANY WAS ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. WITHOUT LIMITING THE GENERALITY OF THE FOREGOING, COMPANY'S AGGREGATE LIABILITY TO YOU (WHETHER UNDER CONTRACT, TORT, STATUTE OR OTHERWISE) SHALL NOT EXCEED THE AMOUNT OF FIFTY DOLLARS ($50.00). THE FOREGOING LIMITATIONS WILL APPLY EVEN IF THE ABOVE STATED REMEDY FAILS OF ITS ESSENTIAL PURPOSE.
      </Text>

      {/* Section 10 */}
      <Text style={styles.sectionTitle}>10. Indemnification.</Text>
      <Text style={styles.paragraph}>
        You shall indemnify, defend and hold harmless Company and its affiliates, partners, suppliers and licensors, and each of their respective officers, directors, agents and employees (the "Indemnified Parties") from and against any claim, proceeding, loss, damage, fine, penalty, interest and expense (including, without limitation, fees for attorneys and other professional advisors) arising out of or in connection with the following: (i) Your access to or use of the Application or Third Party Content and Services; (ii) Your breach of this License; (iii) Your violation of law; (iv) Your negligence or willful misconduct; or (v) Your violation of the rights of a third party, including the infringement by You of any intellectual property or misappropriation of any proprietary right or trade secret of any person or entity. These obligations will survive any termination of the License.
      </Text>

      {/* Section 11 */}
      <Text style={styles.sectionTitle}>11. Compatibility.</Text>
      <Text style={styles.paragraph}>
        Company does not warrant that the Application will be compatible or interoperable with Your Computer, Mobile Device or any other piece of hardware, software, equipment or device installed on or used in connection with your Computer or Mobile Device. Furthermore, you acknowledge that compatibility and interoperability problems can cause the performance of your Mobile Device to diminish or fail completely, and may result in permanent the damage to Your Computer or Mobile Device, loss of the data located on Your Mobile Device, and corruption of the software and files located on Your Computer or Mobile Device. You acknowledge and agree that Company and its affiliates, partners, suppliers and licensors shall have no liability to You for any losses suffered resulting from or arising in connection with compatibility or interoperability problems.
      </Text>

      {/* Section 12 */}
      <Text style={styles.sectionTitle}>12. Product Claims.</Text>
      <Text style={styles.paragraph}>
        You acknowledge that You (not Company) are responsible for addressing any Third Party claims relating to Your use or possession of the Application, and agree to notify Company of any Third Party claims relating to the Application of which You become aware. Furthermore, You hereby release Company from any liability resulting from Your use or possession of the Application, including, without limitation, the following: (i) any product liability claims; (ii) any claim that the Application fails to conform to any applicable legal or regulatory requirement; and (iii) any claim arising under consumer protection or similar legislation.
      </Text>

      {/* Section 13 */}
      <Text style={styles.sectionTitle}>13. Miscellaneous.</Text>

      <Text style={styles.paragraph}>
        <Text style={styles.subTitle}>13.1 Severability. </Text>
        <Text style={styles.paragraph}>
          If any provision of this License is held to be invalid or unenforceable with respect to a party, the remainder of this License, or the application of such provision to persons other than those to whom it is held invalid or unenforceable shall not be affected and each remaining provision of this License shall be valid and enforceable to the fullest extent permitted by law.
        </Text>
      </Text>

      <Text style={styles.paragraph}>
        <Text style={styles.subTitle}>13.2 Waiver. </Text>
        <Text style={styles.paragraph}>
          Except as provided herein, the failure to exercise a right or require performance of an obligation under this License shall not effect a party's ability to exercise such right or require such performance at any time thereafter nor shall the waiver of a breach constitute waiver of any subsequent breach.
        </Text>
      </Text>

      <Text style={styles.paragraph}>
        <Text style={styles.subTitle}>13.3 Modification or Amendment. </Text>
        <Text style={styles.paragraph}>
          Company may modify or amend the terms of this License by posting a copy of the modified or amended License on the Company Application website. You will be deemed to have agreed to any such modification or amendment by Your decision to continue using the Application following the date in which the modified or amended License is posted on the Company Application website.
        </Text>
      </Text>

      <Text style={styles.paragraph}>
        <Text style={styles.subTitle}>13.4 Survival. </Text>
        <Text style={styles.paragraph}>
          The following sections of this License and any other provisions of this License which by their express language or by their context are intended to survive the termination of this License shall survive such termination: 1, 2.2, 3, 4, 5, 7, 8, 9, 10, 12 and 13.
        </Text>
      </Text>

      <Text style={styles.paragraph}>
        <Text style={styles.subTitle}>13.5 Assignment. </Text>
        <Text style={styles.paragraph}>
          Except as permitted in Section 4, You shall not assign this License or any rights or obligations herein without the prior written consent of Company and any attempted assignment in contravention of this provision shall be null and void and of no force or effect.
        </Text>
      </Text>

      <Text style={styles.paragraph}>
        <Text style={styles.subTitle}>13.6 Entire Agreement. </Text>
        <Text style={styles.paragraph}>
          This License including the documents incorporated herein by reference constitute the entire agreement with respect to the use of the Application licensed hereunder and supersedes all prior or contemporaneous understandings regarding such subject matter.
        </Text>
      </Text>

      <Spacer height={30} />
    </ScrollView>
  );
};

export default TermsOfUseScreen;
