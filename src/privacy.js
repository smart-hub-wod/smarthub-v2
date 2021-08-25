import React from "react";
import { Container } from "react-bootstrap";

function toCamelCase(str) {
  return str
    .split(" ")
    .map(function (word, index) {
      // If it is the first word make sure to lowercase all the chars.
      if (index === 0) {
        return word.toLowerCase();
      }
      // If it is not the first word only upper case the first char and lowercase the rest.
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join("");
}

export default function Privacy() {
  var policy = [
    {
      title: "Description of Service",
      text: "Provision of information technology research, development, design consulting or product development, and/or software product development, loan/rental, access or maintenance of any of the above listed products and services.",
    },
    {
      title: "Refund/Cancellation",
      text: "If the product you are purchasing is an item, we will endeavour to replace the item for you at no additional cost upon receiving the defective item undamaged, and with its original packaging within 30 days of the purchase. No returns on software or electronics accepted. If the purchase is of a service, there is no refund for service fees. Customers must provide written notice sixty days in advance to request termination of services and are responsible for any fees during that sixty-day period. Specific service agreements may provide further contract terms around cancellations of services or subscriptions.",
    },
    {
      title: "About Shopping",
      text: [
        {
          title: "Shipping Methods",
          text: "Shipping is handled by a third party carrier. Third party carrier rates apply and are outlined in the shipping charges of the invoice.",
        },
        {
          title: "Expected Time-frames",
          text: "Shipments can take between 5-15 business days. Due to the COVID-19 pandemic, please allow for shipment delays.",
        },
        {
          title: "Shipping Prices",
          text: "Shipping rates are calculated at the time of check-out with a third party carrier and are stated on the invoice in the shipping charges section.",
        },
        {
          title: "Shipping Restrictions",
          text: "Presently, we only ship to Canada and the continental US.",
        },
        {
          title: "International Shipping",
          text: "Currently unavailable",
        },
      ],
    },
    {
      title: "Customs, Duties and Taxes",
      text: "An estimate of the customs fees, duties and taxes will be provided prior to the shipment being sent. The buyer is responsible for all fees charged. Although we will advise of any known up-front fees, the buyer is responsible for all fees charged. Contact Details for Missing or Lost Packages For lost or missing packages, please contact your sales representative or e-mail sales@onamap.ca quoting your invoice and/or customer ID number. You may also call 437-886-6354 to reach a company representative.",
    },
    {
      title: "Force Majeure",
      text: "West Oak Design Inc. shall be excused from any delay or failure in performance required hereunder if caused by reason of any occurrence or contingency beyond its reasonable control, including, but not limited to, acts of God, acts of war, fire, insurrection, strikes, lock-outs or other serious labor disputes, riots, earthquakes, floods, explosions or other acts of nature. Limitation of Liability The Client acknowledges and agrees that West Oak Design Inc. will not be liable for any losses or damages, whether indirect, incidental, special or consequential, in profits, goods or services, irrespective of whether or not the Client has been advised or otherwise might have anticipated the possibility of such loss or damage.",
    },
    {
      title: "No Guarantee",
      text: "The client acknowledges and agrees that West Oak Design Inc. cannot guarantee the results or effectiveness of any of the services rendered or to be rendered. Rather, services shall be executed in a professional manner and in accordance with good industry practice. Best efforts will be used but no results are promised.",
    },
    {
      title: "Acknowledgment",
      text: "",
    },
  ];
  // thought for later
  // function stringToHTML(str) {
  //   var parser = new DOMParser();
  //   var html = parser.parseFromString(str, "text/html");
  //   var newElem = document.createElement("div");
  //   newElem.innerHTML = html.body;
  //   return newElem;
  // }
  //   add id to each elements
  policy.forEach((elem) => {
    elem.id = toCamelCase(elem.title);
    if (elem.title === "About Shopping ") {
      elem.text.forEach((shop) => {
        shop.id = toCamelCase(shop.title);
      });
    }
  });

  return (
    <div className="mb-5">
      <h1 className="text-shblue pt-5 text-center">Terms and Conditions</h1>
      <Container
        id="privacy-policy"
        style={{
          marginTop: "3rem",
          width: "60%",
          border: "1px solid grey",
          boxShadow:
            "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
          borderRadius: "10px",
          padding: "2rem",
        }}
      >
        <h2 className="text-shblue"> Link to the Sections </h2>
        <nav className="ms-3">
          {policy.map((elem) => (
            <a className="my-3 link-text" href={`#${elem.id}`}>
              {elem.title}{" "}
            </a>
          ))}
        </nav>

        {policy.map((elem) => {
          return (
            <>
              <div id={elem.id}>
                <hr
                  style={{
                    marginBottom: "80px",
                    visibility: "hidden",
                  }}
                />
                <h2 className="heading-text text-shblue pb-4">{elem.title}</h2>
                {elem.title === "Acknowledgment" && (
                  <p className="ms-3">
                    Animated Icons by{" "}
                    <a
                      href="https://lordicon.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Lordicon.com
                    </a>
                  </p>
                )}

                {elem.title !== "About Shopping" ? (
                  <p> {elem.text} </p>
                ) : (
                  elem.text.map((shop) => {
                    return (
                      <div id={shop.id}>
                        <h2 className="subHeading-text text-shblue ps-3 pb-2 mt-4">
                          {shop.title}
                        </h2>
                        <p className="px-5"> {shop.text} </p>
                      </div>
                    );
                  })
                )}
              </div>
            </>
          );
        })}
      </Container>
    </div>
  );
}
