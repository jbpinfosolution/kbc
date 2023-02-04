import React from "react";
import { useRouter } from "next/router";

const Disclaimer = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <div className="disclaimer">
        <h4>
          <b>Disclaimer</b>
        </h4>
        <h3>Disclaimer for JBP Info Solution</h3>
        <p>
          If you require any more information or have any questions about our
          site&apos;s disclaimer, please feel free to contact us by email at
          jbpinfosolution@gmail.com. Our
          Disclaimer was generated with the help of the Free Disclaimer
          Generator.
        </p>
        <h3>Disclaimers for jpbinfo</h3>
        <p>
          All the information on this website - jpbinfo.com - is published in
          good faith and for general information purpose only. jpbinfo does not
          make any warranties about the completeness, reliability and accuracy
          of this information. Any action you take upon the information you find
          on this website (jpbinfo), is strictly at your own risk. jpbinfo will
          not be liable for any losses and/or damages in connection with the use
          of our website.
        </p>
        <p>
          From our website, you can visit other websites by following hyperlinks
          to such external sites. While we strive to provide only quality links
          to useful and ethical websites, we have no control over the content
          and nature of these sites. These links to other websites do not imply
          a recommendation for all the content found on these sites. Site owners
          and content may change without notice and may occur before we have the
          opportunity to remove a link which may have gone &apos;bad&apos;.
        </p>
        <p>
          Please be also aware that when you leave our website, other sites may
          have different privacy policies and terms which are beyond our
          control. Please be sure to check the Privacy Policies of these sites
          as well as their &quot;Terms of Service&quot; before engaging in any
          business or uploading any information.
        </p>
        <h3>Consent</h3>
        <p>
          By using our website, you hereby consent to our disclaimer and agree
          to its terms.
        </p>
        <h3>Update</h3>
        <p>
          Should we update, amend or make any changes to this document, those
          changes will be prominently posted here.
        </p>
      </div>
    </>
  );
};

export default Disclaimer;
